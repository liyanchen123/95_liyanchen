$(function() {
  var form = layui.form;
  var layer = layui.layer;
  //点击去注册,跳转
  $("#link-reg").on("click", function() {
    $(".reg-box").show(); //显示
    $(".login-box").hide(); //隐藏
  });
  $("#link-login").on("click", function() {
    $(".login-box").show(); //显示
    $(".reg-box").hide(); //隐藏
  });
  //表单验证
  form.verify({
    // //这是对于注册用户名的验证
    // uName: function(value, item) {
    //   //value：表单的值、item：表单的DOM对象

    //   if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
    //     return "用户名不能有特殊字符";
    //   }
    //   if (/(^\_)|(\__)|(\_+$)/.test(value)) {
    //     return "用户名首尾不能出现下划线'_'";
    //   }
    //   if (/^\d+\d+\d$/.test(value)) {
    //     return "用户名不能全为数字";
    //   }
    // },
    pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    samePwd: function(value) {
      var respwd = $(".reg-box [name=password]").val();
      if (value !== respwd) {
        return "两次密码不一致";
      }
    }
  });
  //发送注册表单验证请求 #form-reg
  $("#form_reg").on("submit", function(e) {
    //阻止表单跳转
    e.preventDefault();
    //发起ajax请求
    $.ajax({
      methods: "POST",
      url: "http://www.liulongbin.top:3007/api/reguser",
      data: $(this).serialize(),
      success: function(res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        layer.msg("注册成功,请登录");
        $("#link-login").click();
      }
    });
  });
  //发送表单验证,登录 #form_login
  $("#form-login").on("submit", function(e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "http://www.liulongbin.top:3007/api/login",
      data: $(this).serialize(),
      success: function(res) {
        if (res.status !== 0) {
          //提示登录失败
          return layer.msg("登录失败");
        }
        layer.msg("登陆成功");
        localStorage.setItem("token", res.token);
        //跳转到index页面
        location.href = "/index.html";
      }
    });
  });
});
