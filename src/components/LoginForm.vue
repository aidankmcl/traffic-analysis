<template>
  <form @submit.prevent="submitForm">
    <input type="text" name="identifiant" placeholder="Username" v-model="username"/>
    <input type="password" name="password" placeholder="Password" v-model="password"/>
    <button type="submit">Submit</button>
  </form>
</template>

<script>
import User from './../api/user'

export default {
  name: 'LoginForm',
  props: {
    fillUsername: String,
    fillPassword: String
  },
  data: function () {
    return {
      username: this.fillUsername || '',
      password: this.fillPassword || ''
    }
  },
  methods: {
    submitForm: function () {
      // Form Logic
      User.login(this.username, this.password)
    }
  }
}
</script>
