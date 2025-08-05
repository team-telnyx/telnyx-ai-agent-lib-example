import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  useAgentState,
  useClient,
  useConversation,
  useSetTranscript,
} from "@telnyx/ai-agent-lib";
import { AudioPlayback } from "./AudioPlayback";
import AudioVisualizer from "./AudioVisualizer";
import TranscriptWithInput from "./TranscriptWithInput";
import { Button } from "./ui/button";
const Agent = () => {
  const client = useClient();
  const setTranscript = useSetTranscript();
  const convo = useConversation();
  const agentState = useAgentState();

  const hasActiveConversation = convo?.call?.state === "active";

  const handleButtonClick = () => {
    if (hasActiveConversation) {
      setTranscript([]);
      return client.endConversation();
    }
    return client.startConversation();
  };
  return (
    <div className="flex gap-6 w-full max-w-6xl">
      <Card className="w-[400px] max-w-full">
        <CardHeader>
          <CardTitle>Agent</CardTitle>
          <CardDescription>Agent is: {agentState}</CardDescription>
        </CardHeader>
        <CardContent>
          <AudioVisualizer
            className="min-h-[150px]"
            stream={convo?.call?.remoteStream}
          />
          <AudioPlayback stream={convo?.call?.remoteStream} />
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleButtonClick}>
            {hasActiveConversation ? "End Conversation" : "Start Conversation"}
          </Button>
        </CardFooter>
      </Card>

      <div className="flex-1 min-w-0">
        <TranscriptWithInput />
      </div>
    </div>
  );
};

export default Agent;
