<template>
  <form class="login-form" @submit.prevent="submitForm">
    <input class="form-control my-4" type="text" name="identifiant" placeholder="Username" v-model="username"/>
    <input class="form-control my-4" type="password" name="password" placeholder="Password" v-model="password"/>
    <button class="form-control my-4" type="submit">Submit</button>
  </form>
</template>

<script>
export default {
  name: 'LoginForm',
  // Allow for passing defaults to prefill fields with on initialization
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
      /*
      Form Logic, submit data using User store action

      Emits success/failure events so that parents know what to do with form
      result (e.g. <login-form v-on:success="doSomething"></login-form>) etc.
      */

      let credentials = {username: this.username, password: this.password}
      this.$store.dispatch('login', credentials)
        .then((token) => {
          this.$emit('success', token)
        })
        .catch((err) => {
          // FUTURE: Default handling of errors within component.
          this.$emit('failure', err)
        })
    }
  }
}
</script>

<style lang="sass">
@import '../assets/styles/bootstrap.min.css'
@import '../assets/styles/variables.scss'
@import '../assets/styles/mixins.scss'

.login-form
  button
    background: $light-blue
    color: white
    font-weight: bold
    font-family: "Roboto"
    outline: none
    border: 0
    cursor: pointer
    @include shift()
    &:hover
      background: lighten($light-blue, 5%)
</style>
