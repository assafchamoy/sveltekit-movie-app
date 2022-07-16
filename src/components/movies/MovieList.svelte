<script lang="ts">
	import { fetchPopularMovieList, popularMovies } from '../../stores/popularMovies.store';
	import MovieItem from './MovieItem.svelte';
	let movieListRef: HTMLDivElement;

	const handleInfiniteScroll = (): void => {
		const FETCH_MORE_THRESHOLD = 400;
		const { scrollHeight, clientHeight, scrollTop } = movieListRef;
		const bottomScrollOffset = scrollHeight - clientHeight - scrollTop;

		if (bottomScrollOffset <= FETCH_MORE_THRESHOLD) {
			const shouldFetchMore =
				!$popularMovies.isLoading && $popularMovies.movies.length < $popularMovies.total;
			if (shouldFetchMore) {
				$popularMovies = { ...$popularMovies, isLoading: true };
				fetchPopularMovieList({ page: $popularMovies.page + 1 });
			}
		}
	};
</script>

<div class="movie_list" bind:this={movieListRef} on:scroll={handleInfiniteScroll}>
	{#each $popularMovies.movies as movie (movie.id)}
		<MovieItem {movie} />
	{/each}
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
