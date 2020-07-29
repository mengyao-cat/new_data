
// 入口函数
$(function () {
    // 点击切换登录/注册事件
    // 去注册按钮绑定事件
    $('#reg_link').on('click', function () {
        // $('.reg-box').show();
        // $('.login-box').hide();
        $('.reg-box').show().siblings('.login-box').hide();

    })
    // 给登录按钮绑定点击事件
    $('#login_link').on('click', function () {
        // $('.reg-box').hide();
        // $('.login-box').show();
        $('.reg-box').hide().siblings('.login-box').show();
    });
    var form = layui.form;
    // var layer=layui.layer;
    // var name=obj.name;
    // var age=obj.age;
    // var {age,name}=obj;//与上面是等价的 解构赋值语法
    var { layer } = layui;//解构赋值 与var layer=layui.layer一个意思
    form.verify({
        //数组第一项是匹配的正则,第二项是不满足正则的时候报错信息
        pwd: [/^\S{6,12}$/, '密码不能为空,且是6到12位'],
        //   验证表单: 验证两次密码是否一致
        repwd: function (value) {
            var pwd = $('.reg-box [name="password"]').val();
            console.log(pwd);
            //  判断是否一致  如果两次密码不一致 则retrun一个提示消息
            if (pwd !== value) {
                return '两次密码不一致';
            }

        }
    });
    // 监听注册按钮提交事件
    // 注册的功能, 给注册表单监听一个提交事件,住址默认提交行为, 用ajax来实现提交
    $('#form_reg').on('submit', function (e) {
        // 阻止表单默认提交行为    
        e.preventDefault();
        //    发起ajax请求
        // 选定表单里面的input属性的val值(获取用户输入的内容)
        var username = $('#form_reg [name = username]').val();
        var password = $('#form_reg [name = password]').val();
        $.ajax({
            type: 'post',
            url: '/api/reguser',
            //    需要提交的数据
            data: {
                username: username,
                password: password,
            },
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('注册成功,请登录!');
                // 模拟人的点击行为 跳转到登录页面
                $('#login_link').click();

            }
        })
    });
    // 监听登录按钮提交事件
    $('#form_login').submit(function (e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/api/login',
            //    serialize获取所有表单
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    // 如果登录失败,则返回当前状态值  message
                    return layer.msg(res.message);
                }
                // 登录成功返回 登陆成功状态
                layer.msg(res.message);
                console.log(res);
                // token:令牌 凭证
                // localStorage.setItem(这个值可以自定义, 你要存储的值)
                // localStorage 特点同一个网站可以共用一个数据
                //  登录成功的时候 如果用户名和密码正确,就返回一个token值 下次访问的时候,就初始token
                // 将数据保存到本地
                localStorage.setItem('token', res.token)
                //登录成功 跳转至下一个页面
                location.href = '/index.html';


            }
        })
    })

})