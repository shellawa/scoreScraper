<script>
	import Table from "./Components/Table.svelte"

	async function ksclFetch(year, exam) {
		const response = await fetch(
			`https://raw.githubusercontent.com/shellawa/scoreScraper/master/data/${year}/${exam}-half.json`
		)
		const data = await response.json()
		return data
	}
</script>

{#await ksclFetch("2021", '1')}
	waitin...
{:then data} 
	<Table data={data} />
{:catch}
	<p>Error</p>
{/await}