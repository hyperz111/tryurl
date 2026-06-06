<script>
	let { form } = $props();

	let urls = $state([""]);
	let value = $derived(urls.join("\n"));

	const remove = (index) => {
		if (urls.length > 1) {
			urls = [...urls.slice(0, index), ...urls.slice(index + 1)];
		}
	};
</script>

<h1>Create</h1>

<form method="POST">
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
	<button type="submit">Create</button>
</form>

{#if form?.success}
	<p>Slug: {form.slug}</p>
	<p>Token: {form.token}</p>
{/if}
