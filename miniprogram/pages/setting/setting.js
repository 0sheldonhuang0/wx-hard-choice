//index.js
const app = getApp()

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    queryResult: [],
  },

  onLoad: function() {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
  },

  onGetUserInfo: function(e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

  onGetOpenid: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        wx.setStorageSync('openid', res.result.openid)
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })

this.onQuery();

  },

  onAdd: function() {
    const db = wx.cloud.database()
    db.collection('user_cards').add({
      data: {
        newer: app.globalData.newer,
        version: app.globalData.version,
        q_and_a: app.globalData.q_and_a,
      },
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        wx.showToast({
          title: '同步记录成功',
        })
        console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '新增记录失败'
        })
        console.error('[数据库] [新增记录] 失败：', err)
      }
    })
  },

  onQuery: function() {
    var that = this
    const db = wx.cloud.database()
    // 查询当前用户所有的 counters
    db.collection('user_cards').where({
      _openid: app.globalData.openid
    }).get({
      success: function(res) {
        console.log(res.data)
        if (res.data.length === 0) {
          that.onAdd()
        }else{
          wx.setStorageSync('newer', res.data[0].newer) ;
          wx.setStorageSync('version', res.data[0].version);
          wx.setStorageSync('q_and_a', res.data[0].q_and_a);
          app.globalData.newer = res.data[0].newer;
          app.globalData.version = res.data[0].version;
          app.globalData.q_and_a = res.data[0].q_and_a;
        }
      }
    })
  },

  conj_helper: function () {
    wx.navigateToMiniProgram({
      appId: 'wx168d50e200bd0513',
      path: 'pages/welcome/welcome',
      extraData: {
        foo: 'bar'
      },
      envVersion: 'release',
      success(res) {
        // 打开成功
      }
    })
  },

  copy: function () {
    var self = this;
    wx.setClipboardData({
      data: "https://uniquelab.cn/hard-choice",
      success: function (res) {
        wx.showModal({
          title: '提示',
          content: '✨复制成功✨请粘贴到浏览器访问',
          success: function (res) {
            if (res.confirm) {
              console.log('确定')
            } else if (res.cancel) {
              console.log('取消')
            }
          }
        })
      }
    })
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