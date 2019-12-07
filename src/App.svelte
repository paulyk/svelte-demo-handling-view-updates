<script>
	import Post from './components/post/Post.svelte'
</script>

<main>
	<h1>Demo Loading Data </h1>
	<p>Using a svelte store as backing to update the status of loading some external data either from cache or source</p>
	<Post />

</main>

<style>

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>