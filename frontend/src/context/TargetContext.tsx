import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { db } from "../config/firebase";
import { addDoc, collection, onSnapshot } from "firebase/firestore";

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

const userId = "ZR9MbNxPj6CfaoHgnXoq";

export const TargetContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [targets, setTargets] = useState<TargetProps[]>([]);

  const getTargetById = useCallback(
    (id: number) => {
      return targets?.find((target) => target.id === id);
    },
    [targets]
  );

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
      addTarget: (target: Omit<TargetProps, "id">) =>
        addDoc(collection(db, "users/" + userId + "/targets"), target),
      getTargetById,
      incrementEntry,
    }),
    [targets, getTargetById, incrementEntry]
  );

  useEffect(() => {
    onSnapshot(collection(db, "users/" + userId + "/targets"), (snapshot) => {
      setTargets(snapshot.docs.map((doc) => doc.data()) as any[]);
    });
  }, []);

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
