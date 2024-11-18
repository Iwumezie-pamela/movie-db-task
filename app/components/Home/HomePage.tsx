"use client";
import React, { useEffect, useState } from "react";
import { MovieResponse } from "../models/MovieModel";
import api from "@/app/api/apiClient";
import MovieCard from "./MovieCard";

function HomePage({ initialMovies }: { initialMovies: MovieResponse[] }) {
  const [movies, setMovies] = useState<MovieResponse[]>(initialMovies);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState<number>(2); // Start from page 2 since page 1 is already loaded
  const [hasMore, setHasMore] = useState(true);

  const fetchMovies = async () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);

    try {
      const response = await api.get(`/movie/popular?page=${page}`);
      const data = response.data;

      if (data.results.length > 0) {
        setMovies((prevMovies) => {
          const uniqueMovies = data.results.filter(
            (newMovie: MovieResponse) =>
              !prevMovies.some((prevMovie) => prevMovie.id === newMovie.id)
          );
          return [...prevMovies, ...uniqueMovies];
        });
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [page]);

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >=
      document.body.scrollHeight - 50 &&
      hasMore &&
      !isLoading
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, isLoading]);

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main>
      <div className="py-20 px-10">
        <h1 className="text-3xl font-bold mb-5">Popular Movies</h1>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/3 flex items-end justify-end ml-auto mb-4 py-2 px-4 border border-gray-300 text-black outline-none placeholder:text-black rounded-full"
          />
        </div>

        {isLoading && !movies.length && (
          <div className="flex justify-center h-[50vh] items-center mt-5">
            <div className="w-10 h-10 border-4 border-red-500 border-t-transparent border-solid rounded-full animate-spin"></div>
          </div>
        )}

        {!isLoading && search && filteredMovies.length === 0 && (
          <h2 className="text-center text-gray-500 mt-4">
            No movies found matching "{search}".
          </h2>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 lg:gap-10">
          {filteredMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

        {isLoading && movies.length > 0 && (
          <div className="flex justify-center h-[5vh] items-center mt-5">
          <div className="w-10 h-10 border-4 border-red-500 border-t-transparent border-solid rounded-full animate-spin"></div>
        </div>
        )}

        {!hasMore && movies.length > 0 && (
          <h2 className="text-center text-gray-500 mt-4">
            You've reached the end of the list.
          </h2>
        )}
      </div>
    </main>
  );
}

export default HomePage;
