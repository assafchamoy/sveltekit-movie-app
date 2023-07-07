<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import MovieList from '$Components/movies/MovieList.svelte';
	import type { ISearchResult } from '$IMovies';
	import { isServiceError } from '$IApi/ServiceError.type';
	import { moviesList, MoviesType, resetScrollTopPosition } from '$Stores/moviesList.store';
	
	export let data: PageData;
	$: ({ searchResults } = data);

	let shouldFetchMore = false;

	const MovieListType = MoviesType.SEARCH;

	onMount(() => {
		resetScrollTopPosition({ pathName: $page.url.pathname, except: true });
	});

	$: {
		if (searchResults && !isServiceError(searchResults) && ($moviesList.listType !== MovieListType || $moviesList.query !== $page.params.query)) {
			moviesList.set({
				isLoading: false,
				movies: searchResults.results,
				page: searchResults.page,
				total: searchResults.total_results,
				listType: MovieListType,
				query: $page.params.query
			});
		}
	}

	$: nextPage = $moviesList.page + 1;

	$: {
		if (shouldFetchMore) {
			shouldFetchMore = false;
			fetch(`/search/${$page.params.query}/__data.json?page=${nextPage}`)
				.then((data) => data.json())
				.then((res: { searchResults: ISearchResult }) => {
					moviesList.update((currList) => ({
						...currList,
						isLoading: false,
						movies: [...currList.movies, ...res.searchResults.results],
						page: res.searchResults.page,
						total: res.searchResults.total_results,
						query: $page.params.query
					}));
				});
		}
	}
</script>

<h1 class="title">Search Results</h1>
<MovieList
	on:fetchNextPage={() => {
		$moviesList.isLoading = true;
		shouldFetchMore = true;
	}}
/>
