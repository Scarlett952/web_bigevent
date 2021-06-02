$(function () {
  //点击 去注册账户的 链接
  $("#link_reg").on("click", function () {
    $(".login_box").hide();
    $(".reg_box").show();
  });

  //点击去登录 链接
  $("#link_login").on("click", function () {
    $(".reg_box").hide();
    $(".login_box").show();
  });

  // 从layui中 获取form对象
  var form = layui.form;
  var layer = layui.layer;
  //通过form.verify()函数方法自定义校验规则
  form.verify({
    //自定义一个pwd的校验规则
    pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    reped: function (value) {
      //通过形参拿到确认密码框中的密码
      //还需要拿到密码框中的密码
      //然后进行一次判断，失败则返回一个提示消息即可
      var val = $(".reg_box [name=password]").val();
      if (val !== value) return "两次密码不一致";
    },
  });

  //监听表单提交数据
  $("#form_reg").on("submit", function (e) {
    //为什么写在外面访问不到
    var uses = $("#form_reg [name=username]").val();
    var pwds = $("#form_reg [name=password]").val();
    //阻止表单默认提交事件
    e.preventDefault();
    //请求端口提交数据
    // $.post(
    //   "http://api-breakingnews-web.itheima.net/api/reguser",
    //   { username: uses, password: pwds },
    //   function (res) {
    //     if (res.status !== 0) return console.log(res.message);
    //     console.log("提交成功");
    //   }
    // );
    $.ajax({
      type: "post",
      url: "/api/reguser",
      data: {
        username: uses,
        password: pwds,
      },
      success: function (res) {
        if (res.status !== 0) return layer.msg(res.message);
        layer.msg("注册成功,请登录");

        //跳转至登录页面
        $("#link_login").click();
      },
    });
  });

  //登录页面提交数据
  $("#form_login").submit(function (e) {
    e.preventDefault();
    $.ajax({
      type: "post",
      url: "/api/login",
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) return layer.msg("登录失败");
        layer.msg("登录成功");
        //   console.log(res.token);

        //创建本地存储
        localStorage.setItem("token", res.token);
        // location.href = "/QQPCmgr/Desktop/bigbigbig/day1/code/index.html";
        location.href = "/index.html"
        // location.href="."
      },
    });
  });
});
