<div class="container">
	<slot />
</div>

<style>
	:global(.container) {
        width:100vw;
        /* padding: 20px; */
        overflow-y: auto;
		height:100%;
	}

	:global(.container > div) {
		display: flex;
        flex-wrap: wrap;
	}

</style>
