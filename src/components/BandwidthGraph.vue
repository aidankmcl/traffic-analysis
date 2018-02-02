<template>
  <div class="bandwidth-chart">
    <h2>Bandwidth Usage</h2>
    <vue-c3 v-show="showGraph" :handler="handler"></vue-c3>
    <h1 v-show="!showGraph">No Data for this Timerange</h1>
  </div>
</template>

<script>
import Vue from 'vue'
import VueC3 from 'vue-c3'
import moment from 'moment'

export default {
  components: {
    'vue-c3': VueC3
  },
  props: {
    bandwidthData: Object,
    zoom: Array
  },
  data: function () {
    return {
      handler: new Vue(),
      maxCDN: 0,
      maxThroughput: 0,
      showGraph: false
    }
  },
  watch: {
    bandwidthData: function () {
      this.showGraph = this.bandwidthData['cdn'] && this.bandwidthData['cdn'].length > 0
      // Want to make sure chart updates any time new data is supplied
      if (this.showGraph) this.updateChart()
    },
    zoom: function (domain) {
      this.handler.$emit('dispatch', (chart) => chart.zoom(domain))
    }
  },
  methods: {
    updateChart () {
      const columns = this.prepareColumnData()
      const self = this

      self.handler.$emit('dispatch', (chart) => chart.load({
        columns: columns,
        unload: ['P2P', 'CDN'], // data to be replaced
        done: function () {
          self.handler.$emit('dispatch', (chart) => chart.zoom([moment(columns[0][1]).toDate(), moment(columns[0].slice(-1)[0]).toDate()]))
          self.handler.$emit('dispatch', (chart) => {
            chart.ygrids.remove()
            chart.ygrids.add([
              {
                value: self.maxThroughput,
                text: 'Max Combined Throughput: ' + (self.maxThroughput / 1000000000).toFixed(2) + ' Gbps'
              },
              {
                value: self.maxCDN,
                text: 'Max CDN Throughput: ' + (self.maxCDN / 1000000000).toFixed(2) + ' Gbps'
              }
            ])
          })
        }
      }))
    },

    appendData (bandwidthData, columns, category, index) {
      // Make sure we're still within range!
      if (index < bandwidthData[category].length) {
        // P2P data is stacked on top of CDN values for the same measurement time
        let dataOffset = (category === 'p2p') ? bandwidthData['cdn'][index][1] : 0
        let data = bandwidthData[category][index]

        // Only want to include good data! :)
        if (data.length === 2) {
          // To append to correct columns of C3 input
          let indexOffset = (category === 'p2p') ? 0 : 1

          columns[0 + indexOffset].push(data[0])
          columns[2 + indexOffset].push(data[1] + dataOffset)
        }
      }
    },

    prepareColumnData () {
      // C3 takes a sort of strange format, but generally a very nice library!
      var columns = [
        ['x1'],
        ['x2'],
        ['P2P'],
        ['CDN']
      ]

      if (!this.showGraph) return columns

      // Just a double check in case they don't line up.
      let maxData = Math.max(this.bandwidthData['p2p'].length, this.bandwidthData['cdn'].length)

      for (let i = 0; i < maxData; i++) {
        // We can grab the max throughput and CDN values here while putting the C3 data together
        let cdnValue = this.bandwidthData['cdn'][i][1]
        let p2pValue = this.bandwidthData['p2p'][i][1]
        this.maxCDN = (this.maxCDN < cdnValue) ? cdnValue : this.maxCDN
        this.maxThroughput = (this.maxThroughput < cdnValue + p2pValue) ? cdnValue + p2pValue : this.maxThroughput

        this.appendData(this.bandwidthData, columns, 'p2p', i)
        this.appendData(this.bandwidthData, columns, 'cdn', i)
      }

      return columns
    }
  },
  mounted () {
    const self = this
    const gigabit = 1000000000

    const options = {
      legend: { position: 'inset' },
      zoom: {
        enabled: false,
        onzoom: self.updateZoom // Unfortunately this event doesn't fire :(
      },
      point: { show: false },
      axis: {
        x: {
          type: 'timeseries',
          tick: {
            format: function (x) { return moment(x).format('D MMM') }
          }
        },
        y: {
          tick: {
            format: function (x) { return (x / gigabit).toFixed(2).toString() + ' Gbps' },
            count: 5
          }
        }
      },
      tooltip: {
        format: {
          title: function (x) { return moment(x).format('dddd, MMMM D, hh:mm a') },
          value: function (value, ratio, id, index) {
            var data
            if (id === 'P2P') {
              data = ((value - self.bandwidthData['cdn'][index][1]) / gigabit).toFixed(2)
            } else {
              data = (value / gigabit).toFixed(2)
            }

            return data + ' Gbps'
          }
        }
      },
      data: {
        columns: self.prepareColumnData(),
        xs: {
          'P2P': 'x1',
          'CDN': 'x2'
        },
        types: {
          'P2P': 'area-spline',
          'CDN': 'area-spline'
        },
        colors: {
          P2P: '#4FBCF2',
          CDN: '#B2125C'
        }
      }
    }

    this.handler.$emit('init', options)
  }
}
</script>

<style lang="sass">
@import '../assets/styles/c3.min.css'
@import '../assets/styles/mixins.scss'
@import '../assets/styles/variables.scss'

.bandwidth-chart
  h2
    font-size: 1.5rem
    text-align: left
    margin-bottom: 1.5rem

  .c3-ygrid-lines > g
    line
      stroke-width: 2px
      stroke-dasharray: 8,8
    text
      font-weight: bold
      @include respond-to(medium)
        &
          font-size: 14px
    &:nth-child(1)
      line
        stroke: $green
      text
        fill: $green

    &:nth-child(2)
      line
        stroke: $berry
      text
        fill: $berry

      

    @include respond-to(small)
      line
        stroke-width: 1px
      text
        font-size: 10px

  .c3-axis-x .tick line
    display: none

  .c3-shape
    &.c3-line
      &.c3-line-P2P
        stroke-width: 4px !important
      &.c3-line-CDN
        stroke-width: 2px !important
    &.c3-area
      &.c3-area-P2P
        // Only using important because the other chart styles are on the element
        fill: lighten($light-blue, 25%) !important
        opacity: 1 !important
      &.c3-area-CDN
        fill: lighten($berry, 50%) !important
        opacity: 1 !important
</style>
