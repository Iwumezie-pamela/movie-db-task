"use client";

import React, { useEffect, useState } from "react";
import { MovieResponse } from "../components/models/MovieModel";
import { getFavorites } from "@/utils/localStorage";
import MovieCard from "../components/Home/MovieCard";

const FavoritesPage: React.FC = () => {
  const [favoriteMovies, setFavoriteMovies] = useState<MovieResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      setIsLoading(true);
      const favorites = getFavorites();
      setFavoriteMovies(favorites);
      setIsLoading(false);
    };

    fetchFavorites();
  }, []);

  return (
    <div className="px-10 py-20">
      <h1 className="text-2xl font-bold mb-4">Favorite Movies</h1>

      {isLoading ? (
        <div className="flex justify-center items-center h-[50vh]">
          <div className="w-10 h-10 border-4 border-red-500 border-t-transparent border-solid rounded-full animate-spin"></div>
        </div>
      ) : favoriteMovies.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 lg:gap-10">
          {favoriteMovies.map((movie, index) => (
            <MovieCard key={index} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-[50vh]">
          <p className="text-lg text-gray-500">No favorite movies found.</p>
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
