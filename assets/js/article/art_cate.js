$(function () {
  var form = layui.form;
  var layer = layui.layer;
  var indexAdd = null;
  initArtCateList();
  function initArtCateList() {
    $.ajax({
      type: "get",
      url: "/my/article/cates",
      success: function (res) {
        var htmlStr = template("tpl-table", res);
        $("tbody").html(htmlStr);
      },
    });
  }

  $("#btnArtAdd").on("click", function () {
    // alert(1)
    indexAdd = layer.open({
      type: 1,
      area: ["500px", "300px"],
      title: "添加文章分类",
      content: $("#dialog-add").html(),
    });
  });

  //监听提交事件
  $("body").on("submit", "#form-add", function (e) {
    e.preventDefault();
    $.ajax({
      type: "post",
      url: "/my/article/addcates",
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) return layer.msg("提交添加失败");
        initArtCateList();
        layer.msg("提交成功");
        layer.close(indexAdd);
      },
    });
  });

  //监听编辑事件
  var indexEdit = null;
  $("tbody").on("click", "#edit", function () {
    // alert(1)
    indexEdit = layer.open({
      type: 1,
      area: ["500px", "300px"],
      title: "添加文章分类",
      content: $("#dialog-edit").html(),
    });
    var id = $(this).attr("data-id");
    $.ajax({
      type: "get",
      url: "/my/article/cates/" + id,
      success: function (res) {
        form.val("form-edit", res.data);
      },
    });
  });

  //监听编辑表单默认提交事件
  $("body").on("submit", "#form-edit", function (e) {
    e.preventDefault();
    $.ajax({
      type: "post",
      url: "/my/article/updatecate",
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) return layer.msg("修改数据失败");
        layer.msg("修改数据成功");
        layer.close(indexEdit);
        initArtCateList();
      },
    });
  });

  //动态删除
  $("tbody").on("click", "#btnDelte", function () {
    var id = $(this).attr("data-id");
    layer.confirm("确认删除？", { icon: 3, title: "提示" }, function (index) {
      //do something
      // $.ajax({
      //   type: "GET",
      //   url: "/my/article/deletecate/" + id,
      //   success: function (res) {
      //     if (res.status !== 0) return layer.msg("删除失败");
      //     layer.msg("删除成功");
      //     layer.close(index);
      //     initArtCateList();
      //   },
      // });

    });
  });
});
