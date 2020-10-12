$(function () {
    $('#link-login').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link-reg').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })
    // 自定义校验规则
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 确认密码逻辑
        repwd(value) {
            var pwd = $('.reg-box [name=repassword]').val();
            if (pwd !== value) {
                return '两次密码输入不一致'
            }
        }
    })
    // 监听注册表单的提交事件
    $('#form-reg').on('submit', function (e) {
        // 阻止表单默认提交事件
        e.preventDefault();
        // 发起ajax 的请求
        $.ajax({
            url: '/api/reguser',
            method: 'POST',
            data: {
                username: $('.reg-box [name=username]').val(),
                password: $('.reg-box [name=password]').val()
            },
            // 判断返回值
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('注册成功,请登录');
            }

        })
        $('#link-reg').click();
    });
    // 监听登录表单的提交事件
    $('#form-login').on('submit', function (e) {
        console.log(11)
        // 阻止表单默认提交事件
        e.preventDefault();
        // 发起ajax 的请求
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(), //获取表单全部数据 serialize()
            // 判断返回值
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('登录成功');
                // 保存token 
                localStorage.setItem('token', res.token)
                // 跳转到index.html 页面
                location.href = '/index.html';
            }
        })
    })
})