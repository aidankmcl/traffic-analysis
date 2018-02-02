<template>
  <div>
    <vue-c3 :handler="handler" class="bandwidth-chart"></vue-c3>
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
    bandwidthData: Object
  },
  data: function () {
    return {
      handler: new Vue()
    }
  },
  watch: {
    bandwidthData: function () {
      this.updateChart()
    }
  },
  methods: {
    updateChart () {
      const columns = this.prepareColumnData()
      this.handler.$emit('dispatch', (chart) => chart.load({
        columns: columns,
        unload: ['P2P', 'CDN']
      }))
    },

    appendData (bandwidthData, columns, category, index) {
      if (index < bandwidthData[category].length) {
        // P2P data is stacked on top of CDN values for the same measurement time
        let dataOffset = (category === 'p2p') ? bandwidthData['cdn'][index][1] : 0
        let data = bandwidthData[category][index]

        if (data.length === 2) {
          // To append to correct columns of C3 input
          let indexOffset = (category === 'p2p') ? 0 : 1

          columns[0 + indexOffset].push(data[0])
          columns[2 + indexOffset].push(data[1] + dataOffset)
        }
      }
    },

    prepareColumnData () {
      var columns = [
        ['x1'],
        ['x2'],
        ['P2P'],
        ['CDN']
      ]

      let maxData = Math.max(this.bandwidthData['p2p'].length, this.bandwidthData['cdn'].length)

      for (let i = 0; i < maxData; i++) {
        this.appendData(this.bandwidthData, columns, 'p2p', i)
        this.appendData(this.bandwidthData, columns, 'cdn', i)
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
            format: function (x) { return (x / 1000000000).toFixed(2).toString() + 'Gbps' },
            count: 5
          }
        }
      },
      data: {
        columns: this.prepareColumnData(),
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

<style>
@import './../assets/styles/c3.min.css'
</style>

<style type="text/css">
.c3-axis-x .tick line{
  display: none;
}
</style>
