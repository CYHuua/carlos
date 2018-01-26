<template>
  <span class="carlos__timedown">{{content}}</span>
</template>
<script>
  export default {
    name: 'carlos-timedown',
    data () {
      return {
        content: ''
      }
    },
    props: {
      lefttime: {
        type: String
      },
      endtext: {
        type: String,
        default: '活动已结束'
      }
    },
    created () {
    },
    mounted () {
      this.timedown(this.lefttime) // 毫秒
    },
    methods: {
      timedown (lefttime) {
        var self = this
        var t = lefttime
        var timer = setInterval(function () {
          if (t > 0) {
            var days = Math.floor(t / (1000 * 60 * 60 * 24))
            var hours = Math.floor(t / (1000 * 60 * 60) % 24)
            var minutes = Math.floor(t / (1000 * 60) % 60)
            var seconds = Math.floor(t / 1000 % 60)
            hours = hours < 10 ? '0' + hours : hours
            minutes = minutes < 10 ? '0' + minutes : minutes
            seconds = seconds < 10 ? '0' + seconds : seconds
            var format = ''
            if (days > 0) {
              format = days + '天' + hours + '小时' + minutes + '分' + seconds + '秒'
            }
            if (days <= 0 && hours > 0) {
              format = hours + '小时' + minutes + '分' + seconds + '秒'
            }
            if (days <= 0 && hours <= 0) {
              format = minutes + '分' + seconds + '秒'
            }
            t = t - 1000
            self.content = format
          } else {
            clearInterval(timer)
            self.content = self.endtext
            self.$emit('endback')
          }
        }, 1000)
      }
    }
  }
</script>