<script context="module" lang="ts">
	import { fetchMovieDetails, moviesDetails } from '../../stores/moviesDetails.store';

	import type { Load } from './__types/[id=integer]';

	export const load: Load = async ({ params }) => {
		await fetchMovieDetails({ id: params.id });
		return {
			props: {
				movieId: params.id
			}
		};
	};
</script>

<script lang="ts">
	import { fade } from 'svelte/transition';
	import MovieImage from '../../components/movies/MovieImage.svelte';
	import type { IMovieDetails } from '../../interfaces/Movies/movieDetails.entity';

	export let movieId: string;
	let selectedMovie = $moviesDetails.details.get(movieId) as IMovieDetails;
	let productionCountriesNames = selectedMovie.production_countries.map((c) => c.name);
</script>

<a href="/">Go Back</a>

<div class="movie_details_container" in:fade>
	<h1 class="title">{selectedMovie?.title}</h1>
	<div class="movie_details">
		<MovieImage movie={selectedMovie} --height="300px" />
		<div class="details_section">
			<p>{selectedMovie.overview}</p>
			<p>Production Countries:</p>
			<ul class="countries_list">
				{#each productionCountriesNames as countryName}
					<li>{countryName}</li>
				{/each}
			</ul>
			<p class="release_date">Release date: {selectedMovie.release_date}</p>
			<div class="rating_box">
				<p>Rating</p>
				{selectedMovie.vote_average}
			</div>
		</div>
	</div>
</div>

<style>
	.movie_details {
		width: 60vw;
		gap: 0.5rem;
		display: flex;
		flex-direction: column;
		/* overflow-y: auto; */
	}

	.movie_details_container {
		align-items: center;
		justify-content: center;
		overflow-y: auto;
		flex-direction: column;
	}

	.release_date {
		text-align: center;
		margin-top: 1rem;
	}

	.countries_list > li {
		padding: unset;
		margin: 10px;
	}
	.countries_list {
		display: flex;
		gap: 5px;
		flex-wrap: wrap;
	}
	.details_section {
		display: flex;
		flex-direction: column;
		font-size: 0.7rem;
		height: 220px;
		overflow-y: auto;
		gap: 10px;
		/* width: 80vw; */
		align-self: center;
		padding: 10px;
	}
	.title {
		font-size: 1.5rem;
	}
	.rating_box {
		font-weight: 700;
		border: 1px solid black;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: fit-content;
		padding: 5px 20px;
		align-self: center;
		border-radius: 2px;
	}

</style>
