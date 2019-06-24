const app = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    question: "写下你的问题",
    answer: "",
    input_que: "",
    input_ans: "",
    fill_or_not: true,
    answer_fill_or_not: true,
    light_or_not: "light",
    choose_show: null,
    queryResult: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    var q_and_a = app.globalData.q_and_a;
    console.log(q_and_a)
    var card_number = app.globalData.card_number;


    if (card_number < q_and_a.length) {
      var question = q_and_a[card_number].que;
      var answer = q_and_a[card_number].ans;
      var answer = answer.split(",") //单个问题的所有答案数组

    } else {
      var question = " ";
      var answer = [];
    }

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
      input_que: e.detail.value,
    })

    if (getCurrentPages().length != 0) {
      //刷新当前页面的数据
      getCurrentPages()[getCurrentPages().length - 1].onLoad()
    }
  },


  answer: function(e) {
    console.log(e);

    if (e.detail.value != null) {
      var answer_fill_or_not = false;
    } else {
      var answer_fill_or_not = true;
    }

    this.setData({
      answer_fill_or_not: answer_fill_or_not,
      input_ans: e.detail.value,
    })

    if (getCurrentPages().length != 0) {
      //刷新当前页面的数据
      getCurrentPages()[getCurrentPages().length - 1].onLoad()
    }


  },

  choose_tag: function(e) {

    console.log(e.currentTarget.id)
    var choose_show = e.currentTarget.id;
    var answer = this.data.answer;
    var light_or_not = this.data.light_or_not
    if (light_or_not[choose_show] == ' ') {
      //以下仅用来设置button颜色
      light_or_not.splice(choose_show, 1, "light");
    } else {
      //以下仅用来设置button颜色
      light_or_not.splice(choose_show, 1, " ");
    }

    console.log(light_or_not)

    this.setData({
      light_or_not: light_or_not,
      choose_show: choose_show,
    })

  },

  add_tags: function() {

    var card_number = app.globalData.card_number;
    console.log(card_number)
    var answer = this.data.answer;
    console.log(this.data.input_ans)

    if (this.data.input_ans == "") {
      wx.showModal({
        title: '提示',
        content: '请现在输入框输入内容再添加',
      })
    } else {
      answer.push(this.data.input_ans); //顶替个位置
      console.log(answer)
      answer = answer.toString()
      var q_and_a = app.globalData.q_and_a;
      console.log(q_and_a)
      console.log(app.globalData.card_number)
      console.log(q_and_a.length)


      if (card_number < q_and_a.length) {
        q_and_a[app.globalData.card_number].ans = answer
      } else {
        var new_q_and_a = {
          que: this.data.input_que,
          ans: answer
        }
        q_and_a.push(new_q_and_a)
        app.globalData.q_and_a = q_and_a

      }
      wx.setStorageSync("q_and_a", q_and_a)
    }




    if (getCurrentPages().length != 0) {
      //刷新当前页面的数据
      getCurrentPages()[getCurrentPages().length - 1].onLoad()
    }

    this.onUpdate()
  },

  delete_tags: function() {

    var answer = this.data.answer;
    var light_or_not = this.data.light_or_not;

    console.log(light_or_not);

    for (var i = 0; i < light_or_not.length; i++) {
      if (light_or_not[i] == " ") {
        light_or_not.splice(i, 1, "ok"); //顶替个位置
        answer.splice(i, 1, "ok"); //顶替个位置
      }
    }

    if (light_or_not.indexOf("ok") == -1) {
      wx.showModal({
        title: '提示',
        content: '请先点击至少一个选项后再删除',
      })
    }

    //为了删除“ok”
    var answer = answer.filter(function(item) {
      return item != "ok";
    });
    var light_or_not = light_or_not.filter(function(item) {
      return item != "ok";
    });



    if (light_or_not.length < 1) {
      wx.showModal({
        title: '提示',
        content: '现在只剩一个选项了，请先添加一个选项后再删除',
      })
    } else {
      answer = answer.toString()
      var q_and_a = app.globalData.q_and_a;
      console.log(q_and_a)
      console.log(app.globalData.card_number)
      q_and_a[app.globalData.card_number].ans = answer

      wx.setStorageSync("q_and_a", q_and_a)
    }

    if (getCurrentPages().length != 0) {
      //刷新当前页面的数据
      getCurrentPages()[getCurrentPages().length - 1].onLoad()
    }

    this.setData({
      light_or_not: light_or_not,
    })
  },

  onUpdate: function() {
    const db = wx.cloud.database()
    db.collection('user_cards').doc().update({
      data: {
        newer: app.globalData.newer,
        version: app.globalData.version,
        q_and_a: app.globalData.q_and_a,
      },
      success: res => {
        wx.showToast({
          title: '添加记录成功',
        })
        console.log('[数据库] [更新记录] 成功，记录 _id: ', res._id)
      },
      fail: err => {
        icon: 'none',
        console.error('[数据库] [更新记录] 失败：', err)
      }
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