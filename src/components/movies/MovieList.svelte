<script lang="ts">
	import { page } from '$app/stores';
	import { createEventDispatcher } from 'svelte';
	import { onMount } from 'svelte';
	import { moviesList, scrollTopPosition } from '$Stores/moviesList.store';
	import MovieItem from './MovieItem.svelte';

	let movieListRef: HTMLDivElement;
	const dispatch = createEventDispatcher<{ fetchNextPage: void }>();

	$: handleInfiniteScroll = (): void => {
		const FETCH_MORE_THRESHOLD = 400;
		const { scrollHeight, clientHeight, scrollTop } = movieListRef;
		const bottomScrollOffset = scrollHeight - clientHeight - scrollTop;

		if (bottomScrollOffset <= FETCH_MORE_THRESHOLD) {
			const shouldFetchMore =
				!$moviesList?.isLoading && $moviesList?.movies?.length < $moviesList?.total;
			if (shouldFetchMore) {
				// $moviesList = { ...$moviesList, isLoading: true };
				// fetchPopularMovieList({ page: $moviesList.page + 1 });
				dispatch('fetchNextPage');
			}
		}
	};

	const updateScrollTop = (): void => {
		$scrollTopPosition.set($page.url.pathname, movieListRef.scrollTop);
	};

	onMount(() => {
		movieListRef.addEventListener('scrollend', updateScrollTop);
		movieListRef.scrollTo({ top: $scrollTopPosition.get($page.url.pathname) });
	});


</script>

<div
	class="movie_list"
	bind:this={movieListRef}
	on:scroll|trusted={handleInfiniteScroll}
>
	{#if $moviesList.movies}
		{#each $moviesList.movies as movie}
			<MovieItem {movie} />
		{/each}
	{/if}
</div>

<style>
	.movie_list {
		width: calc(100% - 10px);
		height: 70%;
		padding: 20px;
		gap: 20px;
		justify-content: center;
		overflow-y: auto;
		overflow-x: hidden;
		flex-direction: row;
		margin-top: 20px;
	}
</style>
