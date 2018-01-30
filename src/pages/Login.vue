<template>
  <div class="hello">
    <h1>Sign In</h1>
    <!-- NOTE: Only for demo purposes, would never toss credentials into app code -->
    <login-form :fill-username="sampleUsername" :fill-password="samplePassword"></login-form>
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
    return {
      sampleUsername: 'shinynewclient',
      samplePassword: 'siriusblack'
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
