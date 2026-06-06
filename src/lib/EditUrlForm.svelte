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
	<fieldset class="is-flex is-flex-direction-column is-gap-2">
		{#if showForm}
			<div>
				<label for="slug" class="label is-flex is-flex-direction-column">
					Slug Name
					<span class="has-text-grey is-size-7">(no whitespace)</span>
				</label>
				<input
					type="text"
					name="slug"
					bind:value={slug}
					class="input"
					placeholder="e.g. my-stacked-url"
					{...{ [isCreate ? "required" : "disabled"]: true }} />
			</div>

			<div>
				<label for="urls" class="label is-flex is-flex-direction-column">
					URLs
					<span class="has-text-grey is-size-7">(max. 5 URLs)</span>
				</label>

				<ul class="is-flex is-flex-direction-column is-gap-1">
					{#each urls as _, index}
						<li class="is-flex is-gap-1">
							<input type="url" class="input" placeholder="e.g. https://example.com" bind:value={urls[index]} required />
							{#if urls.length > 1}
								<button type="button" class="button" onclick={() => remove(index)}>×</button>
							{/if}
						</li>
					{/each}
				</ul>

				{#if urls.length < 5}
					<button type="button" class="button is-fullwidth mt-2 is-dark" onclick={add}>Add</button>
				{/if}

				<input type="hidden" name="urls" {value} />
			</div>

			<div class="has-text-centered">
				<button type="submit" class="button is-primary" disabled={slug !== "" && /\s/.test(slug)}
					>{isCreate ? "Create" : "Save"}</button>
			</div>
		{:else}
			{@render children()}
		{/if}
	</fieldset>
</form>
