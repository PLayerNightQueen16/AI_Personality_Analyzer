import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import BinaryBadge from "./BinaryBadge";
import { Share2, Copy, RotateCcw, Download } from "lucide-react";
import { SiX, SiFacebook, SiLinkedin, SiWhatsapp } from "react-icons/si";
import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import { useToast } from "@/hooks/use-toast";

interface VibeResult {
  percentage: number;
  label: string;
  emoji: string;
}

interface BinaryTag {
  code: string;
  meaning: string;
}

interface VibeCardProps {
  results: VibeResult[];
  binaryTags: BinaryTag[];
  description: string;
  onRetake?: () => void;
}

interface VibeCardPropsExtended extends VibeCardProps {
  resultId?: string;
}

export default function VibeCard({ results, binaryTags, description, onRetake, resultId }: VibeCardPropsExtended) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const { toast } = useToast();
  
  const generateImage = async (): Promise<Blob | null> => {
    if (!cardRef.current) return null;
    
    setIsGeneratingImage(true);
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
      });
      
      return new Promise((resolve) => {
        canvas.toBlob((blob) => {
          setIsGeneratingImage(false);
          resolve(blob);
        }, 'image/png');
      });
    } catch (error) {
      console.error('Error generating image:', error);
      setIsGeneratingImage(false);
      toast({
        title: "Error",
        description: "Failed to generate image. Please try again.",
        variant: "destructive",
      });
      return null;
    }
  };
  
  const createShareLink = async (): Promise<string | null> => {
    if (shareUrl) return shareUrl;
    
    if (!resultId) {
      toast({
        title: "Error",
        description: "Cannot create share link without result ID.",
        variant: "destructive",
      });
      return null;
    }
    
    const blob = await generateImage();
    if (!blob) return null;
    
    try {
      const reader = new FileReader();
      const base64Promise = new Promise<string>((resolve) => {
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(blob);
      });
      const imageData = await base64Promise;
      
      const response = await fetch('/api/share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resultId, imageData }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create share link');
      }
      
      const data = await response.json();
      setShareUrl(data.shareUrl);
      return data.shareUrl;
    } catch (error) {
      console.error('Error creating share link:', error);
      toast({
        title: "Error",
        description: "Failed to create share link. Please try again.",
        variant: "destructive",
      });
      return null;
    }
  };
  
  const handleDownloadImage = async () => {
    const blob = await generateImage();
    if (!blob) return;
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'my-binary-vibe.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Success!",
      description: "Your vibe card has been downloaded.",
    });
  };
  
  const handleCopy = async () => {
    const url = await createShareLink();
    if (!url) return;
    
    navigator.clipboard.writeText(url);
    toast({
      title: "Link copied!",
      description: "Share your vibe with friends. The link includes your image!",
    });
  };
  
  const handleShare = async () => {
    const url = await createShareLink();
    if (!url) return;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Binary Vibe',
          text: `I'm ${results[0].percentage}% ${results[0].label}! Check out my personality analysis.`,
          url: url,
        });
      } catch (error) {
        if (error instanceof Error && error.name !== 'AbortError') {
          console.error('Share failed:', error);
        }
      }
    }
  };
  
  const handleTwitterShare = async () => {
    const url = await createShareLink();
    if (!url) return;
    
    const shareText = `I'm ${results[0].percentage}% ${results[0].label}! Check out my Binary Vibe personality analysis 🔥`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, '_blank', 'width=550,height=420');
  };
  
  const handleFacebookShare = async () => {
    const url = await createShareLink();
    if (!url) return;
    
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(facebookUrl, '_blank', 'width=550,height=420');
  };
  
  const handleLinkedInShare = async () => {
    const url = await createShareLink();
    if (!url) return;
    
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    window.open(linkedInUrl, '_blank', 'width=550,height=420');
  };
  
  const handleWhatsAppShare = async () => {
    const url = await createShareLink();
    if (!url) return;
    
    const shareText = `I'm ${results[0].percentage}% ${results[0].label}! Check out my Binary Vibe: ${url}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
    window.open(whatsappUrl, '_blank');
  };
  
  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <Card 
        ref={cardRef}
        className="p-4 sm:p-6 md:p-10 border-2 md:border-4 border-red-600 relative overflow-hidden shadow-2xl shadow-red-500/20"
        data-testid="vibe-card"
      >
        <div className="absolute top-0 right-0 w-32 h-32 md:w-40 md:h-40 bg-red-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 md:w-40 md:h-40 bg-red-600/10 rounded-full blur-3xl" />
        
        <div className="relative space-y-4 sm:space-y-6 md:space-y-8">
          <div className="text-center space-y-2 md:space-y-3">
            <h2 className="text-lg sm:text-xl md:text-2xl font-display font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
              Your Binary Vibe Analysis
            </h2>
            <div className="inline-flex items-center gap-2 font-mono text-xs text-white px-3 md:px-4 py-1.5 md:py-2 bg-gradient-to-r from-red-600 to-red-500 rounded-full shadow-lg shadow-red-500/30">
              <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
              AI-POWERED DECODE
            </div>
          </div>
          
          <div className="space-y-2 sm:space-y-3">
            {results.map((result, index) => (
              <div 
                key={index}
                className={`flex items-center gap-2 sm:gap-3 p-2 sm:p-3 md:p-4 rounded-lg md:rounded-2xl transition-all ${
                  index === 0 
                    ? 'text-2xl sm:text-3xl md:text-5xl bg-gradient-to-r from-red-500/10 to-red-600/10 border md:border-2 border-red-500/30' 
                    : index === 1 
                    ? 'text-xl sm:text-2xl md:text-4xl bg-red-50/50 border border-red-500/20' 
                    : 'text-lg sm:text-xl md:text-3xl bg-red-50/30'
                } font-display font-bold`}
                data-testid={`result-${index}`}
              >
                <span className={`${
                  index === 0 ? 'text-red-600' : index === 1 ? 'text-red-500' : 'text-red-400'
                } drop-shadow-sm shrink-0`}>
                  {result.percentage}%
                </span>
                <span className="flex-1 leading-tight break-words">{result.label}</span>
                <span className="text-2xl sm:text-3xl md:text-4xl shrink-0">{result.emoji}</span>
              </div>
            ))}
          </div>
          
          <div className="pt-4 md:pt-6 border-t border-red-500/20 md:border-t-2">
            <p className="text-xs md:text-sm text-red-600 mb-3 md:mb-4 font-mono font-semibold tracking-wider">
              BINARY PERSONALITY TAGS
            </p>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {binaryTags.map((tag, index) => (
                <BinaryBadge key={index} code={tag.code} meaning={tag.meaning} />
              ))}
            </div>
          </div>
          
          <div className="pt-4 md:pt-6 border-t border-red-500/20 md:border-t-2 space-y-3 md:space-y-4">
            <p className="text-sm sm:text-base leading-relaxed text-foreground/80">
              {description}
            </p>
          </div>
          
          <div className="pt-4 md:pt-6 text-center border-t border-red-500/10">
            <p className="text-xs font-mono text-muted-foreground font-semibold tracking-wider">
              BINARY BABES • AI PERSONALITY ANALYZER
            </p>
          </div>
        </div>
      </Card>
      
      <div className="space-y-4 sm:space-y-6">
        <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
          <Button 
            size="lg"
            variant="default" 
            onClick={handleDownloadImage}
            disabled={isGeneratingImage}
            className="shadow-lg shadow-red-500/20 hover:shadow-xl hover:shadow-red-500/30 transition-all text-sm sm:text-base"
            data-testid="button-download-image"
          >
            <Download className="w-4 h-4 mr-2" />
            {isGeneratingImage ? 'Generating...' : 'Download'}
          </Button>
          <Button 
            size="lg"
            variant="outline" 
            onClick={handleShare}
            disabled={isGeneratingImage}
            className="border-2 hover:border-red-500/50 text-sm sm:text-base"
            data-testid="button-share"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button 
            size="lg"
            variant="outline" 
            onClick={handleCopy}
            className="border-2 hover:border-red-500/50 text-sm sm:text-base"
            data-testid="button-copy"
          >
            <Copy className="w-4 h-4 mr-2" />
            Copy Link
          </Button>
          {onRetake && (
            <Button 
              size="lg"
              variant="secondary" 
              onClick={onRetake}
              className="text-sm sm:text-base"
              data-testid="button-retake"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Retake
            </Button>
          )}
        </div>
        
        <div className="bg-gradient-to-r from-red-50 to-white border border-red-500/20 md:border-2 rounded-lg sm:rounded-xl md:rounded-2xl p-4 sm:p-5 md:p-6">
          <p className="text-center text-xs sm:text-sm text-red-600 mb-3 md:mb-4 font-mono font-semibold tracking-wider">
            SHARE ON SOCIAL MEDIA
          </p>
          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
            <Button 
              size="icon"
              variant="outline" 
              onClick={handleTwitterShare}
              className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 border-2 hover:border-red-500/50 hover:bg-red-50 transition-all"
              data-testid="button-share-twitter"
              title="Share on Twitter/X"
            >
              <SiX className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
            <Button 
              size="icon"
              variant="outline" 
              onClick={handleFacebookShare}
              className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 border-2 hover:border-red-500/50 hover:bg-red-50 transition-all"
              data-testid="button-share-facebook"
              title="Share on Facebook"
            >
              <SiFacebook className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
            <Button 
              size="icon"
              variant="outline" 
              onClick={handleLinkedInShare}
              className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 border-2 hover:border-red-500/50 hover:bg-red-50 transition-all"
              data-testid="button-share-linkedin"
              title="Share on LinkedIn"
            >
              <SiLinkedin className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
            <Button 
              size="icon"
              variant="outline" 
              onClick={handleWhatsAppShare}
              disabled={isGeneratingImage}
              className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 border-2 hover:border-red-500/50 hover:bg-red-50 transition-all"
              data-testid="button-share-whatsapp"
              title="Share on WhatsApp"
            >
              <SiWhatsapp className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          </div>
          <p className="text-center text-xs text-muted-foreground mt-3 md:mt-4">
            Click any platform to share your vibe with auto-preview image!
          </p>
        </div>
      </div>
    </div>
  );
}
