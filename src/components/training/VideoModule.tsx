import { Card } from "@/components/ui/card";

interface VideoModuleProps {
  moduleNumber: number;
  title: string;
  description: string;
  videoId: string;
}

const VideoModule = ({ moduleNumber, title, description, videoId }: VideoModuleProps) => {
  return (
    <Card className="p-4 hover:shadow-lg transition-shadow flex flex-col h-full">
      <h3 className="font-semibold mb-3 text-lg">Module {moduleNumber}: {title}</h3>
      <div className="aspect-video w-full flex-grow">
        <iframe
          className="w-full h-full rounded-lg"
          src={`https://www.youtube.com/embed/${videoId}?rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <p className="text-sm text-muted-foreground mt-4">{description}</p>
    </Card>
  );
};

export default VideoModule;
