<template>
  <div>
    <h1>Sign In</h1>
    <login-form
      @success="proceedToProfile"
      @failure="handleError"
      :fill-username="sampleUsername"
      :fill-password="samplePassword"></login-form>
  </div>
</template>

<script>
import LoginForm from './../components/LoginForm'

export default {
  name: 'Login',
  components: {
    'login-form': LoginForm
  },
  data () {
    // NOTE: Only for demo, would never toss credentials into app code!
    return {
      sampleUsername: 'swagtv',
      samplePassword: 'bling$bling'
    }
  },
  methods: {
    proceedToProfile: function (token) {
      this.$store.dispatch('getUserInfo', token)
        .then((userInfo) => {
          this.$router.push('/')
        })
        .catch((err) => {
          console.error(err)
        })
    },
    handleError: function (err) {
      console.error(err)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
