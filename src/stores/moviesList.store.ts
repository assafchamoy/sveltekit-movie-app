import { writable } from 'svelte/store';
import type { IMovie, ISearchedMovie } from '$IMovies';


export enum MoviesType {
	POPULAR = 'popular',
	SEARCH = 'search'
}
export interface IDisplayedMovies {
	page: number;
	movies: IMovie[] | ISearchedMovie[];
	isLoading: boolean;
	total: number;
	listType: MoviesType | null;
	query?: string;
}

export const moviesList = writable<IDisplayedMovies>({
	page: 0,
	movies: [],
	isLoading: true,
	total: 0,
	listType: null
});

export const resetMoviesList = () => {
	moviesList.set({
		page: 0,
		movies: [],
		isLoading: true,
		total: 0,
		listType: null
	});
};

export const scrollTopPosition = writable<Map<string, number>>(new Map());

interface resetScrollParams {
	pathName: string;
	except?: boolean;
	all?: boolean;
}

export const resetScrollTopPosition = ({ pathName, except, all }: resetScrollParams) => {
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
