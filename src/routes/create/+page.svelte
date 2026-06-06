<script>
	import EditUrlForm from "$lib/EditUrlForm.svelte";

	let { form } = $props();

	let urls = $state([""]);
</script>

<h1>Create Slug</h1>

<EditUrlForm isCreate={true} bind:urls />

{#if form}
	{#if form.success}
		<p>Slug Name: {form.slug}</p>
		<p>Edit Token: {form.token}</p>
	{:else}
		<p>{form.reason}</p>
	{/if}
{/if}
