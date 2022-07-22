import { writable } from 'svelte/store';
import type IMovie from '../interfaces/Movies/movie.entity';
import type { ISearchedMovie } from '../interfaces/Movies/searchedMovie.entity';

export interface IDisplayedMovies {
	page: number;
	movies: IMovie[] | ISearchedMovie[];
	isLoading: boolean;
	total: number;
}

export const moviesList = writable<IDisplayedMovies>({
	page: 0,
	movies: [],
	isLoading: true,
	total: 0
});
