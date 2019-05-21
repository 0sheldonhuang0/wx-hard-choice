const app = getApp()

Page({


  data: {
    answer: [],
    final_decision: "帮你选择",
  },

  onLoad: function(options) {
    app.globalData.newer = wx.getStorageSync('newer')
    app.globalData.version = wx.getStorageSync('version')

    if (app.globalData.newer == '' && app.globalData.version == '') { //如果没有任何数据，那就代表是新用户
      wx.setStorageSync('newer', true)
      wx.setStorageSync('version', "v1.0.0") //写入新版本的版本号
      wx.setStorageSync('q_and_a', [{
          "que": "今天谁买单？",
          "ans": "男朋友,女朋友,男朋友,男朋友,男朋友,男朋友,男朋友,男朋友,男朋友,男朋友,男朋友,男朋友,男朋友,男朋友,男朋友,男朋友,男朋友,男朋友,男朋友,男朋友,男朋友,男朋友,男朋友,男朋友,男朋友,男朋友,男朋友,男朋友"
        },
        {
          "que": "今天吃什么？",
          "ans": "汉堡王,麦当劳,肯德基,白饭,光面,泡饭,粥"
        },
        {
          "que": "2020年年会中奖名单？",
          "ans": "王汉堡,劳麦当,基肯德"
        },
      ]) //写下用户的第一个数据
      wx.setStorageSync('choose_show', "0") //默认为第一条
    }

    if (app.globalData.version != "v1.0.0") { //如果只是新版本的数据没有
      wx.setStorageSync('version', "v1.0.0") //写入新版本的版本号
    }

    app.globalData.q_and_a = wx.getStorageSync('q_and_a')
    app.globalData.choose_show = wx.getStorageSync('choose_show')

    var q_and_a = app.globalData.q_and_a;
    var choose_show = app.globalData.choose_show;
    var question = q_and_a[choose_show].que;
    var answer = q_and_a[choose_show].ans;
    var answer = answer.split(",") //单个问题的所有答案数组

    this.setData({
      question: question,
      answer: answer,
    })
  },

  help_me_choose: function() {
    console.log(this.data.answer)
    var answer = this.data.answer;
    var answer_length = answer.length;

    function GetRandomNum(Min, Max) {
      var Range = Max - Min;
      var Rand = Math.random();
      return (Min + Math.round(Rand * Range));
    }

    var num = GetRandomNum(0, answer_length - 1);
    console.log(answer_length)
    var final_decision = answer[num];
    console.log(answer[num])

    this.setData({
      final_decision: final_decision,
    })

  },

  onReady: function() {

  },


  onShow: function() {
    if (getCurrentPages().length != 0) {
      //刷新当前页面的数据
      getCurrentPages()[getCurrentPages().length - 1].onLoad()
    }
  },


  onHide: function() {

  },


  onUnload: function() {

  },


  onPullDownRefresh: function() {

  },


  onReachBottom: function() {

  },


  onShareAppMessage: function() {

  }
})