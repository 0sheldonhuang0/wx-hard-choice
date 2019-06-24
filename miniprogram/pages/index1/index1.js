const app = getApp()

Page({


  data: {
    answer: [],
    final_decision: "点击按钮👇帮你选择",
    light_or_not: "light",
  },

  onLoad: function(options) {
    app.globalData.newer = wx.getStorageSync('newer')
    app.globalData.version = wx.getStorageSync('version')

    if (app.globalData.newer == '' && app.globalData.version == '') { //如果没有任何数据，那就代表是新用户
      wx.setStorageSync('newer', true)
      wx.setStorageSync('version', "v1.0.2") //写入新版本的版本号
      wx.setStorageSync("hidden_or_not", false)
      wx.setStorageSync('q_and_a', [{
          "que": "这个小程序能干什么？",
          "ans": "作为患有选择困难症的你,它能帮你做决定,今天吃什么？,掷骰子,今天晚上干什么？,看什么电影比较好呢？,决定是艰难的,点击下面的按钮,它会从这些选项中随机选出一个,作为一个答案,给你做参考,你可以在“选择卡片”页面,选择卡片,修改问题和答案,新建问题和答案,这只是一个示例问题,不喜欢的话可以删掉,感谢您的使用,喜欢的话可以点击右上角三个点,分享给你的小伙伴"
        },
        {
          "que": "今天谁买单？",
          "ans": "男朋友,女朋友,男朋友,男朋友,男朋友,男朋友,男朋友,男朋友,男朋友,男朋友,男朋友,男朋友,男朋友,男朋友,男朋友,男朋友,男朋友,男朋友,男朋友,男朋友,男朋友,男朋友,男朋友,男朋友,男朋友,男朋友,男朋友,男朋友,相同选项越多,出现概率越高"
        },
        {
          "que": "今天吃什么？",
          "ans": "王汉堡,劳麦当,基肯德,白饭,光面,泡饭,粥,螺狮粉"
        },
        {
          "que": "掷骰子",
          "ans": "1,2,3,4,5,6,7,8,9,10,11,12"
        },
      ]) //写下用户的第一个数据
      wx.setStorageSync('choose_show', "0") //默认为第一条
    }

    if (app.globalData.version != "v1.0.2") { //如果只是新版本的数据没有
      wx.setStorageSync('version', "v1.0.2") //写入新版本的版本号
    }

    app.globalData.q_and_a = wx.getStorageSync('q_and_a')
    app.globalData.choose_show = wx.getStorageSync('choose_show')
    app.globalData.openid = wx.getStorageSync('openid')

    var q_and_a = app.globalData.q_and_a;
    var choose_show = app.globalData.choose_show;
    var question = q_and_a[choose_show].que;
    var answer = q_and_a[choose_show].ans;
    var answer = answer.split(",") //单个问题的所有答案数组

    var light_or_not = [];
    for (var i = 0; i < answer.length; i++) {
      light_or_not.push("light")
    }

    this.setData({
      question: question,
      answer: answer,
      light_or_not: light_or_not,
    })
  },

  help_me_choose: function() {
    console.log(this.data.answer)
    var answer = this.data.answer;
    var answer_length = answer.length;
    Countdown(this)

    var timer;
    var seconds_wait = 20;
    let that = this;
    setTimeout(function() {
      that.setData({
        loading: true
      })
    }, 500)

    function Countdown(that) { //注意this和that
      timer = setTimeout(function() {
        seconds_wait--;

        function GetRandomNum(Min, Max) {
          var Range = Max - Min;
          var Rand = Math.random();
          return (Min + Math.round(Rand * Range));
        }

        var num = GetRandomNum(0, answer_length - 1);
        console.log(answer_length)

        //以下仅用来设置button颜色
        var light_or_not = [];
        for (var i = 0; i < answer.length; i++) {
          light_or_not.push("light")
        }

        light_or_not.splice(num, 1, " ");
        console.log(light_or_not)

        var final_decision = answer[num];
        console.log(answer[num])

        that.setData({
          final_decision: final_decision,
          light_or_not: light_or_not,
        })

        if (seconds_wait <= 0) {
          that.setData({
            final_decision: final_decision,
            light_or_not: light_or_not,
          })
        } else {
          Countdown(that);
        }
      }, 100);
    };


  },


  change_cards: function() {
    wx.switchTab({
      url: '../cards/cards',
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


  onShareAppMessage: function(res) {
    return {
      title: '有它!再也不用自己作决定了！😱',
      path: 'pages/index1/index1',
      imageUrl: '',
      success: function(shareTickets) {
        console.info(shareTickets + '成功');
        // 转发成功
      },
      fail: function(res) {
        console.log(res + '失败');
        // 转发失败
      },
      complete: function(res) {
        // 不管成功失败都会执行
      }
    }
  }
})