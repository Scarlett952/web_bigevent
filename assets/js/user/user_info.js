$(function () {
  const { form } = layui;
  const layer = layui.layer;
  form.verify({
    nickname: function (value) {
      if (value.length > 6) {
        return "不符合规则";
      }
    },
  });
  userinfo();
  //初始化用户信息
  function userinfo() {
    $.ajax({
      type: "GET",
      url: "/my/userinfo",
      success: function (res) {
        if (res.status !== 0) return layer.mag("信息获取失败");
        console.log(res);
        form.val("formUserInfo", res.data);
        // window.parent.getUserInfo();
      },
    });
  }

  //重置按钮绑定事件
  $("#btnReset").on("click", function (e) {
    // alert(1)
    e.preventDefault()
    userinfo()
  })

  //监听表单默认提交事件
  $(".layui-form").on("submit", function (e) {
    e.preventDefault();
    $.ajax({
      type: "post",
      url: "/my/userinfo",
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("修改信息失败")
        }
        layer.msg("修改信息成功")
        window.parent.getUserInfo()
      }
    });
  })
});
