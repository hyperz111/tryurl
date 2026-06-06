<script>
	import "bulma/css/versions/bulma-no-dark-mode.css";
	import favicon from "$lib/assets/favicon.svg";

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<main class="container is-fluid">
	{@render children()}
</main>
