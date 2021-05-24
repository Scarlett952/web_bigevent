//每次调用 $.get() 或 $.post() 或$.()ajax的时候
//都会先调用这个函数 ajaxPrefilter
//在这个函数中，我们可以拿到ajax提供的内置对象
$.ajaxPrefilter(function(options) {
    //在发起ajax请求之前，同意请求的根路径
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url;
    console.log(options.url);
});
