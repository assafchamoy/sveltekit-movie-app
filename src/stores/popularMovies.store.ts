import { writable } from 'svelte/store';
import requestHandler from '../axios';
import type IMovie from '../interfaces/Movies/movie.entity';
import type IPopularMoviesResponse from '../interfaces/Movies/popularMovies.response';

export const popularMovies = writable([] as IMovie[]);

interface PopularMoviesParams {
	language: 'he' | 'en-US';
	page: number;
}

const fetchPopularMovieList = async (params: PopularMoviesParams) => {
	console.log('fetching movies');
	const popularMoviesRes = await requestHandler
		.get<IPopularMoviesResponse>('movie/popular', { params })
		.then((res) => res.data);
	popularMovies.update((prevMovies) => [...prevMovies, ...popularMoviesRes.results]);
};

fetchPopularMovieList({ language: 'en-US', page: 1 });
