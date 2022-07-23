import { page } from '$app/stores';
import { writable, get } from 'svelte/store';
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

export const scrollTopPosition = writable<Map<string, number>>(new Map());

interface resetScrollParams {
	pathName: string;
	except?: boolean;
	all?: boolean
}

export const resetScrollTopPosition = ({pathName, except, all}: resetScrollParams) => {
	const SCROLL_TOP_POSITION = 0;

	scrollTopPosition.update((currentPositions) => {
		if (all) {
			for (const [key] of currentPositions) {
				currentPositions.set(key, SCROLL_TOP_POSITION);
			}
			return currentPositions;

		} else if (except) {
			currentPositions.forEach((_, key) => {
				if (key !== pathName) {
					currentPositions.set(key, SCROLL_TOP_POSITION);
				}
			});
			return currentPositions;

		}

		return currentPositions.set(pathName, SCROLL_TOP_POSITION);
	});
};
