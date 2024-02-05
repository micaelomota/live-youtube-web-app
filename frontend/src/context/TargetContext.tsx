import { createContext, useContext, useMemo, useState } from "react";

type TargetContextValue = {
  targets: any[];
  addTarget: (target: any) => void;
};

const TargetContext = createContext<TargetContextValue | null>(null);

const mockData = [
  {
    name: "Ler 1 livro por mês",
    currentValue: 2,
    target: 12,
    unit: "Unidade",
    createdAt: "2021-01-01T00:00:00Z",
    updatedAt: "2021-01-01T00:00:00Z",
    entries: [
      {
        value: 2,
        date: "2021-01-01",
        notes: "Zero - A biografia de uma ideia perigosa",
      },
      {
        value: 2,
        date: "2021-02-01",
        notes: "Algorithms to live by ",
      },
    ],
  },
  {
    name: "Ir para a academia 3x por semana",
    currentValue: 12,
    target: 156,
    unit: "Unidade",
    createdAt: "2021-01-01",
    updatedAt: "2021-01-01",
    entries: [
      {
        value: 2,
        date: "2024-01-01",
        notes: "Peito e Biceps",
      },
      {
        value: 2,
        date: "2024-01-03",
        notes: "Costas e Triceps",
      },
      {
        value: 2,
        date: "2024-01-05",
        notes: "Pernas",
      },
      // ...
    ],
  },
];

type Target = {
  // id: number
  name: string;
  currentValue: number;
  unit: string;
  createdAt: string;
  updatedAt: string;
};

export const TargetContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [targets, setTargets] = useState<Target[]>(mockData);

  const addTarget = (target: Target) => {
    setTargets((t) => [...t, target]);
  };

  const contextValue = useMemo(
    () => ({
      targets,
      addTarget,
    }),
    [targets]
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
