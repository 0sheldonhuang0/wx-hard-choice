const app = getApp();


Page({

  data: {
    ColorList: app.globalData.ColorList,
    q_and_a: [],
    question: [],
    answer: [],
    answer_array: [],
    change_choose_color: [],
    change_choose_icon_color: [],
    change_delete_color: [],
    change_delete_icon_color: [],
    hidden_or_not:null,
  },


  onLoad: function(options) {
    var hidden_or_not = wx.getStorageSync("hidden_or_not")
    var q_and_a = app.globalData.q_and_a;
    var question = [];
    var answer = [];
    var answer_array = [];

    //以下仅用来设置button颜色
    var change_choose_color = [];
    var change_choose_icon_color = [];
    var change_delete_color = [];
    var change_delete_icon_color = [];
    
    for (var i = 0; i < q_and_a.length; i++) {
      var question_2 = q_and_a[i].que
      var answer_2 = q_and_a[i].ans

      var question = question.concat(question_2) //组成问题数组
      var answer = answer.concat(answer_2) //组成答案数组

      //以下仅用来设置button颜色
      change_choose_color.push("lines-blue")
      change_choose_icon_color.push("text-blue")
      change_delete_color.push("lines-red")
      change_delete_icon_color.push("text-red")
    }

    var choose_show = wx.getStorageSync('choose_show');
    change_choose_color.splice(choose_show, 1, "bg-blue");
    change_choose_icon_color.splice(choose_show, 1, "text-white");

    for (var i = 0; i < answer.length; i++) {
      var answer_string = answer[i]
      var answer_string = answer_string.split(",") //单个问题的所有答案数组
      answer_array[i] = answer_string //answer_array是一个二维数组
    }

    console.log(answer_array)
    console.log(question)

    this.setData({
      question: question,
      answer: answer,
      q_and_a: q_and_a,
      answer_array: answer_array,

//以下仅用来设置button颜色
      change_choose_color: change_choose_color,
      change_choose_icon_color: change_choose_icon_color,
      change_delete_color: change_delete_color,
      change_delete_icon_color: change_delete_icon_color,


      hidden_or_not: hidden_or_not,
    })

  },

  new_card: function (e) {
    var q_and_a = app.globalData.q_and_a;
    var card_number = q_and_a.length;
    app.globalData.card_number = card_number;

    wx.navigateTo({
      url: '../revision/revision',
    })
  },

  revision_card: function(e) {
    var q_and_a = app.globalData.q_and_a;
    app.globalData.card_number = e.currentTarget.id
    console.log("revision_card")
    console.log(e.currentTarget.id)
    console.log(q_and_a[e.currentTarget.id].ans)

    wx.navigateTo({
      url: '../revision/revision',
    })
  },

  delete_card: function(e) {
    var q_and_a = app.globalData.q_and_a;
    q_and_a.splice(e.currentTarget.id, 1);
    console.log(q_and_a);
    app.globalData.q_and_a = q_and_a;
    wx.setStorageSync("q_and_a", q_and_a);

    this.onUpdate();

    wx.showToast({
      title: '已删除',
      image: '',
      icon: 'sucess',
      duration: 1000,
      mask: true,
    })

    if (getCurrentPages().length != 0) {
      //刷新当前页面的数据
      getCurrentPages()[getCurrentPages().length - 1].onLoad()
    }


  },

  choose_it: function(e) {
    console.log(e.currentTarget.id)
    var choose_show = e.currentTarget.id;
    app.globalData.choose_show = choose_show;
    wx.setStorageSync('choose_show', choose_show);
    var q_and_a = app.globalData.q_and_a;
    var change_choose_color = [];
    var change_choose_icon_color = [];

    //以下仅用来设置button颜色
    for (var i = 0; i < q_and_a.length; i++) {
      change_choose_color.push("lines-blue")
      change_choose_icon_color.push("text-blue")
    }
    change_choose_color.splice(choose_show, 1, "bg-blue");
    change_choose_icon_color.splice(choose_show, 1, "text-white");
    console.log(choose_show)
    console.log(change_choose_color)
    console.log(change_choose_icon_color)
    console.log(typeof(change_choose_color[0]))
    this.setData({
      change_choose_color: change_choose_color,
      change_choose_icon_color: change_choose_icon_color,
    })
  },

  does_not_work: function () {
    wx.showToast({
      title: '',
      title: '☝点右上角3个图标',
      icon: 'none',
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

  onUpdate: function () {
    const db = wx.cloud.database()
    db.collection('user_cards').doc().update({
      data: {
        newer: app.globalData.newer,
        version: app.globalData.version,
        q_and_a: app.globalData.q_and_a,
      },
      success: res => {
        console.log('[数据库] [更新记录] 成功，记录 _id: ', res._id)
      },
      fail: err => {
        icon: 'none',
          console.error('[数据库] [更新记录] 失败：', err)
      }
    })
  },

  close_it: function () {
    wx.setStorageSync("hidden_or_not", true)

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

  onShareAppMessage: function (res) {
    return {
      title: '有它!再也不用自己作决定了！😱',
      path: 'pages/index1/index1',
      imageUrl: '',
      success: function (shareTickets) {
        console.info(shareTickets + '成功');
        // 转发成功
      },
      fail: function (res) {
        console.log(res + '失败');
        // 转发失败
      },
      complete: function (res) {
        // 不管成功失败都会执行
      }
    }
  }


})