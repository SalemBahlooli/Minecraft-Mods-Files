"use client";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

import { BrandTiktok, BrandYoutube } from "tabler-icons-react";
import {
  Advertising,
  Copyright,
  overview,
  Privacy,
  TermsOfUse,
} from "@/public/Policies";
import Markdown from "react-markdown";

const Footer = () => {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isCopyRights, setIsCopyRights] = useState(false);
  const [isAds, setIsAds] = useState(false);

  // Function to open URL in new tab
  const openInNewTab = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <footer className="bg-gray-100 py-8 mt-12">
      <div className="container mx-auto px-4 text-center">
        <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* About Us Section */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-800">
                  عن الموقع
                </h3>
                <p className="text-gray-600 mb-4 text-center">{overview}</p>
              </div>

              {/* Quick Links Section */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-800">
                  سياسات
                </h3>
                <ul className="space-y-2">
                  <li>
                    <Dialog
                      open={isPrivacyOpen}
                      onOpenChange={setIsPrivacyOpen}
                    >
                      <DialogTrigger asChild>
                        <Button
                          variant="link"
                          className="text-blue-600 hover:underline p-0 h-auto font-normal"
                        >
                          سياسة الخصوصية
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>سياسة الخصوصية</DialogTitle>
                        </DialogHeader>
                        <div className="mt-4 text-right ">
                          {/* Add your Privacy Policy content here */}

                          <ReactMarkdown className="prose prose-sm max-w-none rtl">
                            {Privacy}
                          </ReactMarkdown>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </li>
                  <li>
                    <Dialog open={isTermsOpen} onOpenChange={setIsTermsOpen}>
                      <DialogTrigger asChild>
                        <Button
                          variant="link"
                          className="text-blue-600 hover:underline p-0 h-auto font-normal"
                        >
                          شروط الخدمة
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>شروط الخدمة</DialogTitle>
                        </DialogHeader>
                        <div className="mt-4">
                          {/* Add your Terms of Service content here */}
                          <ReactMarkdown className="prose prose-sm max-w-none rtl">
                            {TermsOfUse}
                          </ReactMarkdown>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </li>
                  <li>
                    <Dialog open={isCopyRights} onOpenChange={setIsCopyRights}>
                      <DialogTrigger asChild>
                        <Button
                          variant="link"
                          className="text-blue-600 hover:underline p-0 h-auto font-normal"
                        >
                          الحقوق والملكية الفكرية
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle> الحقوق والملكية الفكرية</DialogTitle>
                        </DialogHeader>
                        <div className="mt-4">
                          {/* Add your Terms of Service content here */}
                          <ReactMarkdown className="prose prose-sm max-w-none rtl">
                            {Copyright}
                          </ReactMarkdown>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </li>
                  <li>
                    <Dialog open={isAds} onOpenChange={setIsAds}>
                      <DialogTrigger asChild>
                        <Button
                          variant="link"
                          className="text-blue-600 hover:underline p-0 h-auto font-normal"
                        >
                          الاعلانات
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>الاعلانات </DialogTitle>
                        </DialogHeader>
                        <div className="mt-4">
                          {/* Add your Terms of Service content here */}
                          <ReactMarkdown className="prose prose-sm max-w-none rtl">
                            {Advertising}
                          </ReactMarkdown>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </li>
                </ul>
              </div>

              {/* Contact Information Section */}
              <div className="flex justify-between items-center">
                <div className="flex space-x-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      openInNewTab("https://www.instagram.com/mine_coder/")
                    }
                  >
                    <Instagram className="h-5 w-5" />
                  </Button>
                  {/* Add TikTok Button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      openInNewTab("https://www.tiktok.com/@mine_c0der?lang=en")
                    }
                  >
                    <BrandTiktok className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      openInNewTab("https://www.youtube.com/@MineCoder/videos")
                    }
                  >
                    <BrandYoutube className="h-5 w-5" />
                  </Button>
                </div>
                <p className="text-sm text-gray-600">
                  &copy; {new Date().getFullYear()} MineCoder . جميع الحقوق
                  محفوظة.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </footer>
  );
};

export default Footer;
