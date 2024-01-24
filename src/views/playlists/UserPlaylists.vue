<template lang="">
    <div class="user-playlists">
        <p>Users Playlists Page</p>
        <div v-if="playlists">
            <ListView :playlists="playlists" />
        </div>
        <router-link :to="{ name: 'CreatePlaylist' }" class='btn'>Create a New Playlist</router-link>
    </div>
</template>
<script>
import getUser from '@/composables/getUser'
import getCollection from '@/composables/getCollection'
import ListView from '@/components/ListView.vue'

export default {
    components: { ListView },
    setup() {
        const { user } = getUser()
        const { documents: playlists } = getCollection(
            'playlists',
            ['userId', '==', user.value.uid])

        console.log(playlists)

        return { playlists }
    }
}
</script>
<style lang="">
    
</style>