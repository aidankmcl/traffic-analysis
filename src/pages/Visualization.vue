<template>
  <div>
    <header class="hello">
      <h1>Cool Visualization</h1>
    </header>
    <section>
      <input type="date" v-model="fromDatestring" @change="updateRange" name="fromDate">
      <input type="date" v-model="toDatestring" @change="updateRange" name="toDate">
      <bandwidth-graph :bandwidthData="bandwidthData"></bandwidth-graph>
      <audience-graph :audienceData="audienceData"></audience-graph>
    </section>
  </div>
</template>

<script>
import moment from 'moment'

import BandwidthGraph from './../components/BandwidthGraph'
import AudienceGraph from './../components/AudienceGraph'
import DataTimeline from './../components/DataTimeline'

export default {
  name: 'Visualization',
  data: function () {
    return {
      fromDatestring: moment().subtract(1, 'months').format('YYYY-MM-DD'),
      toDatestring: moment().format('YYYY-MM-DD')
    }
  },
  computed: {
    bandwidthData: function () {
      return this.$store.state.data.bandwidthData
    },
    audienceData: function () {
      return this.$store.state.data.audienceData
    },
    fromDate: function () {
      return moment(this.fromDatestring).toDate()
    },
    toDate: function () {
      return moment(this.toDatestring).toDate()
    }
  },
  components: {
    'bandwidth-graph': BandwidthGraph,
    'audience-graph': AudienceGraph,
    'data-timeline': DataTimeline
  },
  created () {
    this.updateRange()
  },
  methods: {
    updateRange (stuff) {
      let range = {fromTime: this.fromDate.getTime(), toTime: this.toDate.getTime()}
      this.$store.dispatch('updateRange', range)
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
