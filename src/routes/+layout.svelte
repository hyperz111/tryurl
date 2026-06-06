<script>
	import "bulma/css/versions/bulma-no-dark-mode.css";
	import favicon from "$lib/assets/favicon.svg";
	import NavigationBar from "$lib/NavigationBar.svelte";

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<NavigationBar />

<main class="container is-fluid py-5">
	{@render children()}
</main>
