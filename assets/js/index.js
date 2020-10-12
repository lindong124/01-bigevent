$(function () {
    getUserInfo()


    var layer = layui.layer
    $('#btnlogout').on('click', function () {
        layer.confirm('确认退出登录？', {
            icon: 3,
            title: '提示'
        }, function (index) {
            //do something
            localStorage.removeItem('token');
            location.href = "/login.html"
            layer.close(index);
        });
    })
})

function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        data: {

        },
        // headers: {
        //     Authorization: localStorage.getItem('token')
        // },
        success: function (res) {
            console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg("获取用户信息失败！")
            }
            // 调用 renderAvatar 渲染用户的头像
            renderAvatar(res.data)
        },
        // complete: function (res) {
        //     console.log(res);
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         localStorage.removeItem('token');
        //         location.href = '/login.html'
        //     }
        // }
    })
}
// 渲染用户头像
function renderAvatar(user) {
    // 获取用户的名称
    var name = user.nickname || user.username
    // 设置欢迎的文本
    $('#welcome').html('欢迎&nbsp &nbsp' + name)
    // 按需渲染用户头像
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide()
    } else {
        var namefirst = name[0].toUpperCase()
        $('.layui-nav-img').hide();
        $('.text-avatar').html(namefirst).show()
    }
}