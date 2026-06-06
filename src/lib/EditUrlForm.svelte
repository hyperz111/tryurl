<script>
	let {
		isCreate,
		slug = "",
		urls = $bindable([]),
		showForm = true,

		children,
	} = $props();

	let value = $derived(urls.join("\n"));

	const remove = (index) => {
		if (urls.length > 1) {
			urls = [...urls.slice(0, index), ...urls.slice(index + 1)];
		}
	};

	const add = () => {
		urls = [...urls, ""];
	};
</script>

<form method="POST" class="box container is-max-tablet has-text-centered">
	<fieldset class="is-flex is-flex-direction-column is-gap-3">
		{#if showForm}
			<div>
				<label for="slug" class="label">Slug Name</label>
				<input
					type="text"
					name="slug"
					value={slug}
					class="input"
					placeholder="e.g. my-stacked-url"
					{...{ [isCreate ? "required" : "disabled"]: true }} />
			</div>

			<div>
				<label for="urls" class="label">URLs</label>

				<ul class="is-flex is-flex-direction-column is-gap-1">
					{#each urls as _, index}
						<li class="is-flex is-gap-1">
							<input type="url" class="input" placeholder="e.g. https://example.com" bind:value={urls[index]} required />
							<button type="button" class="button" onclick={() => remove(index)}>×</button>
						</li>
					{/each}
				</ul>

				<button type="button" class="button is-fullwidth mt-2 is-dark" onclick={add}>Add</button>
				<input type="hidden" name="urls" {value} />
			</div>

			<div class="has-text-centered">
				<button type="submit" class="button is-primary">{isCreate ? "Create" : "Save"}</button>
			</div>
		{:else}
			{@render children()}
		{/if}
	</fieldset>
</form>
