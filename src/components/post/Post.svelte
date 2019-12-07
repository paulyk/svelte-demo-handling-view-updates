<script>
	import { onMount, onDestroy } from 'svelte'
	import { postStore, actions } from './postStore'
	import { randomInt } from '../../util'

	const ids  = ['5544', '1122', '4455', '3344']
	const index = randomInt(0, ids.length - 1)
	const postId = ids[index]

	$: status = $postStore.status
	$: post = $postStore.post

	onMount(() => {
		actions.loadPost(postId)
	})

</script>


<style>
	.post {
		height: 500px;
		display: grid;
		grid-template-rows: 4rem 1fr;
	}

	.title {
		font-size: 2rem;
		padding: 1rem;
	}

	.content {
		padding: 1rem;
		font-size: 1.2rem;
	}

	.status {
		height: 500px;
		display: grid;
		place-items: center;
		font-size: 2rem;
		color: #ccc
	}

</style>


{#if status === 'not-found'}
	<div class="status"><h2>Sorry post not found</h2></div>
{:else if status !== 'done'}
	<div class='status'>{status}</div>
{:else}
	<div class="post">
		<div class="title">{post.title}</div>
		<div class="content">{post.content}</div>
	</div>
{/if}