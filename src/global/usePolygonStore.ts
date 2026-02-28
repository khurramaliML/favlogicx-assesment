import { create } from "zustand";
import { persist } from "zustand/middleware";

type WorkspaceStatus = "idle" | "loading" | "loaded";

interface WorkspaceState {
  activeModuleKey: string | null;
  workspaceStatus: WorkspaceStatus;

  setActiveModule: (moduleKey: string | null) => void;
  setWorkspaceStatus: (status: WorkspaceStatus) => void;
  resetWorkspace: () => void;
}

export const useWorkspaceStore = create<WorkspaceState>()(
  persist(
    (set) => ({
      activeModuleKey: null,
      workspaceStatus: "idle",

      setActiveModule: (moduleKey) =>
        set({ activeModuleKey: moduleKey }),

      setWorkspaceStatus: (status) =>
        set({ workspaceStatus: status }),

      resetWorkspace: () =>
        set({
          activeModuleKey: null,
          workspaceStatus: "idle",
        }),
    }),
    {
      name: "workspace-session",
    }
  )
);