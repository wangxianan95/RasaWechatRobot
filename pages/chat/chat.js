const app = getApp()
Page({
 /**
   * 页面的初始数据
   */
  data: {
    tittle: "小林",
    syas: [{
        'robot': '我是小林，来跟我聊天吧！'
      }
    ],
    headLeft: '../images/xj.png',
    headRight: '',
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    let that = this
      wx.getUserInfo({
        success:function(e){
          let header = e.userInfo.avatarUrl
          that.setData({
            headRight:header
          })
        }
      })
  },
  converSation: function(e) {
    let that = this
    var obj = {},
    isay = e.detail.value.says,
    syas=that.data.syas,
    length = syas.length,
    key='30b4d33791f953792fcf605641598f40'//这里填入你得到的机器人的apikey
    console.log(length)
    wx.request({
      url: 'https://api.ownthink.com/bot?appid='+key+'&userid=user&spoken='+isay,
      success:function(res){
        let xiaojin = res.data.data.info.text;
        obj.robot=xiaojin;
        obj.isay=isay;
        syas[length] = obj;
        that.setData({
          syas:syas
        })
        
    }})
  },
  delectChat:function(){
    let that = this
    that.setData({
      syas:[]
    })
  },
  onShareAppMessage: function(res) {
    return {
      title: '志愿填报有烦恼？快来小林',
      path: '/pages/index/index?goods_id=' + wx.getStorageSync("goods_id"),
      imageUrl: '../images/fx.jpg'//自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径。支持PNG及JPG。显示图片长宽比是 5:4。
    }
  }
  
})