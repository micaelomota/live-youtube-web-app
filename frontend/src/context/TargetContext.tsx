import { createContext, useContext } from "react";
import { useAuth } from "./AuthContext";
import { Target, TargetEntry, useTargetsQuery } from "../hooks/useTargets";

type TargetContextValue = {
  isLoading: boolean;
  targets: Target[] | undefined;
  addTarget: (target: Omit<Target, "id">) => void;
  getTargetById: (id: string) => Target | undefined;
  addTargetEntry: (id: string, entry: TargetEntry) => void;
  removeTarget: (targetId: string) => void;
};

const TargetContext = createContext<TargetContextValue | null>(null);

export const TargetContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { user } = useAuth();
  const { isLoading, targets, addTarget, removeTarget, addTargetEntry } =
    useTargetsQuery(user?.uid);

  const contextValue = {
    isLoading,
    targets,
    addTarget,
    removeTarget,
    getTargetById: (id: string) => targets?.find((target) => target.id === id),
    addTargetEntry,
  };

  return (
    <TargetContext.Provider value={contextValue}>
      {children}
    </TargetContext.Provider>
  );
};

export const useTargets = () => {
  const context = useContext(TargetContext);

  if (!context) {
    throw new Error("useTargets must be used within a TargetContextProvider");
  }

  return context;
};
