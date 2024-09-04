"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Instagram } from "lucide-react";

interface AdBarProps {
  adContent: string;
  instagramUrl: string;
  //   onLearnMoreClick: () => void;
}

const AdBar: React.FC<AdBarProps> = ({
  adContent,
  instagramUrl,
  //   onLearnMoreClick,
}) => {
  const openInNewTab = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="fixed bottom-0 left-0 w-full bg-yellow-400 text-black py-2 text-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <span className="text-sm font-medium">إعلان</span>

        <div className="flex-grow text-center">{adContent}</div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => openInNewTab(instagramUrl)}
            aria-label="Visit our Instagram"
          >
            <Instagram className="h-5 w-5" />
          </Button>
          {/* <Button
            variant="ghost"
            size="sm"
            onClick={onLearnMoreClick}
            className="text-sm font-medium hover:underline focus:outline-none"
          >
            معرفة المزيد
          </Button> */}
        </div>
      </div>
    </div>
  );
};

export default AdBar;
