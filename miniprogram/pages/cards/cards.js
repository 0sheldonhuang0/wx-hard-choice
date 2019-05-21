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
  },


  onLoad: function(options) {
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
    })

  },

  revision_card: function(e) {
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



  onReady: function() {

  },


  onShow: function() {

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