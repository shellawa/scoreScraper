<script>
	import Table from "./Components/Table.svelte"

	async function ksclFetch(year, exam) {
		let response = await fetch(`https://raw.githubusercontent.com/shellawa/scoreScraper/master/data/${year}/${exam}-half.json`).then(res => res.json())
		let indexes = response[0]
		response.shift()
		return {
			indexes: indexes,
			data: response
		}
	}
</script>

{#await ksclFetch("2021", '1')}
	waitin...
{:then response}
	<Table data={response.data} />
{:catch error}
	<p>Error!<p>
	<p>{error}</p>
{/await}