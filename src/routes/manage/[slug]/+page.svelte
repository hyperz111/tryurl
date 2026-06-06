<script>
	let { data, form } = $props();

	// Make it editable
	let urls = $state([...data.urls]);
	let value = $derived(urls.join("\n"));

	const remove = (index) => {
		if (urls.length > 1) {
			urls = [...urls.slice(0, index), ...urls.slice(index + 1)];
		}
	};
</script>

<h1>Manager</h1>

<form method="POST">
	<p>Slug: {data.slug}</p>
	<textarea name="urls" {value} hidden></textarea>

	<div>
		{#each urls as url, index}
			<span>
				<input type="text" bind:value={urls[index]} required />
				<button onclick={() => remove(index)}>×</button>
			</span>
		{/each}
	</div>

	<button onclick={() => urls.push("")}>Add</button>
	<button type="submit">Update</button>
</form>

{#if form?.success}
	<p>Success</p>
{/if}
