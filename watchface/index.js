let sky = null
let clock = null
let weatherIcon = null
let seasonIcon = null
let moonIcon = null

const numArray = [
  'num/0.png',
  'num/1.png',
  'num/2.png',
  'num/3.png',
  'num/4.png',
  'num/5.png',
  'num/6.png',
  'num/7.png',
  'num/8.png',
  'num/9.png'
]

const monthArray = [
  'month/Jan.png',
  'month/Feb.png',
  'month/Mar.png',
  'month/Apr.png',
  'month/May.png',
  'month/Jun.png',
  'month/Jul.png',
  'month/Aug.png',
  'month/Sep.png',
  'month/Oct.png',
  'month/Nov.png',
  'month/Dec.png'
]

const weekArray = [
  'week/Mon.png',
  'week/Tue.png',
  'week/Wen.png',
  'week/Thu.png',
  'week/Fri.png',
  'week/Sat.png',
  'week/Sun.png',
]

const weatherArray = [
  'weather/0.png',
  'weather/1.png',
  'weather/2.png',
  'weather/3.png',
  'weather/4.png',
  'weather/5.png',
  'weather/6.png',
  'weather/7.png',
  'weather/8.png',
  'weather/9.png',
  'weather/10.png',
  'weather/11.png',
  'weather/12.png',
  'weather/13.png',
  'weather/14.png',
  'weather/15.png',
  'weather/16.png',
  'weather/17.png',
  'weather/18.png',
  'weather/19.png',
  'weather/20.png',
  'weather/21.png',
  'weather/22.png',
  'weather/23.png',
  'weather/24.png',
  'weather/25.png',
  'weather/26.png',
  'weather/27.png',
  'weather/28.png',
]

const moonArray = [
  'moon/1.png',
  'moon/2.png',
  'moon/3.png',
  'moon/4.png',
  'moon/5.png',
  'moon/6.png',
  'moon/7.png',
  'moon/8.png',
  'moon/9.png',
  'moon/10.png',
  'moon/11.png',
  'moon/12.png',
  'moon/13.png',
  'moon/14.png',
  'moon/15.png',
  'moon/16.png',
  'moon/17.png',
  'moon/18.png',
  'moon/19.png',
  'moon/20.png',
  'moon/21.png',
  'moon/22.png',
  'moon/23.png',
  'moon/24.png',
  'moon/25.png',
  'moon/26.png',
  'moon/27.png',
  'moon/28.png',
  'moon/29.png',
]

WatchFace({
  onInit() {
  },

  build() {

    sky = hmUI.createWidget(hmUI.widget.IMG, {
      x: 0,
      y: 0
    })

    clock = hmUI.createWidget(hmUI.widget.IMG)
    clock.setProperty(hmUI.prop.MORE, {
      x: 0,
      y: 0,
      src: 'bg/clock.png'
    })

    weatherIcon = hmUI.createWidget(hmUI.widget.IMG_LEVEL, {
      x: 33,
      y: 144,
      image_array: weatherArray,
      image_length: weatherArray.length,
      type: hmUI.data_type.WEATHER
    })

    seasonIcon = hmUI.createWidget(hmUI.widget.IMG, {
      x: 115,
      y: 144
    })

    let timeText = hmUI.createWidget(hmUI.widget.IMG_TIME, {
      hour_zero: 1,
      hour_startX: 30,
      hour_startY: 188,
      hour_array: numArray,
      hour_space: 3,

      minute_zero: 1,
      minute_startX: 0,
      minute_startY: 0,
      minute_array: numArray,
      minute_space: 3,
      hour_unit_sc: 'num/colon.png',
      hour_unit_en: 'num/colon.png',
      hour_unit_tc: 'num/colon.png',
      hour_align: hmUI.align.LEFT,
      minute_follow: 1,
    })

    let dateText = hmUI.createWidget(hmUI.widget.IMG_DATE, {
      month_startX: 30,
      month_startY: 110,
      month_unit_sc: 'num/dot.png',
      month_unit_tc: 'num/dot.png',
      month_unit_en: 'num/dot.png',
      month_align: hmUI.align.LEFT,
      month_space: 1,
      month_zero: 1,
      month_en_array: monthArray,
      month_sc_array: monthArray,
      month_tc_array: monthArray,
      month_is_character: true,

      day_startX: 0,
      day_startY: 0,
      day_align: hmUI.align.LEFT,
      day_space: 1,
      day_zero: 1,
      day_follow: 1,
      day_en_array: numArray,
      day_sc_array: numArray,
      day_tc_array: numArray,

    })

    let weekText = hmUI.createWidget(hmUI.widget.IMG_WEEK, {
      x: 115,
      y: 110,
      week_en: weekArray,
      week_tc: weekArray,
      week_sc: weekArray
    })

    let stepText = hmUI.createWidget(hmUI.widget.TEXT_IMG, {
      x: 46,
      y: 256,
      w: 100,
      h: 28,
      type: hmUI.data_type.STEP,
      font_array: numArray,
      h_space: 8,
      align_h: hmUI.align.RIGHT
    })



    function screenUpdate() {

      const time = hmSensor.createSensor(hmSensor.id.TIME)
      const weather = hmSensor.createSensor(hmSensor.id.WEATHER)
      const weatherData = weather.getForecastWeather()

      const tideData = weatherData.tideData.data[0]
      const timeNow = time.hour * 100 + time.minute
      const timeSunrise = tideData.sunrise.hour * 100 + tideData.sunrise.minute
      const timeSunset = tideData.sunset.hour * 100 + tideData.sunset.minute

      if (timeNow < timeSunrise || timeNow >= timeSunset) {
        sky.setProperty(hmUI.prop.MORE, {
          src: 'bg/nightsky.png'
        })
      }
      else {
        sky.setProperty(hmUI.prop.MORE, {
          src: 'bg/sky.png'
        })
      }

      if (time.month == 12 || time.month == 1 || time.month == 2) {
        seasonIcon.setProperty(hmUI.prop.MORE, {
          src: 'season/Winter.png'
        })
      }

      if (time.month == 3 || time.month == 4 || time.month == 5) {
        seasonIcon.setProperty(hmUI.prop.MORE, {
          src: 'season/Spring.png'
        })
      }

      if (time.month == 6 || time.month == 7 || time.month == 8) {
        seasonIcon.setProperty(hmUI.prop.MORE, {
          src: 'season/Summer.png'
        })
      }

      if (time.month == 9 || time.month == 10 || time.month == 11) {
        seasonIcon.setProperty(hmUI.prop.MORE, {
          src: 'season/Fall.png'
        })
      }
    }

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: (function () {
        screenUpdate()
      }),
      pause_call: (function () { })
    })
  },

  onDestroy() {
  },
})
