import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

type TargetContextValue = {
  targets: TargetProps[] | undefined;
  addTarget: (target: Omit<TargetProps, "id">) => void;
  getTargetById: (id: number) => TargetProps | undefined;
  incrementEntry: (id: number, entry: Entry) => void;
};

const TargetContext = createContext<TargetContextValue | null>(null);

interface Entry {
  value: number;
  date: string;
  notes?: string;
}

export interface TargetProps {
  id: number;
  name: string;
  target: number;
  currentValue: number;
  unity: string;
  entries?: Entry[];
}

// TODO: A logica está usando localStorage para salvar os dados
export const TargetContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [targets, setTargets] = useState<TargetProps[]>(
  localStorage.getItem('targets')
  ? JSON.parse(localStorage.getItem('targets')!)
  : [],);

  const addTarget = useCallback((target: Omit<TargetProps, "id">) => {
    setTargets((prev) => [...(prev || []), { ...target, id: Date.now() }]);
  }, []);

  const getTargetById = useCallback(
    (id: number) => {
      return targets?.find((target) => target.id === id)
    }, [targets])

  const incrementEntry = useCallback((id: number, entry: Entry) => {
    setTargets((prev) =>
      prev?.map((target) => {
        if (target.id === id) {
          return {
            ...target,
            currentValue: target.currentValue + entry.value,
            entries: [...(target.entries || []), entry],
          };
        }
        return target;
      })
    );
  }, []);

  const contextValue = useMemo(
    () => ({
      targets,
      addTarget,
      getTargetById,
      incrementEntry
    }),
    [addTarget, targets, getTargetById, incrementEntry]
  );

  useEffect(() => {
    localStorage.setItem('targets', JSON.stringify(targets))
  }, [targets]);
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
