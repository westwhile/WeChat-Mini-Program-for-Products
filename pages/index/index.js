// 用户登录功能
Page({
    data: {
        userInfo: null,
        searchQuery: '',
        recommendedProducts: []
    },
    onLoad() {
        // 检查用户是否已登录
        wx.getStorage({
            key: 'userInfo',
            success: (res) => {
                this.setData({ userInfo: res.data });
            },
            fail: () => {
                wx.showToast({ title: '请先登录', icon: 'none' });
            }
        });
    },
    handleLogin() {
        wx.getUserProfile({
            desc: '用于完善会员资料',
            success: (res) => {
                wx.setStorage({ key: 'userInfo', data: res.userInfo });
                this.setData({ userInfo: res.userInfo });
            }
        });
    },
    handleSearch(e) {
        const query = e.detail.value;
        this.setData({ searchQuery: query });
        // 调用AI推荐接口
        wx.request({
            url: 'http://localhost:3000/search', // 修改为本地服务器地址
            method: 'POST',
            data: { query },
            success: (res) => {
                this.setData({ recommendedProducts: res.data.products });
            }
        });
    }
});