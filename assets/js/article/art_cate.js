$(function () {
    var layer = layui.layer;

    initTable();

    //先初始化数据
    function initTable() {
        $.ajax({
            type: "GET",
            url: "/my/article/cates",
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg("获取失败");
                }
                var htmlStr = template("temp", res);
                $("tbody").html(htmlStr);
            }
        });
    }
    var index = null;
    //点击添加类别
    $("#showAdd").on("click", function () {
        index = layer.open({
            type: 1,
            title: '添加文章分类',
            content: $("#tpl-add").html(),
            area: ['500px', '250px'] // 设置层的宽和高
        });
    })
    $("body").on("submit", "#form-add", function (e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/my/article/addcates",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg("分类添加失败");
                }
                layer.msg("添加成功");
                layer.close(index);
                initTable();
            }
        });

    });



});