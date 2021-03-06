$(function () {
  // 1.1 获取裁剪区域的 DOM 元素
  const layer = layui.layer;
  console.log(1);
  var $image = $("#image");
  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: ".img-preview",
  };

  // 1.3 创建裁剪区域
  $image.cropper(options);

  //绑定上传按钮的点击事件
  $("#btnSen").on("click", function () {
    $("#file").click();
  });

  $("#file").on("change", function (e) {
    const fileList = e.target.files;
    if (fileList.length === 0) return layer.msg("请选择照片");

    //拿到用户选择的文件
    const file = e.target.files[0];
    //将图片转换为路径
    const imgURL = URL.createObjectURL(file);
    //重新初始化裁减区域
    $image
      .cropper("destroy") // 销毁旧的裁剪区域
      .attr("src", imgURL) // 重新设置图片路径
      .cropper(options); // 重新初始化裁剪区域
  });

  //绑定确定按钮点击事件
  $("#btnSuree").on("click", function () {
    console.log(1);
    var dataURL = $image
      .cropper("getCroppedCanvas", {
        // 创建一个 Canvas 画布
        width: 100,
        height: 100,
      })
      .toDataURL("image/png");
    $.ajax({
      method: "POST",
      url: "/my/update/avatar",
      data: {
        avatar: dataURL,
      },
      success: function (res) {
        console.log(2);
        if (res.status !== 0) {
          return layer.msg("更换头像失败！");
        }
        layer.msg("更换头像成功！");
        window.parent.getUserInfo();
        console.log(3);
      },
    });
  });
});
