<template>
  <span class="carlos__countdown">{{content}}</span>
</template>
<script>
  export default {
    name: 'carlos-countdown',
    data () {
      return {
        couldStart: true,
        content: ''
      }
    },
    props: {
      leftcount: {
        type: Number,
        default: 60
      },
      inittext: {
        type: String,
        default: '默认'
      },
      endtext: {
        type: String,
        default: '重新开始'
      },
      format: {
        type: String,
        default: '20秒'
      }
    },
    created () {
      var format = this.format
      var reg = /([\u4E00-\u9FA5\s]*)(\d+)([\u4E00-\u9FA5\s]*)/ // 匹配文字、空格、秒数（数字）
      var matchArr = format.match(reg)
      this.prevText = matchArr[1]
      this.nextText = matchArr[3]
      this.content = this.inittext
    },
    mounted () {
      var self = this
      self.$on('start', () => {
        if (self.couldStart) {
          self.couldStart = false
          self.$emit('startback')
          self.countdown(self.leftcount)
        }
      })
    },
    methods: {
      countdown (leftcount) {
        var self = this
        var t = parseInt(leftcount)
        var timer = setInterval(() => {
          if (t > 1) {
            t --
            self.content = this.prevText + t + this.nextText
          } else {
            clearInterval(timer)
            self.couldStart = true
            self.content = this.endtext || this.prevText + this.leftcount + this.nextText
            self.$emit('endback')
          }
        }, 1000)
      }
    }
  }
</script>