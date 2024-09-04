import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { TutorialVideo } from "@prisma/client";

interface TutorialVideosWidgetProps {
  generalTutorials: TutorialVideo[];
  fileTutorials: TutorialVideo[];
}

const TutorialVideosWidget: React.FC<TutorialVideosWidgetProps> = ({
  generalTutorials,
  fileTutorials,
}) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>فيديوهات تعليمية</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">دروس عامة</h3>
          {generalTutorials.map((video) => (
            <TutorialVideoItem key={video.id} video={video} />
          ))}

          {fileTutorials.length > 0 && (
            <>
              <h3 className="text-lg font-semibold mt-6">
                دروس خاصة بهذا المود
              </h3>
              {fileTutorials.map((video) => (
                <TutorialVideoItem key={video.id} video={video} />
              ))}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const TutorialVideoItem: React.FC<{ video: TutorialVideo }> = ({ video }) => (
  <div className="flex items-center space-x-4">
    <div className="relative w-24 h-16">
      <img
        src={video.thumbnail}
        alt={video.title}
        className="w-full h-full object-cover rounded"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded">
        <Play className="w-6 h-6 text-white" />
      </div>
    </div>
    <div className="flex-grow">
      <h3 className="text-sm font-medium">{video.title}</h3>
    </div>
    <Button
      size="sm"
      variant="outline"
      onClick={() => window.open(video.url, "_blank")}
    >
      مشاهدة
    </Button>
  </div>
);

export default TutorialVideosWidget;
