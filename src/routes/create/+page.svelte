<script>
	import EditUrlForm from "$lib/EditUrlForm.svelte";

	let { form } = $props();

	let urls = $state([""]);
</script>

<h1>Create</h1>

<EditUrlForm submitButtonText="Create" bind:urls />

{#if form?.success}
	<p>Slug: {form.slug}</p>
	<p>Token: {form.token}</p>
{/if}
