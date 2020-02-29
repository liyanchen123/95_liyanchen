//配置请求,便于后期维护
$.ajaxPrefilter(function (option) {
    option.url = "http://www.liulongbin.top:3007" + option.url;
    if (option.url.indexOf("/my/") !== -1) {
        option.headers = {
            Authorization: localStorage.getItem("token"),
        }
        option.complete = function (res) {
            if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
                localStorage.removeItem('token')
                // 2. 强制用户跳转到 登录页面
                location.href = '/login.html'
            }
        }
    }



});