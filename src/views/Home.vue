<template>
  <div class="home">
    <div v-if="error" class="error">Could Not Fetch Playlists</div>
    <div v-if="documents">
      <ListView :playlists="documents" />
    </div>
    <p>Home Page</p>
  </div>
</template>

<script>

import getCollection from '@/composables/getCollection'
import ListView from '@/components/ListView'
export default {
  name: 'Home',
  components: {
      ListView
  },
  setup () {
      const { error, documents } = getCollection('playlists')



      return { error, documents}
  }
}
</script>
