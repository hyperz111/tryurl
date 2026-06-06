<script>
	import EditUrlForm from "$lib/EditUrlForm.svelte";

	let { data, form } = $props();

	// Make it editable
	let urls = $state([...data.urls]);
</script>

<h1 class="title has-text-centered">Edit</h1>

<EditUrlForm isCreate={false} bind:urls slug={data.slug} showForm={!form?.success}>
	<p class="has-text-bold">Changes for <b>{data.slug}</b> is saved!</p>
</EditUrlForm>
