$(function () {
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        nickname: function (value) {
            if (value.length < 6) {
                return '昵称长度必须在1-6之间'
            }
        }
    });
    initUserInfo();

    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败')
                }
                // 利用 form.val() 进行快速赋值，赋值之前我们需要给 form表单添加 一个 lay-filter 的属性
                form.val('formUserInfo', res.data)
            }
        })
    }
    // 重置表单的数据
    $('#btnReset').on('click', function (e) {
        e.preventDefault();
        initUserInfo();
    })
    // 监听表单的提交事件
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            url: '/my/userinfo',
            method: 'POST',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败！')
                }
                layer.msg('更新用户信息成功！');
                window.parent.getUserInfo();
            }
        })
    })
})