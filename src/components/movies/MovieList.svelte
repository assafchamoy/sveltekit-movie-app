<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import { moviesList } from '../../stores/moviesList.store';
	import MovieItem from './MovieItem.svelte';
	let movieListRef: HTMLDivElement;
	const dispatch = createEventDispatcher<{ fetchNextPage: boolean }>();

	const handleInfiniteScroll = (): void => {
		const FETCH_MORE_THRESHOLD = 400;
		const { scrollHeight, clientHeight, scrollTop } = movieListRef;
		const bottomScrollOffset = scrollHeight - clientHeight - scrollTop;

		if (bottomScrollOffset <= FETCH_MORE_THRESHOLD) {
			const shouldFetchMore =
				!$moviesList?.isLoading && $moviesList?.movies?.length < $moviesList?.total;
			if (shouldFetchMore) {
				// $moviesList = { ...$moviesList, isLoading: true };
				// fetchPopularMovieList({ page: $moviesList.page + 1 });
				dispatch('fetchNextPage', true);
			}
		}
	};
</script>

<div class="movie_list" bind:this={movieListRef} on:scroll={handleInfiniteScroll}>
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
		gap: 20px;
		justify-content: center;
		overflow-y: auto;
		flex-direction: row;
		margin-top: 20px;
	}
</style>
