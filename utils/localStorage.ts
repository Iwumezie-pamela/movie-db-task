import { MovieResponse } from "@/app/components/models/MovieModel";

export const getFavorites = (): MovieResponse[] => {
    if (typeof window !== "undefined") {
      const favorites = localStorage.getItem("favorites");
      return favorites ? JSON.parse(favorites) : [];
    }
    return [];
  };
  
  export const saveFavorites = (favorites: MovieResponse[]) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  };
  