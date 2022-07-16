import { writable } from 'svelte/store';
import type IMovie from '../interfaces/Movies/movie.entity';

interface IDisplayedMovies {
	page: number;
	movies: IMovie[];
	isLoading: boolean;
	total: number;
}

export const moviesList = writable<IDisplayedMovies>({
	page: 1,
	movies: [],
	isLoading: true,
	total: 0
});
