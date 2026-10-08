"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { Workout } from "@/types/workout";

interface FitLogContextType {
  plan: Workout[];
  saved: Workout[];
  doneIds: number[];
  hydrated: boolean;
  addToPlan: (workout: Workout) => void;
  removeFromPlan: (id: number) => void;
  saveWorkout: (workout: Workout) => void;
  removeFromSaved: (id: number) => void;
  markAsDone: (id: number) => void;
}

const FitLogContext = createContext<FitLogContextType | undefined>(
  undefined
);

export function FitLogProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [doneIds, setDoneIds] = useState<number[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Load saved data when the app starts
  useEffect(() => {
    try {
      const storedPlan = localStorage.getItem("fitlog-plan");
      const storedSaved = localStorage.getItem("fitlog-saved");
      const storedDoneIds = localStorage.getItem("fitlog-done");

      if (storedPlan) {
        setPlan(JSON.parse(storedPlan));
      }

      if (storedSaved) {
        setSaved(JSON.parse(storedSaved));
      }

      if (storedDoneIds) {
        setDoneIds(JSON.parse(storedDoneIds));
      }
    } catch (error) {
      console.error("Failed to load FitLog data:", error);
    } finally {
      setHydrated(true);
    }
  }, []);

  // Save Plan
  useEffect(() => {
    if (!hydrated) {
      return;
    }

    localStorage.setItem(
      "fitlog-plan",
      JSON.stringify(plan)
    );
  }, [plan, hydrated]);

  // Save Saved workouts
  useEffect(() => {
    if (!hydrated) {
      return;
    }

    localStorage.setItem(
      "fitlog-saved",
      JSON.stringify(saved)
    );
  }, [saved, hydrated]);

  // Save Done workouts
  useEffect(() => {
    if (!hydrated) {
      return;
    }

    localStorage.setItem(
      "fitlog-done",
      JSON.stringify(doneIds)
    );
  }, [doneIds, hydrated]);

  function addToPlan(workout: Workout) {
    setPlan((currentPlan) => {
      if (currentPlan.length >= 5) {
        return currentPlan;
      }

      if (currentPlan.some((item) => item.id === workout.id)) {
        return currentPlan;
      }

      return [...currentPlan, workout];
    });
  }

  function removeFromPlan(id: number) {
    setPlan((currentPlan) =>
      currentPlan.filter((item) => item.id !== id)
    );

    setDoneIds((currentDoneIds) =>
      currentDoneIds.filter((doneId) => doneId !== id)
    );
  }

  function saveWorkout(workout: Workout) {
    setSaved((currentSaved) => {
      if (
        currentSaved.some(
          (item) => item.id === workout.id
        )
      ) {
        return currentSaved;
      }

      return [...currentSaved, workout];
    });
  }

  function removeFromSaved(id: number) {
    setSaved((currentSaved) =>
      currentSaved.filter((item) => item.id !== id)
    );
  }

  function markAsDone(id: number) {
    setDoneIds((currentDoneIds) => {
      if (currentDoneIds.includes(id)) {
        return currentDoneIds;
      }

      return [...currentDoneIds, id];
    });
  }

  return (
    <FitLogContext.Provider
      value={{
        plan,
        saved,
        doneIds,
        hydrated,
        addToPlan,
        removeFromPlan,
        saveWorkout,
        removeFromSaved,
        markAsDone,
      }}
    >
      {children}
    </FitLogContext.Provider>
  );
}

export function useFitLog() {
  const context = useContext(FitLogContext);

  if (!context) {
    throw new Error(
      "useFitLog must be used inside FitLogProvider"
    );
  }

  return context;
}