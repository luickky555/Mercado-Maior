import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ShareDialogProps {
  title: string;
  text: string;
  url: string;
}

export function ShareDialog({
  title,
  text,
  url,
}: ShareDialogProps) {
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title,
          text,
          url,
        });

        return;
      }

      await navigator.clipboard.writeText(
        `${title} - ${text} | Link: ${url}`,
      );

      toast.success(
        "Link copiado para a área de transferência!",
      );
    } catch {
      // Cancelamento do compartilhamento nativo.
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleShare}
      className="gap-2 bg-white/10 text-white border-white/20 hover:bg-white hover:text-carnauba"
    >
      <Share2 className="h-4 w-4" />
      Compartilhar
    </Button>
  );
}