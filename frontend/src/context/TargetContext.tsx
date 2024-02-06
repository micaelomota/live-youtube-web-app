import { createContext, useCallback, useContext, useMemo, useState } from "react";

type TargetContextValue = {
  targets: TargetProps[] | undefined;
  addTarget: (target: Omit<TargetProps, "id">) => void;
  getTargetById: (id: number) => TargetProps | undefined;
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
  unit: string;
  entries?: Entry[];
}

const defaultTargets: TargetProps[] = [
  {
    id: Date.now(),
    name: "Correr 100 km",
    target: 100,
    currentValue: 50,
    unit: "Km (Quilômetro)",
    entries: [
      {
        value: 5,
        date: "2022-01-01",
        notes: "Corrir na praia da barra"
      },
      {
        value: 2,
        date: "2022-01-02",
        notes: "Corrir na esteira da academia"
      }
    ]
  }
]

export const TargetContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [targets, setTargets] = useState<TargetProps[]>(defaultTargets);

  const addTarget = useCallback((target: Omit<TargetProps, "id">) => {
    setTargets((prev) => [...(prev || []), { ...target, id: Date.now() }]);
  }, []);

  const getTargetById = useCallback(
    (id: number) => {
      return targets?.find((target) => target.id === id)
    }, [targets])

  const contextValue = useMemo(
    () => ({
      targets,
      addTarget,
      getTargetById
    }),
    [addTarget, targets, getTargetById]
  );

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
