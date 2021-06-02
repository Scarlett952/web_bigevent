$(function () {
  var layer = layui.layer;
  var form = layui.form;
  var q = {
    pagenum: 1, // 页码值，默认请求第一页的数据
    pagesize: 2, // 每页显示几条数据，默认每页显示2条
    cate_id: "", // 文章分类的 Id
    state: "", // 文章的发布状态
  };
  initTable();
  function initTable() {
    $.ajax({
      type: "GET",
      url: "/my/article/list",
      data: q,
      success: function (res) {
        if (res.status !== 0) return layer.msg("获取列表失败");
        layer.msg("获取列表成功");
        // console.log(res);
        var htmlStr = template("tpl-table", res);
        $("tbody").html(htmlStr);
      },
    });
  }

  initCate();
  function initCate() {
    $.ajax({
      type: "GET",
      url: "/my/article/cates",
      success: function (res) {
        // if (res.status !== 0) return layer.msg("获取数据失败");
        // layer.msg("获取数据成功");
        var htmlStr = template("tpl-cate", res);
        $('[name="cate_id"]').html(htmlStr);
        form.render();
      },
    });
  }

  //监听表单提交事件
  $("#form-search").on("submit", "#btn-select", function (e) {
    e.preventDefault();
    var cate_id = $('[name="cate_id"]').val();
    var state = $('[name="state"]').val();
    q.cate_id = cate_id;
    q.state = state;
    initTable();
  });

  // 定义美化时间的过滤器
  template.defaults.imports.dataFormat = function (date) {
    const dt = new Date(date);

    var y = dt.getFullYear();
    var m = padZero(dt.getMonth() + 1);
    var d = padZero(dt.getDate());

    var hh = padZero(dt.getHours());
    var mm = padZero(dt.getMinutes());
    var ss = padZero(dt.getSeconds());

    return y + "-" + m + "-" + d + " " + hh + ":" + mm + ":" + ss;
  };
  // 定义补零的函数
  function padZero(n) {
    return n > 9 ? n : "0" + n;
  }
});
