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
        type: "get",
        url: "/my/userinfo",
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            console.log(res.message);
            renderAvatar(res.data);
        }
    });
}
//更新头像
function renderAvatar(user) {
    var user = user.nickname || user.username;
    $(".welcom").html("欢迎&nbsp;&nbsp;" + user);
    if (user.user_pic) {
        $(".layui-nav-img").attr("src", user.user_pic).show();
        $(".ziti_avatar").hide();
    } else {
        var first = user[0].toUpperCase();
        $(".ziti_avatar").html(first).show();
        $(".layui-nav-img").hide();
    }
}