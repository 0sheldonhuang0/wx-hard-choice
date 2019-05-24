const app = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    question: "写下你的问题",
    answer:"",
    fill_or_not: true,
    answer_fill_or_not: true,
    light_or_not: "light"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(app.globalData.question)
    console.log(app.globalData.answer)
    var question = app.globalData.question
    var answer = app.globalData.answer
    var light_or_not = [];

    if (question != null) {
      var fill_or_not = false;
    } else {
      var fill_or_not = true;
    }

    //以下仅用来设置button颜色
    for (var i = 0; i < answer.length; i++) {
      light_or_not.push("light")
    }

    this.setData({
      light_or_not: light_or_not,
      question: question,
      answer: answer,
      fill_or_not: fill_or_not,
    })

  },

  question: function(e) {
    console.log(e);

    if (e.detail.value != null && this.fill_or_not != "写下你的问题") {
      var fill_or_not = false;
    } else {
      var fill_or_not = true;
    }



    this.setData({
      fill_or_not: fill_or_not,
    })

    if (getCurrentPages().length != 0) {
      //刷新当前页面的数据
      getCurrentPages()[getCurrentPages().length - 1].onLoad()
    }
  },


  answer: function (e) {
    console.log(e);

    if (e.detail.value != null) {
      var answer_fill_or_not = false;
    } else {
      var answer_fill_or_not = true;
    }


    this.setData({
      answer_fill_or_not: answer_fill_or_not,
    })

    if (getCurrentPages().length != 0) {
      //刷新当前页面的数据
      getCurrentPages()[getCurrentPages().length - 1].onLoad()
    }


  },

  choose_tag: function (e) {

    console.log(e.currentTarget.id)
    var choose_show = e.currentTarget.id;
    var answer = app.globalData.answer;
    var light_or_not = this.data.light_or_not
    //以下仅用来设置button颜色
    light_or_not.splice(choose_show, 1, " ");

    console.log(light_or_not)
    this.setData({
      light_or_not: light_or_not,
    })

  },

  delete_tags: function (e) {
    var answer = app.globalData.answer;
    var light_or_not = this.data.light_or_not

    console.log(light_or_not);

    for (var i = 0; i < light_or_not.length; i++) {
      if (light_or_not[i]==" "){
        light_or_not.splice(i, 1, "ok");   //顶替个位置
        answer.splice(i, 1, "ok");  //顶替个位置
      }
    }
    
    var answer_new = []; 
    for (var i = 0; i < answer.length; i++) {
      if (answer_new.indexOf(answer[i]) == -1){
        answer_new.push(answer[i])
      }
    }

    answer_new.splice(answer_new.indexOf("ok"),1)
    
    console.log(answer_new)

    var q_and_a = app.globalData.q_and_a;

    this.setData({
      light_or_not: light_or_not,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})