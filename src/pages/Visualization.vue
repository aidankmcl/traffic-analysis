<template>
  <div>
    <header class="hello">
      <h1>Cool Visualization</h1>
    </header>
    <section>
      <input type="date" v-model="fromDate" name="fromDate">
      <input type="date" v-model="toDate" name="toDate">
      <bandwidth-graph :data="data"></bandwidth-graph>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import BandwidthGraph from './../components/BandwidthGraph'
import DataTimeline from './../components/DataTimeline'

export default {
  name: 'Visualization',
  data: function () {
    return {
      fromDate: new Date(),
      toDate: new Date()
    }
  },
  computed: {
    ...mapState(['data', 'info'])
  },
  components: {
    'bandwidth-graph': BandwidthGraph,
    'data-timeline': DataTimeline
  },
  created () {
    this.$store.dispatch('updateRange')
  },
  methods: {
    updateRange (date) {}
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
