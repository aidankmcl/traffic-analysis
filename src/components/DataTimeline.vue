<template>
  <div class="timeline-chart">
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
    timelineData: Object,
    updateZoom: Function
  },
  data: function () {
    return {
      handler: new Vue(),
      showGraph: false
    }
  },
  watch: {
    timelineData: function () {
      this.showGraph = this.timelineData.audience && this.timelineData.audience.length > 0
      // Want to make sure chart updates any time new data is supplied
      this.updateChart()
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

      if (!this.showGraph) return columns

      // Add everything in to prep for plugging into C3 API
      for (let i = 0; i < this.timelineData['audience'].length; i++) {
        let data = this.timelineData['audience'][i]

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
    var updateZoom = this.updateZoom
    const options = {
      legend: { position: 'inset' },
      subchart: {
        show: true,
        onbrush: updateZoom
      },
      point: { show: false },
      axis: {
        x: {
          type: 'timeseries',
          tick: {
            count: 6,
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
        type: 'area-spline',
        colors: {
          Viewers: '#E65F00'
        },
        columns: this.prepareColumnData()
      },
      oninit: function () {
        console.log(document.querySelector('.timeline-chart svg g:nth-child(1)'))
      }
    }

    this.handler.$emit('init', options)
  }
}
</script>

<style lang="sass">
@import '../assets/styles/c3.min.css'
@import '../assets/styles/variables.scss'

.timeline-chart
  position: relative
  top: 0

  svg
    height: 110px

  svg > defs, svg > g:nth-child(2), svg > g:nth-child(4)
    display: none
    height: 0

  svg > g:nth-child(3)

    g.c3-lines.c3-lines-Viewers > path
      stroke: white !important

    g.c3-areas.c3-areas-Viewers > path
      fill: white !important
      opacity: 1 !important

    g.c3-brush > rect.extent
      fill: $dark-blue !important
      fill-opacity: 1 !important
      opacity: 0.4 !important
      stroke: $berry !important
      stroke-opacity: 1
      stroke-width: 2px

    .c3-axis-x
      path
        stroke-width: 1px
        fill: white
        stroke: none
      .tick
        line
          display: none
        text
          font-weight: bold
          fill: white !important

  .c3-shape.c3-line.c3-line-Viewers
    stroke-width: 2px !important
</style>
