<script>
	import EditUrlForm from "$lib/EditUrlForm.svelte";

	let { data, form } = $props();

	// Make it editable
	let urls = $state([...data.urls]);
</script>

<h1>Edit Slug</h1>

<EditUrlForm isCreate={false} bind:urls slug={data.slug} />

{#if form?.success}
	<p>Success</p>
{/if}
