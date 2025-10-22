import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export type Message = {
  id?: string;
  role: "user" | "assistant";
  content: string;
  created_at?: string;
};

export type Conversation = {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
};

export const useConversations = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Load conversations list
  const loadConversations = async () => {
    try {
      const { data, error } = await supabase
        .from("conversations")
        .select("*")
        .order("updated_at", { ascending: false });

      if (error) throw error;
      setConversations(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load conversations",
        variant: "destructive",
      });
    }
  };

  // Load messages for a conversation
  const loadMessages = async (conversationId: string) => {
    try {
      const { data, error } = await supabase
        .from("chat_messages")
        .select("*")
        .eq("conversation_id", conversationId)
        .order("created_at", { ascending: true });

      if (error) throw error;
      
      // Cast the role to the correct type
      const typedMessages: Message[] = (data || []).map((msg: any) => ({
        id: msg.id,
        role: msg.role as "user" | "assistant",
        content: msg.content,
        created_at: msg.created_at,
      }));
      
      setMessages(typedMessages);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load messages",
        variant: "destructive",
      });
    }
  };

  // Create new conversation
  const createConversation = async (firstMessage?: string): Promise<string | null> => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const title = firstMessage 
        ? firstMessage.slice(0, 50) + (firstMessage.length > 50 ? "..." : "")
        : "New Conversation";

      const { data, error } = await supabase
        .from("conversations")
        .insert({ user_id: user.id, title })
        .select()
        .single();

      if (error) throw error;
      
      await loadConversations();
      setCurrentConversationId(data.id);
      setMessages([]);
      
      return data.id;
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to create conversation",
        variant: "destructive",
      });
      return null;
    }
  };

  // Save message to database
  const saveMessage = async (conversationId: string, role: "user" | "assistant", content: string) => {
    try {
      const { error } = await supabase
        .from("chat_messages")
        .insert({
          conversation_id: conversationId,
          role,
          content,
        });

      if (error) throw error;
    } catch (error: any) {
      console.error("Error saving message:", error);
    }
  };

  // Select a conversation
  const selectConversation = async (conversationId: string) => {
    setCurrentConversationId(conversationId);
    await loadMessages(conversationId);
  };

  // Delete conversation
  const deleteConversation = async (conversationId: string) => {
    try {
      const { error } = await supabase
        .from("conversations")
        .delete()
        .eq("id", conversationId);

      if (error) throw error;

      if (currentConversationId === conversationId) {
        setCurrentConversationId(null);
        setMessages([]);
      }

      await loadConversations();
      
      toast({
        title: "Success",
        description: "Conversation deleted",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to delete conversation",
        variant: "destructive",
      });
    }
  };

  // Load conversations on mount
  useEffect(() => {
    loadConversations();
  }, []);

  return {
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
    loadConversations,
  };
};
