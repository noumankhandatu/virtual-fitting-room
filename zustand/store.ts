import { create } from "zustand";

type AppState = {
  garment_image: File | null;
  human_image: File | null;
  garment_description: string;
  category: "upper_body" | "lower_body";
  denoise_steps: number;
  seed: number;
  number_of_images: number;

  setGarmentImage: (file: File | null) => void;
  setHumanImage: (file: File | null) => void;
  setGarmentDescription: (description: string) => void;
  setCategory: (category: "upper_body" | "lower_body") => void;
  setDenoiseSteps: (steps: number) => void;
  setSeed: (seed: number) => void;
  setNumberOfImages: (count: number) => void;
};

export const useAppStore = create<AppState>((set) => ({
  garment_image: null,
  human_image: null,
  garment_description: "brown top of female etc",
  category: "upper_body",
  denoise_steps: 20,
  seed: 42,
  number_of_images: 1,

  setGarmentImage: (file) => set({ garment_image: file }),
  setHumanImage: (file) => set({ human_image: file }),
  setGarmentDescription: (description) => set({ garment_description: description }),
  setCategory: (category) => set({ category }),
  setDenoiseSteps: (steps) => set({ denoise_steps: steps }),
  setSeed: (seed) => set({ seed }),
  setNumberOfImages: (count) => set({ number_of_images: count }),
}));
