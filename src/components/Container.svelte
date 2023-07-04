<div class="container">
	<slot />
</div>

<style>
	:global(.container) {
        width:100vw;
		margin-top: 30px;
        /* padding: 20px; */
        overflow-y: auto;
		height: calc(100vh - var(--nav-bar-height) - var(--footer-height));
	}

	:global(.container > div) {
		display: flex;
        flex-wrap: wrap;

	}

</style>
