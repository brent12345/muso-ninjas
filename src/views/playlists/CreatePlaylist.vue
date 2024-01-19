<template lang="html">
   <form @submit.prevent="handleSubmit">
    <h4>Create New Playlist</h4>
    <input type="text" required placeholder="Playlist title" v-model="title">
    <textarea required placeholder="Playlist description..." v-model="description"></textarea>
    <label>Upload Playlist Image</label>
    <input type="file" @change="handleChange">
    <div class="fileError">{{ fileError }}</div>
    <div class="error"></div>
    <button>Create</button>
   </form>
</template>
<script>
import { ref } from 'vue'
import useStorage from '@/composables/useStorage'

export default {
    setup() {
        const { filePath, url, uploadImage } = useStorage()


        const title = ref('')
        const description = ref('')
        const file = ref('')
        const fileError = ref('')

        const handleSubmit = async () => {
            if (file.value) {
                await uploadImage(file.value)
                console.log('image uploaded, url: ', url.value)
            }
        }

        // allow file types
        const types = ['image/png', 'image/jpeg']

        const handleChange = (e) => {
                const selected = e.target.files[0]
                console.log(selected)
                if (selected && types.includes(selected.type)) {
                    file.value = selected
                    fileError.value = null
                } else {
                    file.value = null
                    fileError.value = 'please select image file (png or jpg)'
                }
        }

        return { title, description, handleSubmit, handleChange, fileError }
    }
}
</script>
<style lang="css">

  input[type="file"] {
    border: 0;
    padding: 0;
  }
  label {
    font-size: 12px;
    display: block;
    margin-top: 30px;
  }
  button {
    margin-top: 20px;
  }
</style>