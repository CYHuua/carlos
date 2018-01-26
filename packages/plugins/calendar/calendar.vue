<template>
  <transition name="fade">
    <div id="carlos__calendar" class="carlos__calendar" v-if="show">
      <div class="calendar__mask" v-if="mask" @click="cancelHandle"></div>
      <div class="calendar__wrap">
        <div class="calendar__header border-bottom-1px" v-if="isHead">
          <a href="javascript:void(0);" class="header__cancel" @click="cancelHandle">取消</a>
          <p class="header__text">请选择日期</p>
          <a href="javascript:void(0);" class="header__confirm" @click="confirmHandle">确定</a>
        </div>
        <div class="calendar__select">
          <div class="select_year">
            <div class="year_prev" @click="changeYear('-1')">
              <div class="arrow lt"></div>
            </div>
            <div class="year_text">{{curTime.curYear}}</div>
            <div class="year_next" @click="changeYear('1')">
              <div class="arrow gt"></div>
            </div>
          </div>
          <div class="select_month">
            <div class="year_prev" @click="changeMonth('-1')">
              <div class="arrow lt"></div>
            </div>
            <div class="year_text">{{curTime.curMonth + 1}}</div>
            <div class="year_next" @click="changeMonth('1')">
              <div class="arrow gt"></div>
            </div>
          </div>
        </div>
        <table>
          <tr>
            <td class="week">日</td>
            <td class="week">一</td>
            <td class="week">二</td>
            <td class="week">三</td>
            <td class="week">四</td>
            <td class="week">五</td>
            <td class="week">六</td>
          </tr>
          <tr v-for="dates in displayDates">
            <td v-for="date in dates" class="date" :class="{'disabled':date.disabled, 'isToday': date.today, 'selected': date.selected}" :data-date="date.date" :data-current="date.current"  @click="select">
              <span>{{date.num}}</span>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'carlos-calendar',
  data () {
    return {
      isHead: true,
      show: true,
      mask: true,
      today: '',
      current: '',
      tempDate: '',
      curTime: {},
      displayDates: []
    }
  },
  beforeMount () {
    let node = document.querySelector('#carlos__calendar')
    if (node && node.parentNode) {
      node.parentNode.removeChild(node)
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      var self = this
      self.setToday()
      self.$nextTick(() => {
        if (!self.current) {
          self.current = self.today
        }
        var current = self.current
        var timeArray = current.split('-')
        self.curTime = {
          curYear: timeArray[0],
          curMonth: timeArray[1] - 1,
          curDate: timeArray[2],
          curDateFormat: current
        }
        self.setDates(current)
      })
    },
    setToday () {
      var curTime = new Date()
      var curYear = curTime.getFullYear()
      var curMonth = curTime.getMonth()
      var curDate = curTime.getDate()
      var curDateFormat = curYear + '-' + this.zerofill(curMonth + 1) + '-' + this.zerofill(curDate)
      this.today = curDateFormat
    },
    setDates (selectDateFormat) {
      var self = this
      var lineSize = 6  // 限制至少显示的行数
      var weekSize = 7
      var tempDate = self.tempDate || self.current
      var curTime = selectDateFormat.split('-')
      var curYear = curTime[0] - 0
      var curMonth = curTime[1] - 1

      var datesOfPrevMonth = [] // 上个月的日期数组
      var datesOfCurMonth = [] // 当前月的日期数组
      var datesOfNextMonth = [] // 下个月的日期数组

      var firstDayOfCurMonth = new Date(curYear, curMonth, 1).getDay() // 当前月第一天的周几
      var lastDay = new Date(curYear, curMonth + 1, 0) // 当前月的最后一天
      var lastDayOfCurMonth = lastDay.getDay() // 当前月最后一天的周几
      var curNum = lastDay.getDate() // 当前月的天数

      var prevNum = firstDayOfCurMonth === weekSize ? 0 : firstDayOfCurMonth // 上个月的填补天数
      var nextNum = lastDayOfCurMonth === weekSize ? 6 : (weekSize - 1 - lastDayOfCurMonth) // 下个月的填补天数
      
      if (curNum + prevNum <= (lineSize - 1) * weekSize) {
        var add = lineSize - 5
        if (prevNum === 0 && curNum == 28) {
          add = lineSize - 4
        }
        nextNum += add * weekSize
      }

      for (let i = 1; i <= curNum; i ++) {
        var date = {}
        var dateNum = i
        var dateFormat = self.dateFormat(curYear, curMonth, dateNum)
        date.num = dateNum
        date.date = dateFormat
        date.current = tempDate
        if (dateFormat === tempDate) {
          date.selected = true
        }
        if (dateFormat === self.today) {
          date.today = true
        }
        datesOfCurMonth.push(date)
      }

      if (prevNum) { // 计算上个月的日期数组
        var lastDayOfPrevMonth
        if (curMonth === 0) {
          lastDayOfPrevMonth = new Date(curYear, curMonth, 0)
        } else {
          lastDayOfPrevMonth = new Date(curYear, curMonth - 1, 0)
        }
        var prevYear = lastDayOfPrevMonth.getFullYear()
        var prevMonth = lastDayOfPrevMonth.getMonth() + 1
        var lastDateOfPrevMonth = lastDayOfPrevMonth.getDate() // 上个月的最后一天日期


        for (let i = prevNum; i > 0; i --) {
          var date = {}
          var dateNum = lastDateOfPrevMonth - i + 1
          var dateFormat = self.dateFormat(prevYear, prevMonth, dateNum)
          date.num = dateNum
          date.date = dateFormat
          date.current = selectDateFormat
          date.disabled = true
          datesOfPrevMonth.push(date)
        }
      }

      if (nextNum) { // 计算下个月的日期数组
        var firstDayOfNextMonth = new Date(curYear, curMonth + 1, 1)
        var nextYear = firstDayOfNextMonth.getFullYear()
        var nextMonth = firstDayOfNextMonth.getMonth() + 1

        for (let i = 0; i < nextNum; i ++) {
          var date = {}
          var dateNum = i + 1
          var dateFormat = self.dateFormat(nextYear, nextMonth, dateNum)
          date.num = dateNum
          date.date = dateFormat
          date.current = selectDateFormat
          date.disabled = true
          datesOfNextMonth.push(date)
        }
      }

      var curDates = Array.prototype.concat.call(datesOfPrevMonth, datesOfCurMonth, datesOfNextMonth)
      this.displayDates = this.sliceArray(curDates, weekSize)
    },
    /*
     * 年月日格式化
     * return yyyy-mm-dd
     */
    dateFormat (year, month, date) {
      return year + '-' + this.zerofill(month - 0 + 1) + '-' + this.zerofill(date)
    },
    /*
     * 月份或日期数字小于10自动补零
     * num[月份或日期]
     */
    zerofill (num) { // 月份，日期数字小于10，自动补零
      return num < 10 ? '0' + num : '' + num
    },
    /*
      * 将一个数组分成几个同等长度的数组
      * array[分割的原数组]
      * size[每个子数组的长度]
    */
    sliceArray (array, size) {
      var result = []
      var len = Math.ceil(array.length / size)
      for (let i = 0; i < len; i ++) {
        var start = i * size
        var end = start + size
        result.push(array.slice(start, end))
      }
      return result
    },
    select (event) {
      var self = this
      var target = event.currentTarget
      if (!/disabled/.test(target.className)) {
        var dataset = target.dataset
        self.tempDate = dataset.date
        if (self.isHead) {
          self.setDates(dataset.date) 
        } else {
          self.confirmHandle()
        }
      }
    },
    changeYear (speed) {
      var self = this
      var curTime = self.curTime
      curTime.curYear = parseInt(curTime.curYear) + parseInt(speed)
      curTime.curDateFormat = self.dateFormat(curTime.curYear, curTime.curMonth, curTime.curDate)
      self.curTime = curTime
      self.setDates(curTime.curDateFormat)
    },
    changeMonth (speed) {
      var self = this
      var curTime = self.curTime
      curTime.curMonth = parseInt(curTime.curMonth) + parseInt(speed)
      if (curTime.curMonth < 0) {
        curTime.curYear --
        curTime.curMonth = 11
      } else if (curTime.curMonth > 11) {
        curTime.curYear ++
        curTime.curMonth = 0
      }
      curTime.curDateFormat = self.dateFormat(curTime.curYear, curTime.curMonth, curTime.curDate)
      self.curTime = curTime
      self.setDates(curTime.curDateFormat)
    },
    cancelHandle () {
      this.show = false
    },
    confirmHandle () {
      this.current = this.tempDate || this.current
      this.show = false
    }
  }
}
</script>

<style type="text/css">
  .carlos__calendar{}
  .calendar__mask{position:fixed;left:0;top:0;z-index:999;width:100%;height:100%;background:rgba(0,0,0,.7);}
  .calendar__wrap{position:absolute;bottom:0;left:0;z-index:1000;width:100%;background:#fff;}
  .calendar__wrap .calendar__header{display:flex;align-items:center;justify-content:center;font-size:15px;}
  .calendar__wrap .calendar__header .header__text{flex:1;text-align:center;font-size:16px;}
  .calendar__wrap .calendar__header .header__cancel{padding:16px;}
  .calendar__wrap .calendar__header .header__confirm{padding:16px;color:#ff9900;}
  .calendar__wrap .calendar__select{display:flex;}
  .calendar__wrap .calendar__select > div{flex:1;display:flex;align-items:center;justify-content:center;padding:8px 0;}
  .calendar__wrap .calendar__select .year_prev,
  .calendar__wrap .calendar__select .year_next{width:28px;height:28px;display:flex;align-items:center;justify-content:center;}
  .calendar__wrap .calendar__select .year_text,
  .calendar__wrap .calendar__select .month_text{width:50%;text-align:center;font-size:16px;}
  .calendar__wrap table{width:100%;}
  .calendar__wrap table tr td{padding:4px 0;text-align:center;font-size:14px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
  .calendar__wrap table tr td.week{font-weight:700;}
  .calendar__wrap table tr td.date span{display:inline-block;width:28px;height:28px;line-height:28px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;vertical-align:middle;}
  .calendar__wrap table tr td.date.disabled span{color:#aaa;}
  .calendar__wrap table tr td.date.isToday span{color:#ff9900;}
  .calendar__wrap table tr td.date.selected span{color:#fff;background:#f5c608;border-radius:50%;}

  .carlos__calendar.fade-enter-active,
  .carlos__calendar.fade-leave-active{-webkit-transition:all .2s ease;}
  .carlos__calendar.fade-enter,
  .carlos__calendar.fade-leave-active{opacity:0;}
</style>
