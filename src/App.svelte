<script>
	const getData = async (year, test) => {
		const data = await fetch(`https://raw.githubusercontent.com/shellawa/scoreScraper/master/data/${year}/${test}.json`)
		return data.json()
	}
</script>

<div class="container">
{#await getData("2021","1")}
	<p>waitin</p>
{:then data}
	<table class="table table-striped">
		{#each data as score}
			<tr>
				{#each score as info}
					<td>{info}</td>
				{/each}
			</tr>
		{/each}
	</table>
{/await}
</div>