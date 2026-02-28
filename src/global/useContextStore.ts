import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type ContextPhase = "idle" | "loading" | "ready";

interface ContextStore {
  activeContextId: string | null;
  contextPhase: ContextPhase;

  setActiveContext: (contextId: string | null) => void;
  setContextPhase: (phase: ContextPhase) => void;
  resetContext: () => void;
}

export const useContextStore = create<ContextStore>()(
  persist(
    (set) => ({
      activeContextId: null,
      contextPhase: "idle",

      setActiveContext: (contextId) =>
        set({ activeContextId: contextId }),

      setContextPhase: (phase) =>
        set({ contextPhase: phase }),

      resetContext: () =>
        set({
          activeContextId: null,
          contextPhase: "idle",
        }),
    }),
    {
      name: "context-session",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);