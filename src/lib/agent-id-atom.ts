import { atom, useAtom } from "jotai";

const agentIdAtom = atom<string>("your-agent-id");

export const useAgentId = () => useAtom(agentIdAtom);
