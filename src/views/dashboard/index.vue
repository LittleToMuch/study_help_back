<template>
  <div class="dashboard-container">
    <div class="dashboard-text">欢迎您: {{ `${name}${level === 1 ? '管理员' : '老师'}` }}</div>
    <el-divider />
    <div id="main" ref="amountData"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import request from '@/utils/request'
export default {
  name: 'Dashboard',
  data() {
    return {
      amount: [
        'experience',
        'learning',
        'tutsau',
        'users',
        'teacher'
      ],
      amountOption: {},
      amountChart: null
    }
  },
  computed: {
    ...mapGetters(['name', 'level'])
  },
  watch: {
    amountOption: {
      handler(newVal, oldVal) {
        newVal && this.init()
      },
      deep: true
    }
  },
  async created() {
    const experience = this.getList('/api/experience/list')
    const learning = this.getList('/api/learning/list')
    const tutsau = this.getList('/api/tutsau/list')
    const users = this.getList('/api/users/userList')
    const teacher = this.getList('/api/admin/list')
    const res = await Promise.all([experience, learning, tutsau, users, teacher])
    const arr = [...res]
    arr.sort((a, b) => b - a)
    this.amountOption.visualMap.max = arr[0] * 1.5
    this.amountOption.series[0].data.forEach((item, index) => {
      item.value = res[index]
    })
    this.amountOption.series[0].data.sort((a, b) => a.value - b.value)
    // this.amountOption.series[0].data = res.map((item, index) => (
    //   { value: item, name: this.amount[index] }
    // )).sort((a, b) => a.value - b.value)
  },
  mounted() {
    this.drawChar()
  },
  methods: {
    async getList(url) {
      const res = await request.get(url)
      const { total } = res
      return total
    },
    drawChar() {
      this.amountOption = {
        backgroundColor: '#2c343c',

        title: {
          text: '数据统计',
          left: 'center',
          top: 20,
          textStyle: {
            color: '#ccc'
          }
        },

        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },

        visualMap: {
          show: false,
          min: 0,
          max: 0,
          inRange: {
            colorLightness: [0, 1]
          }
        },
        series: [
          {
            name: '数据量/比例',
            type: 'pie',
            radius: '65%',
            center: ['50%', '50%'],
            data: [
              { value: 0, name: '经验百科' },
              { value: 0, name: '学习攻略' },
              { value: 0, name: '吐槽' },
              { value: 0, name: '学生' },
              { value: 0, name: '教师' }
            ],
            roseType: 'radius',
            label: {
              color: 'rgba(255, 255, 255, 0.3)'
            },
            labelLine: {
              lineStyle: {
                color: 'rgba(255, 255, 255, 0.3)'
              },
              smooth: 0.2,
              length: 10,
              length2: 20
            },
            itemStyle: {
              color: '#c23531',
              shadowBlur: 200,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            },

            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function(idx) {
              return Math.random() * 200
            }
          }
        ]
      }
    },
    init() {
      const amountChart = this.$echarts.init(this.$refs.amountData)
      amountChart.setOption(this.amountOption)
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
    #main {
      width: 550px;
      height: 400px;
    }
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
