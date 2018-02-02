<template>
  <div class="login-page">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h1 class="m-0 pt-5 pb-4 text-white">Sign In</h1>
        </div>
      </div>
      <div class="row">
        <div class="col-10 offset-1 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-4 offset-lg-4">
          <div class="login-form-wrapper">
            <login-form
              @success="proceedToProfile"
              @failure="handleError"
              :fill-username="sampleUsername"
              :fill-password="samplePassword"></login-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoginForm from '@/components/LoginForm'

export default {
  name: 'Login',
  components: {
    'login-form': LoginForm
  },
  data () {
    // NOTE: Only for demo, would never toss credentials into app code!
    return {
      sampleUsername: 'urtoob',
      samplePassword: 'ToobRU'
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
<style lang="sass" scoped>
@import '../assets/styles/bootstrap.min.css'
@import '../assets/styles/variables.scss'

.login-page
  height: 100vh
  background: $light-blue

  h1
    font-size: 3rem
    font-family: 'Montserrat'

  .login-form-wrapper
    background: white
    padding: 1.25rem 2rem
</style>
