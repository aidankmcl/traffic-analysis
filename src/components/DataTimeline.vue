<template>
  <div>
    <vue-c3 :handler="handler" class="audience-chart"></vue-c3>
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
    audienceData: Object
  },
  data: function () {
    return {
      handler: new Vue()
    }
  },
  watch: {
    audienceData: function () {
      console.log(this.audienceData)
      this.updateChart()
    }
  },
  methods: {
    updateChart () {
      const columns = this.prepareColumnData()
      this.handler.$emit('dispatch', (chart) => chart.load({
        columns: columns,
        unload: ['Viewers']
      }))
    },

    prepareColumnData () {
      var columns = [
        ['x'],
        ['Viewers']
      ]

      for (let i = 0; i < this.audienceData['audience'].length; i++) {
        let data = this.audienceData['audience'][i]
        if (data.length === 2) {
          columns[0].push(data[0])
          columns[1].push(data[1])
        }
      }

      return columns
    }
  },
  mounted () {
    const options = {
      legend: { position: 'inset' },
      subchart: { show: true },
      zoom: { enabled: true },
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
        columns: this.prepareColumnData()
      }
    }

    this.handler.$emit('init', options)
  }
}
</script>

<style>
@import './../assets/styles/c3.min.css'
</style>

<style type="text/css">
.c3-axis-x .tick line{
  display: none;
}
</style>
