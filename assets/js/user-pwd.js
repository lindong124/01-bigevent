$(function () {
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        //   新密码验证
        newpwd: function (value) {
            if (value === $('#newPwd').val()) {
                return '新密码不能与原密码相同！';
            }
        },
        // 确认密码验证
        rePwd: function (value) {
            if (value !== $('#rePwd').val()) {
                return '两次密码不一致！'
            }
        }
    });
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新密码失败！')
                }
                layer.msg('更新密码成功！')
                $('.layui-form')[0].reset()
                console.log(res);
            }
        })
       
    })
})