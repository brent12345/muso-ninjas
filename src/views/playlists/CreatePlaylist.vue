<template lang="html">
   <form @submit.prevent="handleSubmit">
    <h4>Create New Playlist</h4>
    <input type="text" required placeholder="Playlist title" v-model="title">
    <textarea required placeholder="Playlist description..." v-model="description"></textarea>
    <label>Upload Playlist Image</label>
    <input type="file" @change="handleChange">
    <div class="fileError">{{ fileError }}</div>
    <div class="error"></div>
    <button v-if="!isPending">Create</button>
    <button v-if="isPending" disabled>Saving Image...</button>
   </form>
</template>
<script>
import { ref } from 'vue'
import useStorage from '@/composables/useStorage'
import useCollection from '@/composables/useCollection'
import getUser from '@/composables/getUser'
import { timeStamp } from '@/firebase/config'
import { useRouter } from 'vue-router'

export default {
    setup() {
        const { filePath, url, uploadImage } = useStorage()
        const { error, addDoc } = useCollection('playlists')
        const { user } = getUser()
        const router = useRouter()
        
        const title = ref('')
        const description = ref('')
        const file = ref('')
        const fileError = ref('')
        const isPending = ref(false)

        const handleSubmit = async () => {
            if (file.value) {
                // is pending
                isPending.value = true
                await uploadImage(file.value)
                const res = await addDoc({
                    title: title.value,
                    description: description.value,
                    userId: user.value.uid,
                    userName: user.value.displayName,
                    coverUrl: url.value,
                    filePath: filePath.value,
                    songs: [],
                    createdAt: timeStamp()

                })
                isPending.value = false
                if (!error.value) {
                    router.push({ name: 'PlaylistDetails', params: {id: res.id }})
                }
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

        return { title, description, handleSubmit, handleChange, fileError, isPending }
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