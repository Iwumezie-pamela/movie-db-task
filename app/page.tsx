import { MovieResponse } from "./components/models/MovieModel";
import api from "./api/apiClient";
import HomePage from "./components/Home/HomePage";

export default async function Page() {
  const response = await api.get("/movie/popular?page=1");
  const initialMovies: MovieResponse[] = response.data.results;

  return <HomePage initialMovies={initialMovies} />;
}
