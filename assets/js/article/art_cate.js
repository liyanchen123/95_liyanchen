$(function () {
    var layer = layui.layer;
    var form = layui.form;

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
                var htmlStr = template("table", res);
                $("tbody").html(htmlStr);
            }
        });
    }
    var addIndex = null;
    //点击添加类别
    $("#showAdd").on("click", function () {
        addIndex = layer.open({
            type: 1,
            title: '添加文章分类',
            content: $("#tpl-add").html(),
            area: ['500px', '250px'] // 设置层的宽和高
        });
    })
    //添加委托事件
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
                initTable();
                layer.close(addIndex);
            }
        });

    });

    //添加编辑的委托事件
    var editIndex = null;
    $("table").on("click", ".btnEdit", function () {
        editIndex = layer.open({
            type: 1,
            title: "修改文章分类",
            content: $("#tpl-edit").html(),
            area: ['500px', '250px'] // 设置层的宽和高
        })

        var id = $(this).attr("data-id");
        $.ajax({
            type: "GET",
            url: "/my/article/cates/" + id,
            success: function (res) {
                if (res.status !== 0) {
                    console.log(res);
                    return layer.msg('获取失败');
                }
                layer.msg("获取成功");
                // console.log(res);
                form.val("form-edit", res.data);
            }
        });
    });
    //给弹出的编辑区域添加,监听事件
    $("body").on("submit", "#form-edit", function (e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/my/article/updatecate",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg("修改失败");
                }
                layer.msg("修改成功");
                initTable();
                layer.close(editIndex);
            }
        })
    });
    //删除
    $("table").on("click", ".btnDelete", function () {
        var id = $(this).attr("data-id")
        layer.confirm('确认删除?', {
            icon: 3,
            title: '提示'
        }, function (index) {
            $.ajax({
                type: "get",
                url: "/my/article/deletecate/" + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg("删除失败");
                    }
                    layer.msg('删除成功');
                    initTable();
                    layer.close(index);
                }
            });



        });
    });
});