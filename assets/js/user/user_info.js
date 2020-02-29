$(function () {
    // 先初始化信息
    var layer = layui.layer;
    var form = layui.form;

    // 昵称验证规则
    form.verify({
        nickname: [
            /^[\S]{2,6}$/, '昵称必须2到6位，且不能出现空格'
        ]
    });


    initUserInfo();

    //定义函数,初始化用户信息
    function initUserInfo() {
        $.ajax({
            type: "get",
            url: "/my/userinfo",
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg("信息获取失败");
                }
                console.log(res.data);
                form.val("f1", res.data);
            }
        });
    }
    //设置重置信息点击事件
    $("#btnReset").on("click", function (e) {
        e.preventDefault();
        initUserInfo();
        // $("#form")[0].reset();
    });

});
//修改信息
$("#form").on('submit', function (e) {
    e.preventDefault();
    $.ajax({
        type: "post",
        url: "/my/userinfo",
        data: $(this).serialize(),
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg("信息修改失败");
            }
            layer.msg('更新用户信息成功!')
            window.parent.getUserinfo();

        }
    })
});