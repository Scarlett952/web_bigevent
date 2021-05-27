//每次调用 $.get() 或 $.post() 或$.()ajax的时候
//都会先调用这个函数 ajaxPrefilter
//在这个函数中，我们可以拿到ajax提供的内置对象
$.ajaxPrefilter(function(options) {
    //在发起ajax请求之前，同意请求的根路径
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url;
    console.log(options.url);

    //判断接口是否带 /my 添加请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers={
              Authorization: localStorage.getItem("token") || "",
            }
  };

  //挂载complete
  options.complete = function (res) {
    console.log(1);
      console.log(res);
      //可以在res.responseJSON 拿到响应回来的数据
      if (res.responseJSON.status === 1 && res.responseJSON.message) {
        //1.清空token
        localStorage.removeItem("token");
        //2.跳转到index.html
        location.href = "./login.html";
      }
  }
});
