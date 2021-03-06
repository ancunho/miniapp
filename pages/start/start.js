//login.js
//获取应用实例
var app = getApp();
Page({
    data: {
        remind: '加载中',
        angle: 0,
        year: 2017,
        userInfo: {}
    },
    getopenid : function () {
      wx.login({
        success : function(res) {
          console.log(res);
          wx.request({
            url: 'https://ckbiz.vip/cc/wechat/api/getMiniappOpenID.do'
            , data : { code : res.code}
            , method : 'GET'
            , success : function (result) {
              console.log(result);
            }
          })
        }
      })
    },
    goToIndex: function () {
        wx.switchTab({
            url: '/pages/index/index',
        });
    },
    onLoad: function () {
        this.setData({
            year: new Date().getFullYear()
        });
    },
    onShow: function () {
        console.log('onLoad')
        var that = this
        app.getUserInfo(function (userInfo) {
            that.setData({
                userInfo: userInfo
            })
        })
    },
    onReady: function () {
        var _this = this;
        setTimeout(function () {
            _this.setData({
                remind: ''
            });
        }, 1000);
        wx.onAccelerometerChange(function (res) {
            console.log(res.x);
            console.log(res.y);
            console.log(res.z);
            var angle = -(res.x * 30).toFixed(1);
            if (angle > 14) { angle = 14; }
            else if (angle < -14) { angle = -14; }
            if (_this.data.angle !== angle) {
                _this.setData({
                    angle: angle
                });
            }
        });
    },
});
