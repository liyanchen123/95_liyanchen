$(function () {
    //设定验证密码的规则
    var form = layui.form;
    var layer = layui.layer;
    //设置密码验证
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        newPwd: function (value) {
            var pwd = $('[name=oldPwd]').val();
            if (value === pwd) {
                return "新旧密码不能重复";
            }
        },
        samePwd: function (value) {
            var pwd = $('[name=newPwd]').val();
            if (value !== pwd) {
                return "两次密码不一致";
            }
        }
    });
    //设置密码修改点击事件
    $("#form").on("submit", function (e) {
        e.preventDefault();
        $.ajax({
            type: "post",
            url: "/my/updatepwd",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg("密码更新失败");
                }
                layer.msg('更新密码成功!');
                $("#form")[0].reset();
            }
        });
    });
});