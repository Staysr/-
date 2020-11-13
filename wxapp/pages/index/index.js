const app = getApp();
Page({
  data: {
    rain_bg: 'http://download.tpengyun.cn/res/WeatherTop/rain_background.jpg',//下雨背景
    snow_bg: 'http://download.tpengyun.cn/res/WeatherTop/snow_background.jpg',//下雪背景
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    ColorList: app.globalData.ColorList,
    weather:1,//1为下雨 2为下雪
  },
  onLoad: function() {
    var that = this;
    wx.getLocation({//获取位置经纬度
      type: 'gcj02',
      success: function(res) {
        var data = {
          location: res.longitude + ',' + res.latitude,
          output: 'json',
          ak: '0tVbM377XzaEnP4VM4ip4130ZYuRLw1A'
        }
        // 获取天气信息
        wx.request({
          url: 'https://api.map.baidu.com/telematics/v3/weather?',
          data: data,
          method: 'GET',
          success: function(res) {
            console.log('数据',res.data.results[0])
            data = res.data.results[0]
            var weather_data = data.weather_data[0]
            that.setData({
              City: data.currentCity, //城市
              pm25: data.pm25, //PM2.5
              Desc: weather_data.weather, //天气
              wind: weather_data.wind, //分级
              temperature: weather_data.temperature, //温度
              date: weather_data.date, //日期
              tips: data.index[0].des,//穿衣提醒
            });
          },
        })
      },
      cancel: function (res) {
        console.log('wgs84cacel', res);
      },
      fail: function (res) {
        //返回fail:invalid data
        console.log('wgs84fail', res);
      }
    })

   },
   /**
    * 切换天气
    */
  toDo(e){
    console.log(e)
    this.setData({
      weather: e.currentTarget.dataset.weather
    })
  }

})