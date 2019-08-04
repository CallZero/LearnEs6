//ES5中的默认函数
function req(url, timeout, callback) {
    timeout = timeout || 2000
    callback = callback || function () {

    }
}

//当timeout, callback为空的时候，会自动给它一个默认值
//如果timeout=0，传入进去后依旧会被改成2000

//ES6中可以直接这样设置
function req(url, timeout = 2000, callback = function () {}) {


}

/*总结，上面的默认函数使用方式和C++类似*/