<script>
	import "bulma/css/versions/bulma-no-dark-mode.css";
	import { page } from "$app/state";
	import NavigationBar from "$lib/NavigationBar.svelte";
	import favicon from "$lib/assets/favicon.svg";

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<NavigationBar />

<main class="container {page.url.pathname === '/' ? 'mt-1' : 'is-fluid mt-5'} py-6">
	{@render children()}
</main>
