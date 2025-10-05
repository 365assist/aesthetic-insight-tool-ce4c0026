import { Card } from "@/components/ui/card";
import { Video } from "lucide-react";

interface VideoModuleProps {
  moduleNumber: number;
  title: string;
  description: string;
  videoId: string;
}

const VideoModule = ({ moduleNumber, title, description, videoId }: VideoModuleProps) => {
  const isPlaceholder = videoId.startsWith("VIDEO_ID_");
  
  return (
    <Card className="p-4 hover:shadow-lg transition-shadow flex flex-col h-full">
      <h3 className="font-semibold mb-3 text-lg">Module {moduleNumber}: {title}</h3>
      <div className="aspect-video w-full flex-grow bg-muted rounded-lg flex items-center justify-center">
        {isPlaceholder ? (
          <div className="text-center p-6">
            <Video className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Video coming soon</p>
          </div>
        ) : (
          <iframe
            className="w-full h-full rounded-lg"
            src={`https://www.youtube.com/embed/${videoId}?rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        )}
      </div>
      <p className="text-sm text-muted-foreground mt-4">{description}</p>
    </Card>
  );
};

export default VideoModule;
