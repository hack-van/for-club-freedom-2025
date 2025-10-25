import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";

export default function TimeElapsed({
  seconds,
  className,
}: {
  seconds: number;
  className?: string;
}) {
  const mins = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const secs = (seconds % 60).toString().padStart(2, "0");
  return (
    <Badge variant="destructive" className={cn("font-mono", className)}>
      {mins}:{secs}
    </Badge>
  );
}
