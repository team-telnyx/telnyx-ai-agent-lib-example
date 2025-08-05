import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "./ui/input";
import { useAgentId } from "@/lib/agent-id-atom";
import { Button } from "./ui/button";
import { useClient, useConnectionState } from "@telnyx/ai-agent-lib";

export const AgentIdForm = () => {
  const [agentId, setAgentId] = useAgentId();
  const client = useClient();

  const connectionState = useConnectionState();
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAgentId(event.target.value);
  };

  const handleConnect = async () => {
    await client
      .connect()
      .then(() => {
        console.log("Connected to Telnyx AIAgent with Agent ID:", agentId);
      })
      .catch((error) => {
        console.error("Failed to connect to Telnyx AIAgent:", error);
      });
  };

  return (
    <Card className="w-[400px] max-w-full">
      <CardHeader>
        <CardTitle>Welcome to the Telnyx Voice AI Lib Example!</CardTitle>
        <CardDescription>
          <p className="my-2">
            This is a simple React application demonstrating the use of Telnyx's
            Voice AI library.
          </p>
          <p>
            Explore the code to see how to integrate Telnyx's Voice AI features
            into your applications.
          </p>
        </CardDescription>
        <CardAction></CardAction>
      </CardHeader>
      <CardContent>
        <Input
          placeholder="Enter your Agent ID"
          value={agentId}
          onChange={handleInputChange}
        />
        <p className="mt-2 text-sm text-muted-foreground">
          Use the Agent ID to connect with the Telnyx Voice AI services.
        </p>
      </CardContent>
      <CardFooter>
        <Button
          disabled={connectionState === "connecting"}
          className="w-full"
          onClick={handleConnect}
        >
          {connectionState === "connecting" ? "Connecting..." : "Connect"}
        </Button>
      </CardFooter>
    </Card>
  );
};
