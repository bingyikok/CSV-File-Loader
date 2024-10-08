<script lang="ts">
  import axios from 'axios';

  let file: File | null = null;
  let message: string = "";

  function handleFileUpload(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      file = target.files[0];
    }
  }

  async function uploadFile() {
    if (file) {
      const formData = new FormData();
      formData.append('csvFile', file);
      try {
        const response = await axios.post('http://localhost:3000/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        if (response.status === 200) {
            message = "Upload success."
        }
      } catch (error: any) {
        console.error('Error uploading file:', error);
        // Set the error message from the server, if available
        if (error.response && error.response.data && error.response.data.error) {
          message = error.response.data.error;
        } else {
          message = "An unknown error occurred during file upload.";
        }
      }
    }
  }
</script>

<div>
  <input type="file" accept=".csv" on:change={handleFileUpload} />
  <button on:click={uploadFile}>Upload</button>
</div>

{#if message}
  <p>{message}</p>
{/if}