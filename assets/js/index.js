//入口函数
$(function () {
    var layer = layui.layer;
    //获取用户信息
    getUserinfo();
    //根据获取的信息更新头像
    $(".login_out").on("click", function () {
        layer.confirm('确定退出吗?', {
            icon: 3,
            title: '提示'
        }, function (index) {
            //do something
            localStorage.removeItem("token");
            location.href = "/login.html"
            layer.close(index);
        });

    });

});
//发送请求,获取用户信息
function getUserinfo() {
    $.ajax({
        type: "GET",
        url: "/my/userinfo",
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg('获取用户信息失败！');
            }
            renderAvatar(res.data);
        }
    });
}
//更新头像
function renderAvatar(user) {
    var name = user.nickname || user.username;
    $(".welcom").html("欢迎&nbsp;&nbsp;" + name);
    if (user.user_pic) {
        $(".layui-nav-img").attr("src", user.user_pic).show();
        $(".ziti_avatar").hide();
    } else {
        $(".layui-nav-img").hide();
        var first = name[0].toUpperCase();
        $(".ziti_avatar").html(first).show();

    }
}
// // 获取用户的基本信息
// // 注意：一定要在 jQuery 入口函数之外，定义这个方法
// function getUserInfo() {
//     // 发起 ajax 请求，获取用户信息
//     $.ajax({
//         type: 'GET',
//         url: '/my/userinfo',
//         // 成功的回调
//         success: function (res) {
//             if (res.status !== 0) {
//                 return layui.layer.msg('获取用户信息失败！')
//             }
//             // 获取用户信息成功
//             // 渲染用户的头像和欢迎的文本内容
//             // render 渲染的意思
//             // Avatar 头像的意思
//             renderAvatar(res.data)
//         }
//     })
// }

// // 渲染用户头像和欢迎文本
// function renderAvatar(user) {
//     // 获取用户的名称
//     var name = user.nickname || user.username
//     // 1. 设置欢迎的文本
//     $('.welcom').html('欢迎&nbsp;&nbsp;' + name)
//     // 2. 按需渲染头像
//     if (user.user_pic) {
//         // 渲染图片的头像
//         $('.layui-nav-img').attr('src', user.user_pic).show()
//         $('.ziti_avatar').hide()
//     } else {
//         // 渲染文本的头像
//         $('.layui-nav-img').hide()
//         // 获取用户名的第一个字符串
//         var first = name[0].toUpperCase()
//         $('.ziti_avatar').html(first).show()
//     }
// }