<template>
  <header>
    <div class="container">
      <div class="row my-2">
        <div class="col-6">
          <h1>{{ user.company }}</h1>
          <h2>{{ fullName }}</h2>
        </div>
        <div class="col-6 text-right">
          <button @click.prevent="logout" class="logout my-2">Logout</button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'custom-header',
  computed: {
    user: function () {
      return this.$store.state.user.info
    },
    fullName: function () {
      return this.user.fname + ' ' + this.user.lname
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('logout')
        .then((res) => {
          this.$router.push('login')
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../assets/styles/variables.scss'

header
  border-bottom: 10px solid $light-blue

  h1, h2
    text-align: left
    display: block
    width: 100%
  h1
    font-size: 2rem
    font-weight: bold
  h2
    font-size: 1.25rem

  button.logout
    font-weight: bold
    color: $light-grey
    font-size: 1.25rem
    background: none
    border: none
    cursor: pointer
</style>
