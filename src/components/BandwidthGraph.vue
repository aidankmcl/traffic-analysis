<template>
  <div>
    <vue-c3 :handler="handler" class="bandwidth-chart"></vue-c3>
    <button @click="log(graphData)"></button>
  </div>
</template>

<script>
import Vue from 'vue'
import VueC3 from 'vue-c3'
import moment from 'moment'

export default {
  props: {
    id: { type: String, required: true },
    fromTime: Number,
    toTime: Number,
    graphData: Object
  },
  components: {
    'vue-c3': VueC3
  },
  data: function () {
    return {
      handler: new Vue()
    }
  },
  methods: {},
  mounted () {
    var columns = [
      ['x1'],
      ['x2'],
      ['P2P'],
      ['CDN']
    ]

    function appendData (graphData, category, index) {
      let offset = (category === 'p2p') ? 0 : 1
      if (index < graphData[category].length) {
        let data = graphData[category][index]
        if (data.length === 2) {
          columns[0 + offset].push(data[0])
          columns[2 + offset].push(data[1])
        }
      }
    }
    let maxData = Math.max(this.graphData['p2p'].length, this.graphData['cdn'].length)

    for (let i = 0; i < maxData; i++) {
      appendData(this.graphData, 'p2p', i)
      appendData(this.graphData, 'cdn', i)
    }

    const options = {
      zoom: {
        enabled: true
      },
      point: {
        show: false
      },
      axis: {
        x: {
          type: 'timeseries',
          tick: {
            format: function (x) { return moment(x).format('M/DD') }
          }
        },
        y: {
          tick: {
            format: function (x) { return (x / 1000000000).toString() + 'Gbps' }
          }
        }
      },
      data: {
        columns: columns,
        xs: {
          'P2P': 'x1',
          'CDN': 'x2'
        },
        types: {
          'P2P': 'area-spline',
          'CDN': 'area-spline'
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
