const app = getApp();


Page({

  data: {
    ColorList: app.globalData.ColorList,
    q_and_a: [],
    question: [],
    answer: [],
    answer_array:[],
  },


  onLoad: function(options) {
    var q_and_a = app.globalData.q_and_a;
    var question = [];
    var answer = [];
    var answer_array = [];
    for (var i = 0; i < q_and_a.length; i++) {
      var question_2 = q_and_a[i].que
      var answer_2 = q_and_a[i].ans

      var question = question.concat(question_2) //组成问题数组
      var answer = answer.concat(answer_2) //组成答案数组
    }

    for (var i = 0; i < answer.length; i++) {
      var answer_string = answer[i]
      var answer_string = answer_string.split(",")    //单个问题的所有答案数组
      answer_array[i] = answer_string     //answer_array是一个二维数组
    }

    console.log(answer_array)

    this.setData({
      question: question,
      answer: answer,
      q_and_a: q_and_a,
      answer_array: answer_array,
    })

  },

  revision_card: function(e) {

    wx.navigateTo({
      url: '../revision/revision',
    })
  },
  
  delete_card: function(e){
    var q_and_a = app.globalData.q_and_a;
    q_and_a.splice(e.currentTarget.id,1);
    console.log(q_and_a);
    app.globalData.q_and_a = q_and_a;

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

  choose_it: function (e) {
    var choose_show = e.currentTarget.id;
    app.globalData.choose_show = choose_show;
    wx.setStorageSync('choose_show', choose_show)
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