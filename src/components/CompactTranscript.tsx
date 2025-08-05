import React from "react";
import { useTranscript } from "@telnyx/ai-agent-lib";
import { cn } from "@/lib/utils";

interface CompactTranscriptProps {
  className?: string;
  maxHeight?: string;
  showTimestamps?: boolean;
  maxMessages?: number;
}

const CompactTranscript: React.FC<CompactTranscriptProps> = ({
  className,
  maxHeight = "200px",
  showTimestamps = false,
  maxMessages = 10,
}) => {
  const transcript = useTranscript();
  
  // Show only the most recent messages
  const recentMessages = transcript.slice(-maxMessages);

  return (
    <div className={cn("w-full", className)}>
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-sm font-medium">Live Transcript</h3>
        <span className="text-xs text-muted-foreground">
          {transcript.length} messages
        </span>
      </div>
      
      <div
        className="space-y-2 overflow-y-auto rounded-md border bg-muted/30 p-3"
        style={{ maxHeight }}
      >
        {recentMessages.length === 0 ? (
          <div className="text-center text-muted-foreground py-4">
            <p className="text-xs">No messages yet</p>
          </div>
        ) : (
          recentMessages.map((item) => (
            <div
              key={item.id}
              className={cn(
                "text-xs p-2 rounded border-l-2",
                item.role === "user"
                  ? "bg-primary/5 border-l-primary"
                  : "bg-secondary/30 border-l-secondary"
              )}
            >
              <div className="flex items-center gap-2 mb-1">
                <span
                  className={cn(
                    "font-medium uppercase tracking-wider",
                    item.role === "user" ? "text-primary" : "text-secondary-foreground"
                  )}
                >
                  {item.role === "user" ? "You" : "Agent"}
                </span>
                {showTimestamps && (
                  <span className="text-muted-foreground">
                    {item.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                )}
              </div>
              <p className="leading-relaxed">{item.content}</p>
            </div>
          ))
        )}
      </div>
      
      {transcript.length > maxMessages && (
        <p className="text-xs text-muted-foreground mt-2 text-center">
          Showing last {maxMessages} of {transcript.length} messages
        </p>
      )}
    </div>
  );
};

export default CompactTranscript;
