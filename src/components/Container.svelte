<div class="container">
	<slot />
</div>

<style>
	:global(.container) {
        width:100vw;
        /* padding: 20px; */
        overflow: hidden;
		height:100%;
	}

	:global(.container > div) {
		display: flex;
        flex-wrap: wrap;
	}

</style>
