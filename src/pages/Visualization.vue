<template>
  <div>
    <header class="hello">
      <h1>Cool Visualization</h1>
      <input type="date" v-model="fromDatestring" @change="updateRange" name="fromDate">
      <input type="date" v-model="toDatestring" @change="updateRange" name="toDate">
    </header>

    <section id="bandwidth" class="container my-5">
      <!-- Pass our data to the graphs and the graphs will update whenever that data changes! -->
      <bandwidth-graph :bandwidthData="bandwidthData" :updateZoom="updateZoom" :zoom="timelineZoom"></bandwidth-graph>
    </section>

    <section id="audience" class="container my-5">
      <audience-graph :audienceData="audienceData" :updateZoom="updateZoom" :zoom="timelineZoom"></audience-graph>
    </section>

    <footer>
      <div class="container">
        <!-- Passing in audience data since it gives rough idea, timeline doesn't need detail -->
        <data-timeline :updateZoom="updateZoom" :zoom="timelineZoom" :timelineData="audienceData"></data-timeline>
      </div>
    </footer>
  </div>
</template>

<script>
import moment from 'moment'
import debounce from 'lodash/debounce'

import BandwidthGraph from '../components/BandwidthGraph'
import AudienceGraph from '../components/AudienceGraph'
import DataTimeline from '../components/DataTimeline'

export default {
  name: 'Visualization',
  components: {
    'bandwidth-graph': BandwidthGraph,
    'audience-graph': AudienceGraph,
    'data-timeline': DataTimeline
  },
  data: function () {
    return {
      fromDatestring: moment().subtract(1, 'months').format('YYYY-MM-DD'),
      toDatestring: moment().format('YYYY-MM-DD'),
      timelineZoom: []
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
  created () {
    this.updateRange()
  },
  methods: {
    updateRange (stuff) {
      let range = {fromTime: this.fromDate.getTime(), toTime: this.toDate.getTime()}
      this.$store.dispatch('updateRange', range)
    },
    updateZoom: debounce(function (domain) {
      // Debounced so it's not super jittery from trying to run every update
      this.timelineZoom = domain
    }, 100)
  }
}
</script>

<style lang="sass">
@import '../assets/styles/bootstrap.min.css'
@import '../assets/styles/variables'

section#audience
  padding-bottom: 8rem

footer
  background: $light-blue;
  width: 100%
  position: fixed
  height: 8rem
  bottom: 0
</style>
