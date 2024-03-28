import { addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../config/firebase";

export interface TargetEntry {
    value: number;
    date: string;
    notes?: string;
  }

export interface Target {
    id: string;
    name: string;
    target: number;
    currentValue: number;
    unity: string;
    entries?: TargetEntry[];
}

export const useTargetsQuery = (userId?: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [targets, setTargets] = useState<Target[]>([]);

    useEffect(() => {
        return onSnapshot(
          collection(db, `users/${userId}/targets`),
          (snapshot) => {
            setIsLoading(false);
            if (snapshot.docs.length > 0)
              setTargets(
                snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as any[]
              );
          },
        );
      }, [userId]);

    return {
      isLoading,
      targets,
      addTarget: (target: Omit<Target, "id">) => userId ? addTarget(target, userId) : null,
      removeTarget: (targetId: string) => userId ? removeTarget(targetId, userId) : null,
      addTargetEntry: (id: string, entry: TargetEntry) => userId ? addTargetEntry(id, entry, userId) : null,
      updateTarget: (target: Target) => userId ? updateTarget(target, userId) : null
    }
}

export const removeTarget = async (targetId: any, userId: string) => {
  const docRef = doc(db, `users/${userId}/targets/${targetId}`);

  return deleteDoc(docRef);
}

export const addTarget = async (target: Omit<Target, "id">, userId: string) => {
  return addDoc(collection(db, `users/${userId}/targets`), target);
}

export const updateTarget = async (target: Target, userId: string) => {
  const { id, ...targetWithoutId } = target;
  const docRef = doc(db, `users/${userId}/targets/${id}`);
  return updateDoc(docRef, targetWithoutId);
}

export const addTargetEntry = async (id: string, entry: TargetEntry, userId: string) => {
  // add entry to target entries subcollection
  // the path is /users/{userId}/targets/{targetId}/entries
  // and use firebase modular sdk to add the entry
  console.log(userId, id, entry)
  const docRef = collection(db, `users/${userId}/targets/${id}/entries`);
  return addDoc(docRef, entry);
}

export const useTargetEntryQuery = (userId: string, targetId: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [entries, setEntries] = useState<TargetEntry[]>([]);

  useEffect(() => {
    return onSnapshot(
      collection(db, `users/${userId}/targets/${targetId}/entries`),
      (snapshot) => {
        setIsLoading(false);
        if (snapshot.docs.length > 0)
          setEntries(
            snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as any[]
          );
      },
    );
  }, [userId, targetId]);

  return {
    isLoading,
    entries,
  }
}