<script>
	import { onNavigate } from "$app/navigation";
	import { slide } from "svelte/transition";

	let opened = $state(false);

	const menus = [
		["/", "Home"],
		["/create", "Create"],
		["/edit", "Edit"],
	];

	onNavigate(() => {
		opened = false;
	});
</script>

<header>
	<nav class="navbar container is-fixed-top has-shadow">
		<div class="navbar-brand">
			<a href="/" class="navbar-item">TryURL</a>
			<button title="navbar burger button" class="navbar-burger" onclick={() => (opened = !opened)}>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
			</button>
		</div>
		<div class="navbar-menu">
			<div class="navbar-end">
				{#each menus as [href, label] (href)}
					<a {href} class="navbar-item">{label}</a>
				{/each}
			</div>
		</div>
		{#if opened}
			<div transition:slide class="menu">
				<div class="menu-list">
					{#each menus as [href, label] (href)}
						<a {href} class="menu-item">{label}</a>
					{/each}
				</div>
			</div>
		{/if}
	</nav>
</header>
