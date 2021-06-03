$(function () {
  var layer = layui.layer;
  var form = layui.form;
  var laypage = layui.laypage;
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
        rederList(res.total);
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

  function rederList(total) {
    // 定义渲染分页的方法

    // 调用 laypage.render() 方法来渲染分页的结构
    laypage.render({
      elem: "pageList", // 分页容器的 Id
      count: total, // 总数据条数
      limit: q.pagesize, // 每页显示几条数据
      layout: ["count", "limit", "prev", "page", "next", "skip"],
      limits: [2, 3, 6, 8],
      curr: q.pagenum, // 设置默认被选中的分页
      //obj（当前分页的所有选项值）、first（是否首次，一般用于初始加载的判断）
      jump: function (obj, first) {
        q.pagenum = obj.curr;
        q.pagesize = obj.limit;
        if (!first) {
          initTable();
        }
      },
    });
  }

  //删除按钮点击事件
  $("tbody").on("click", "#btnDel", function () {
    layer.confirm("确定删除?", { icon: 3, title: "提示" }, function (index) {
      //do something
      var leng = $("#btnDel").length;
      var id = $(this).attr("data-id");
      $.ajax({
        type: "get",
        url: "/my/article/delete/" + id,
        success: function (res) {
          if (res.status !== 0) return layer.msg("删除失败");
          layer.msg("删除成功");
          initTable();
          if (leng === 1) {
            q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1;
          }
          layer.close(index);
        },
      });
    });
  });
});
