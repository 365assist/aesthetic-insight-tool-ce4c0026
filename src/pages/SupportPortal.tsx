import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User, MessageSquarePlus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import { supabase } from "@/integrations/supabase/client";
import { useConversations, type Message } from "@/hooks/useConversations";
import { Separator } from "@/components/ui/separator";

const SupportPortal = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [authChecked, setAuthChecked] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  const {
    conversations,
    currentConversationId,
    messages,
    setMessages,
    isLoading,
    setIsLoading,
    createConversation,
    selectConversation,
    saveMessage,
    deleteConversation,
  } = useConversations();

  useEffect(() => {
    // Check authentication and get user info
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
      } else {
        setUserEmail(session.user.email || "");
        setAuthChecked(true);
      }
    };

    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUserEmail(session.user.email || "");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const streamChat = async (userMessage: Message, conversationId: string) => {
    const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/support-chat`;

    try {
      // Get the user's session token for authentication
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({
          title: "Authentication Error",
          description: "Please log in to continue.",
          variant: "destructive",
        });
        navigate("/auth");
        return;
      }

      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ 
          messages: [...messages, userMessage]
        }),
      });

      if (resp.status === 429) {
        toast({
          title: "Rate Limit",
          description: "Too many requests. Please try again later.",
          variant: "destructive",
        });
        return;
      }

      if (resp.status === 402) {
        toast({
          title: "Payment Required",
          description: "Please add funds to continue using the chatbot.",
          variant: "destructive",
        });
        return;
      }

      if (!resp.ok || !resp.body) throw new Error("Failed to start stream");

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";
      let streamDone = false;
      let assistantContent = "";

      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") {
          streamDone = true;
            break;
          }

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantContent += content;
              setMessages(prev => {
                const last = prev[prev.length - 1];
                if (last?.role === "assistant" && prev.length > 1) {
                  return prev.map((m, i) => 
                    i === prev.length - 1 ? { ...m, content: assistantContent } : m
                  );
                }
                return [...prev, { role: "assistant", content: assistantContent }];
              });
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }

      // Save assistant message after streaming is complete
      if (assistantContent && conversationId) {
        await saveMessage(conversationId, "assistant", assistantContent);
      }
    } catch (error) {
      console.error("Chat error:", error);
      toast({
        title: "Error",
        description: "Failed to get response. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    let conversationId = currentConversationId;
    
    // Create new conversation if none exists
    if (!conversationId) {
      conversationId = await createConversation(input);
      if (!conversationId) return;
    }

    const userMessage: Message = { role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Save user message
    await saveMessage(conversationId, "user", userMessage.content);

    await streamChat(userMessage, conversationId);
    setIsLoading(false);
  };

  const handleNewConversation = async () => {
    await createConversation();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-primary dark:text-white mb-2">Support Portal</h1>
            <p className="text-muted-foreground dark:text-white">Get instant help with our AI troubleshooter</p>
          </div>

          <div className="grid grid-cols-12 gap-6">
            {/* Sidebar */}
            <div className="col-span-12 lg:col-span-3">
              <Card className="p-4">
                <Button 
                  onClick={handleNewConversation} 
                  className="w-full mb-4"
                  variant="default"
                >
                  <MessageSquarePlus className="w-4 h-4 mr-2 dark:text-white" />
                  New Chat
                </Button>

                <Separator className="mb-4" />

                <ScrollArea className="h-[500px]">
                  <div className="space-y-2">
                    {conversations.map((conv) => (
                      <div
                        key={conv.id}
                        className={`group relative p-3 rounded-lg cursor-pointer transition-colors ${
                          currentConversationId === conv.id
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted"
                        }`}
                        onClick={() => selectConversation(conv.id)}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm font-medium truncate flex-1">
                            {conv.title}
                          </p>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteConversation(conv.id);
                            }}
                          >
                            <Trash2 className="h-3 w-3 dark:text-white" />
                          </Button>
                        </div>
                        <p className="text-xs opacity-70 mt-1">
                          {new Date(conv.updated_at).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </Card>
            </div>

            {/* Chat Area */}
            <div className="col-span-12 lg:col-span-9">
              <Card className="h-[600px] flex flex-col">
            <ScrollArea ref={scrollRef} className="flex-1 p-4">
              <div className="space-y-4">
                {!currentConversationId && messages.length === 0 ? (
                  <div className="flex items-center justify-center h-full text-center">
                    <div>
                      <Bot className="w-16 h-16 mx-auto mb-4 text-muted-foreground dark:text-white" />
                      <h3 className="text-lg font-semibold mb-2 dark:text-white">Start a new conversation</h3>
                      <p className="text-sm text-muted-foreground dark:text-white">
                        Ask me anything about your aesthetic laser equipment
                      </p>
                    </div>
                  </div>
                ) : null}
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {message.role === "assistant" && (
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                        <Bot className="w-5 h-5 text-primary-foreground" />
                      </div>
                    )}
                    <div
                      className={`rounded-lg px-4 py-2 max-w-[80%] ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    </div>
                    {message.role === "user" && (
                      <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center shrink-0">
                        <User className="w-5 h-5 text-accent-foreground" />
                      </div>
                    )}
                  </div>
                ))}
                {isLoading && (
                  <div className="flex gap-3 justify-start">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                      <Bot className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div className="rounded-lg px-4 py-2 bg-muted">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                        <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-100" />
                        <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-200" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            <div className="border-t p-4">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your question..."
                  disabled={isLoading}
                />
                <Button onClick={handleSend} disabled={isLoading || !input.trim()}>
                  <Send className="w-4 h-4 dark:text-white" />
                </Button>
              </div>
            </div>
          </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SupportPortal;
