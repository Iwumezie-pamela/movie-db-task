'use client'

import { useEffect, useState } from 'react';
import api from '@/app/api/apiClient';
import { MovieDetailModel } from '@/app/components/models/MovieModel';

// Update Props type to reflect that params is a Promise
export type Props = {
  params: Promise<{ id: string }>;
};

function MovieDetail({ params }: Props) {
  const [movie, setMovie] = useState<MovieDetailModel>();
  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState<string | null>(null);

  // Use an effect to resolve the params promise and set the ID
  useEffect(() => {
    const fetchParams = async () => {
      const resolvedParams = await params;  // Unwrap the promise
      setId(resolvedParams.id);  // Set the ID
    };

    fetchParams();
  }, [params]);

  const fetchMovie = async () => {
    if (!id) return;

    setIsLoading(true);

    try {
      const response = await api.get(`/movie/${id}`);
      const data = response.data;
      setMovie(data);
      console.log('Movie Data:', data);
    } catch (error) {
      console.error('Error fetching movie:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchMovie();
    }
  }, [id]); // Trigger when id is set

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!movie) {
    return <div>Movie not found</div>;
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold">{movie.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        alt={movie.title}
      />
      <p>{movie.overview}</p>
      <ul>
        {movie.genres?.map((genre: { id: number; name: string }) => (
          <li key={genre.id}>{genre.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default MovieDetail;
