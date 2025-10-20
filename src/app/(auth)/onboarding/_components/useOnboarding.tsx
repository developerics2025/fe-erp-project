"use client";
import { create } from "zustand";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getPlans, postOnboardingStep } from "../action";

type OnboardingState = {
  data: Record<string, any>;
  setData: (d: Record<string, any>) => void;
  reset: () => void;
};

export const useOnboardingStore = create<OnboardingState>((set) => ({
  data: {},
  setData: (d) => set((s) => ({ data: { ...s.data, ...d } })),
  reset: () => set({ data: {} }),
}));

export const usePostStep = (step: number) => {
  return useMutation({
    mutationFn: (payload: any) => postOnboardingStep(step, payload),
  });
};

export const usePlans = () => {
  return useQuery({ queryKey: ["plans"], queryFn: getPlans });
};

export const useOnboarding = (step: number) => {
  const { mutateAsync, isPending: isLoading } = usePostStep(step);

  const setData = useOnboardingStore((s) => s.setData);

  return {
    mutateAsync,
    setStore: setData, // Mengubah nama setData menjadi setStore agar sesuai dengan kode Anda
    isLoading,
  };
};
