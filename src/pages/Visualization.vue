<template>
  <div>
    <custom-header></custom-header>

    <section id="timing" class="container my-5">
      <div class="row">
        <div class="col-sm-5 col-xs-12">
          <input class="form-control my-2" type="date" v-model="fromDatestring" @change="updateRange" name="fromDate">
        </div>
        <div class="col-sm-2 col-xs-12 text-center">
          <span class="to my-2">to</span>
        </div>
        <div class="col-sm-5 col-xs-12">
          <input class="form-control my-2" type="date" v-model="toDatestring" @change="updateRange" name="toDate">
        </div>
      </div>
    </section>

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
        <data-timeline :updateZoom="updateZoom" :timelineData="audienceData"></data-timeline>
      </div>
    </footer>
  </div>
</template>

<script>
import moment from 'moment'
import debounce from 'lodash/debounce'

import Header from '../components/Header'
import BandwidthGraph from '../components/BandwidthGraph'
import AudienceGraph from '../components/AudienceGraph'
import DataTimeline from '../components/DataTimeline'

const fifteenDaysAgo = moment().subtract(15, 'days')
export default {
  name: 'Visualization',
  components: {
    'custom-header': Header,
    'bandwidth-graph': BandwidthGraph,
    'audience-graph': AudienceGraph,
    'data-timeline': DataTimeline
  },
  data: function () {
    return {
      fromDatestring: fifteenDaysAgo.format('YYYY-MM-DD'),
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
      if (!this.fromDatestring) return fifteenDaysAgo.toDate()
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
    updateRange () {
      let range = {fromTime: this.fromDate.getTime(), toTime: this.toDate.getTime()}
      this.updateZoom([this.fromDate, this.toDate])
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

section#timing
  .to
    display: block
    font-size: 1.5rem
    font-weight: bold

section#audience
  padding-bottom: 8rem

footer
  background: $light-blue;
  width: 100%
  position: fixed
  height: 8rem
  bottom: 0
</style>
