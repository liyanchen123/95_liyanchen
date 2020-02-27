$(function () {
    var form = layui.form;
    var layer = layui.layer;
    //点击去注册,跳转
    $("#link-reg").on("click", function () {
        $(".reg-box").show();
        $(".login-box").hide();
    });
    $("#link-login").on("click", function () {
        $(".login-box").show();
        $(".reg-box").hide();
    });
    //表单验证
    form.verify({

    });



});