$(function () {
  getUserInfo();
  var layer = layui.layer;
  $("#logOut").on("click", function () {
    // alert(1)
    layer.confirm(
      "确定退出登录?",
      { icon: 3, title: "提示" },
      function (index) {
        //do something

        //情况本地存储的token
        localStorage.removeItem("todolist");
        localStorage.removeItem("token");
        //跳转到登录页面
        // location.href = "./login.html";
        location.href="/login.html"

        //关闭confirm 询问框
        layer.close(index);
      }
    );
  });
});

function getUserInfo() {
  $.ajax({
    type: "get",
    url: "/my/userinfo",
    // headers: {
    //   Authorization: localStorage.getItem("token") || "",
    // },
    success: function (res) {
      console.log(res);
      if (res.status !== 0) return layui.layer.msg("获取用户信息失败");
      reanerAdver(res.data);
    },

    //不论成功还是失败，都会调用conplete回调函数
    // complete: function (res) {
    //   console.log(1);
    //   console.log(res);
    //   //可以在res.responseJSON 拿到响应回来的数据
    //   if (res.responseJSON.status === 1 && res.responseJSON.message) {
    //     //1.清空token
    //     localStorage.removeItem("token");
    //     //2.跳转到index.html
    //     location.href = "./login.html";
    //   }
    // },
  });
}
//头像和文字头像函数
function reanerAdver(user) {
  //判断用户
  const name = user.username || user.nickname;
  $("#welcom").html(`欢迎&nbsp;${name}`);

  // 判断头像
  if (user.user_pic !== null) {
    $(".layui-nav-img").attr("src", user.user_pic).show();
    $(".text_avatar").hide();
  } else {
    const first = name[0].toUpperCase();
    $(".text_avatar").html(first).show();
    $(".layui-nav-img").hide();
  }
}
