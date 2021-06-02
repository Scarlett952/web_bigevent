$(function () {
    const form = layui.form;
    const layer = layui.layer;
    //密码校验
  form.verify({
      pass: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
      same: function (value) {
          if (value === $('[name=oldPwd]').val()) {
              return "新旧密码不能相同"
          }
      },
      resame: function (value) {
          if (value !== $('[name=newPwd]').val()) {
              return  "两次密码不一致"
           }
       }
  });
    
    //监听表单默认提交事件
    $(".layui-form").on("submit", function (e) {
        e.preventDefault();
        $.ajax({
            type: "post",
            url: "/my/updatepwd",
            data: $(this).serialize(),
            success: function (res) {
                console.log(1);
                if (res.status !== 0) return layer.msg("密码修改失败")
                layer.msg("密码修改成功")
                $(".layui-form")[0].reset();
            }
        });
    })
});
