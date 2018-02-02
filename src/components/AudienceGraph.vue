<template>
  <div class="audience-chart">
    <vue-c3 :handler="handler"></vue-c3>
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
    audienceData: Object,
    zoom: Array
  },
  data: function () {
    return {
      handler: new Vue()
    }
  },
  watch: {
    audienceData: function () {
      // Want to make sure chart updates any time new data is supplied
      this.updateChart()
    },
    zoom: function (domain) {
      this.handler.$emit('dispatch', (chart) => chart.zoom(domain))
    }
  },
  methods: {
    updateChart () {
      const columns = this.prepareColumnData()
      this.handler.$emit('dispatch', (chart) => chart.load({
        columns: columns,
        unload: ['Viewers'] // data to be replaced
      }))
    },

    prepareColumnData () {
      // C3 takes a sort of strange format, but generally a very nice library!
      var columns = [
        ['x'],
        ['Viewers']
      ]

      // Add everything in to prep for plugging into C3 API
      for (let i = 0; i < this.audienceData['audience'].length; i++) {
        let data = this.audienceData['audience'][i]

        // Only proper data please :)
        if (data.length === 2) {
          columns[0].push(data[0])
          columns[1].push(data[1])
        }
      }

      return columns
    }
  },
  mounted () {
    const updateZoom = this.updateZoom

    const options = {
      legend: { position: 'inset' },
      zoom: {
        enabled: false,
        onzoom: updateZoom // Unfortunately this event doesn't fire :(
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
            format: function (x) { return Math.round(x / 1000).toString() + 'K' },
            culling: true
          }
        }
      },
      data: {
        x: 'x',
        colors: {
          Viewers: '#E65F00'
        },
        columns: this.prepareColumnData()
      }
    }

    this.handler.$emit('init', options)
  }
}
</script>

<style>
@import '../assets/styles/c3.min.css'
</style>

<style lang="sass">
.audience-chart
  .c3-axis-x .tick line
    display: none

  .c3-shape.c3-line.c3-line-Viewers
    stroke-width: 2px !important
</style>
