import {
  TelnyxAIAgentProvider,
  useConnectionState,
} from "@telnyx/ai-agent-lib";
import { AgentIdForm } from "./components/AgentIdForm";
import { useAgentId } from "./lib/agent-id-atom";
import Agent from "./components/Agent";

const App = () => {
  const [agentId] = useAgentId();
  const connectionState = useConnectionState();

  return (
    <TelnyxAIAgentProvider agentId={agentId}>
      <main className="flex flex-col items-center justify-center h-screen w-screen">
        {connectionState !== "connected" ? <AgentIdForm /> : <Agent />}
        
        <p className="mt-4 text-sm text-muted-foreground">
          Current Connection State: {connectionState}
        </p>
      </main>
    </TelnyxAIAgentProvider>
  );
};

export default App;
