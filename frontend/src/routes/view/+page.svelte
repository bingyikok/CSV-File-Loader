<script lang="ts">
  import { onMount } from "svelte";
  import axios from 'axios';

  export let data: any = [];
  export let error: string | null = null;
  
  let items : any = data.data;
  let currentPage : number = 1;
  let itemsPerPage : number = 10;
  let totalPages : number;
  let totalEntries : number = 0;

  const headers = Object.keys(items[0]);

  onMount(async() => {
	try {
		const response = await axios.get('http://localhost:3000/getentries', {
			headers: { 'Content-Type': 'application/json' }
		});

    if (response.status === 200) {
      totalEntries = response.data;
      totalPages = Math.ceil(totalEntries / itemsPerPage);
    }
	} catch (error: any) {
		return {
			error: error?.response.data?.message || 'Failed to fetch data'
		};
};
  })

  async function updateRows(index: number) {
    const limit = itemsPerPage;
    const skip = index * itemsPerPage;
    currentPage = index;
    totalPages = Math.ceil(totalEntries / itemsPerPage);
    try {
		const response = await axios.post(`http://localhost:3000/data?limit=${limit}&skip=${skip}`, {
			headers: { 'Content-Type': 'application/json' }
		});

		if (response.status === 200) {
      items = response.data;
    }
	} catch (error: any) {
		console.error('Error fetching data:', error);
		return {
			error: error.response?.data?.message || 'Failed to fetch data'
		};
	}
  }

  function nextPage() {
    if (currentPage < totalPages) {
      updateRows(currentPage+1);
    }
  }

  function prevPage() {
    if (currentPage > 1) {
      updateRows(currentPage-1);
    }
  }
</script>

{#if error}
  <p>Error: {error}</p>
{:else}
  {#if items.length > 0}
    <table>
      <thead>
        <tr>
          {#each headers as header}
          <th>{header}</th>
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each items as row}
          <tr>
            {#each headers as header}
            <td>{row[header]}</td>
            {/each}
            
          </tr>
        {/each}
      </tbody>
    </table>
<div class="pagination">
  {#each Array(totalPages) as _, index}
    <button on:click={()=>updateRows(index)}>
      {index + 1}
    </button>
  {/each}
</div>
    <label for="itemsPerPage">Items per page:</label>
    <input type="number" id="itemsPerPage" bind:value={itemsPerPage} min="1" max=totalEntries on:change={() => updateRows(0)} />
    <button on:click={prevPage} disabled={currentPage === 1}>Previous</button>
    <button on:click={nextPage} disabled={currentPage === totalPages}>Next</button>
    <p>Page {currentPage} of {totalPages}</p>
  {:else}
    <p>No data available.</p>
  {/if}
{/if}