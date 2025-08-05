import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  useTranscript,
  useClient,
  useConversation,
  useSetTranscript,
} from "@telnyx/ai-agent-lib";
import { cn } from "@/lib/utils";

interface TranscriptWithInputProps {
  className?: string;
  maxHeight?: string;
  showTimestamps?: boolean;
  showMessageInput?: boolean;
}

const TranscriptWithInput: React.FC<TranscriptWithInputProps> = ({
  className,
  maxHeight = "300px",
  showTimestamps = true,
  showMessageInput = true,
}) => {
  const transcript = useTranscript();
  const client = useClient();
  const conversation = useConversation();
  const [messageInput, setMessageInput] = useState("");
  const isCallActive = conversation?.call?.state === "active";
  const setTranscript = useSetTranscript();

  const handleSendMessage = () => {
    if (messageInput.trim() && isCallActive) {
      client.sendConversationMessage(messageInput);
      setMessageInput("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (conversation?.call?.state === "active") {
      setTranscript([]);
    }
  }, [conversation?.call?.state, setTranscript]);
  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle>Transcript</CardTitle>
        <CardDescription>
          Real-time conversation transcript ({transcript.length} messages)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3 overflow-y-auto pr-2" style={{ maxHeight }}>
          {transcript.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              <p>No conversation yet</p>
              <p className="text-sm">
                Start a conversation to see the transcript
              </p>
            </div>
          ) : (
            transcript.map((item) => (
              <div
                key={item.id}
                className={cn(
                  "flex flex-col gap-1 p-3 rounded-lg border",
                  item.role === "user"
                    ? "bg-primary/5 border-primary/20 ml-8"
                    : "bg-secondary/50 border-secondary mr-8"
                )}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={cn(
                      "text-xs font-medium uppercase tracking-wider",
                      item.role === "user"
                        ? "text-primary"
                        : "text-secondary-foreground"
                    )}
                  >
                    {item.role === "user" ? "You" : "Agent"}
                  </span>
                  {showTimestamps && (
                    <span className="text-xs text-muted-foreground">
                      {item.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })}
                    </span>
                  )}
                </div>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                  {item.content}
                </p>
              </div>
            ))
          )}
        </div>

        {showMessageInput && (
          <div className="border-t pt-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <Input
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder={
                      isCallActive
                        ? "Type a message to the agent..."
                        : "Start a conversation to send messages"
                    }
                    disabled={!isCallActive}
                    className="text-sm"
                  />
                </div>
                <Button
                  onClick={handleSendMessage}
                  disabled={!messageInput.trim() || !isCallActive}
                  size="sm"
                >
                  Send
                </Button>
              </div>
              {!isCallActive && (
                <p className="text-xs text-muted-foreground">
                  Messages can only be sent during an active conversation
                </p>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TranscriptWithInput;
