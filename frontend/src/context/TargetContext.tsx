import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { db } from "../config/firebase";
import {
  addDoc,
  deleteDoc,
  collection,
  onSnapshot,
  doc,
} from "firebase/firestore";

type TargetContextValue = {
  targets: TargetProps[] | undefined;
  addTarget: (target: Omit<TargetProps, "id">) => void;
  getTargetById: (id: string) => TargetProps | undefined;
  incrementEntry: (id: string, entry: Entry) => void;
  removeTarget: (targetId: string) => void;
};

const TargetContext = createContext<TargetContextValue | null>(null);

interface Entry {
  value: number;
  date: string;
  notes?: string;
}

export interface TargetProps {
  id: string;
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
    (id: string) => {
      return targets?.find((target) => target.id === id);
    },
    [targets]
  );

  const incrementEntry = useCallback((id: string, entry: Entry) => {
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

  const removeTarget = async (targetId: any) => {
    const docRef = doc(db, "users/" + userId + "/targets/" + targetId);

    deleteDoc(docRef)
      .then(() => {
        console.log("Entire Document has been deleted successfully.");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const contextValue = useMemo(
    () => ({
      targets,
      addTarget: (target: Omit<TargetProps, "id">) =>
        addDoc(collection(db, "users/" + userId + "/targets"), target),
      getTargetById,
      incrementEntry,
      removeTarget,
    }),
    [targets, getTargetById, incrementEntry]
  );

  useEffect(() => {
    onSnapshot(collection(db, "users/" + userId + "/targets"), (snapshot) => {
      if (snapshot.docs.length > 0)
        setTargets(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as any[]
        );
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
