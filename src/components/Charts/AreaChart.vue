<template>
  <div :key="renderKey">
    <apexchart :width="width" height="350" ref="chart" type="area" :options="options" :series="series"></apexchart>

  </div>
</template>

<script>
export default {
  data() {
    return {
      chart: null,
      width: 600,
      renderKey: 1,
      options: {
        dataLabels: {
          enabled: false,
        },
        chart: {
          type: "area",
          height: 200,
          animations: {
            enabled: false,
            animateGradually: {
              enabled: false,
            },
            dynamicAnimation: {
              enabled: false,
            },
          },
        },

        xaxis: {
          categories: [],
        },
        yaxis: {
          labels: {
            formatter: (value) => {
              return Math.round(value, 3);
            },
          },
        },
      },
      series: [],
    };
  },
  props: {
    Series: {
      type: Array,
      default() {
        return [
          {
            name: "data1",
            data: [2, 1, 2, 1],
          },
          {
            name: "data2",
            data: [1, 2, 3, 4],
          },
        ];
      },
    },
    Options: {
      type: Object,
      default() {
        return {
          series: [],
          xlabels: [],
        };
      },
    },
  },

  watch: {
    Options: {
      handler: function (newval, oldval) {
        console.log("new", newval);
        this.series = newval.series;
        this.options.xaxis.categories = newval.xlabels;
        this.$refs["chart"].refresh();
      },
      deep: true,
    },
  },
  methods: {
    AutoSize() {
      this.width = document.documentElement.clientWidth * 0.9;
    },
  },
  mounted() {
    this.AutoSize();
    window.addEventListener("resize", (e) => {
      this.AutoSize();
    });
  },
};
</script>

<style>
#chart {
}
</style>
