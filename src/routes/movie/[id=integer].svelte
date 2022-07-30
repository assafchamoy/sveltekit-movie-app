<script lang="ts">
	import { fade } from 'svelte/transition';
	import MovieImage from '$Components/movies/MovieImage.svelte';
	import type { IMovieDetails } from '$IMovies';

	export let movieDetails: IMovieDetails;
	let productionCountriesNames = movieDetails.production_countries.map((country) => country.name);
</script>

<div class="movie_details_container" in:fade>
	<button
		class="go_back_btn"
		on:click={() => {
			history.back();
		}}>Go Back</button
	>
	<h1 class="title">{movieDetails?.title}</h1>
	<div class="movie_details">
		<MovieImage movie={movieDetails} --height="300px" />
		<div class="details_section">
			<p>{movieDetails.overview}</p>
			<p>Production Countries:</p>
			<ul class="countries_list">
				{#each productionCountriesNames as countryName}
					<li>{countryName}</li>
				{/each}
			</ul>
			<p class="release_date">Release date: {movieDetails.release_date}</p>
			<div class="rating_box">
				<p>Rating</p>
				{movieDetails.vote_average}
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
		position: relative;
		padding: 20px;
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

	.go_back_btn {
		margin: 20px;
		background-image: linear-gradient(180deg, #d0368a 0%, #708ad4 60%);
		color: white;
		padding: 10px;
		position: absolute;
		top: 0;
		left: 0;
	}
</style>
