import React, { useState, useEffect, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
	const [movies, setMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const fetchMoviesHandler = useCallback(async () => {
		setIsLoading(true);
		setError(null);
		try {
			const response = await fetch("https://swapi.py4e.com/api/films/");
			if (!response.ok) {
				throw new Error(
					"COULD NOT LOAD MOVIES CHECK YOUR INTERNET CONNECTION!!!",
				);
			}
			const data = await response.json();

			const transformedMovies = data.results.map((movieData) => {
				return {
					id: movieData.episode_id,
					title: movieData.title,
					openingText: movieData.opening_crawl,
					releaseDate: movieData.release_date,
				};
			});
			setMovies(transformedMovies);
		} catch (error) {
			setError(error.message);
		}
		setIsLoading(false);
	}, []);

	useEffect(() => {
		fetchMoviesHandler();
	}, [fetchMoviesHandler]);

	return (
		<React.Fragment>
			<section>
				<button onClick={fetchMoviesHandler}>SEARCH MOVIES</button>
			</section>
			<section>
				{!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
				{!isLoading && movies.length === 0 && !console.error && (
					<p>FOUND NO MOVIES </p>
				)}
				{!isLoading && error && <p>{error}</p>}
				{isLoading && <p className="page">LOADING... LOADING... LOADING...</p>}
			</section>
		</React.Fragment>
	);
}

export default App;
