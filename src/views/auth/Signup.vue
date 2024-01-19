<template lang="">
    <form @submit.prevent = "handleSubmit">
        <h3>Sign Up</h3>
        <input type="text" placeholder="Display Name" v-model="displayName">
        <input type="email" placeholder="email" v-model="email">
        <input type="password" placeholder="Password" v-model="password">
        <div v-if="error" class="error">{{ error }}</div>
        <button v-if="!isPending">Sign Up</button>
        <button v-if="isPending" disabled>Loading</button>
    </form> 
</template>

<script>

import useSignup from '@/composables/useSignup'  
import { ref } from 'vue'

export default {
    setup () {
        const { error, signup, isPending } = useSignup()
        const email = ref('')
        const password = ref('')
        const displayName = ref('')

        const handleSubmit = async () => {
                const res = await signup( email.value, password.value, displayName.value )
                if (!error.value) {
                    console.log('user signed up')
                }
        }


        return { email, password, displayName, isPending, error, handleSubmit }
    }
    
}
</script>
<style lang="">
    
</style>