
/**
 * config对象属性
 * type 使用哪个component构造工厂
 * width
 * height
 * css  设置样式
 * animateIn  出现的动画
 * animateOut  离开的动画
 * delay   出现或者离开的延迟时间
 *
 * */


var ComponentFactory = function (config) {
    var $Div = $('<div class="component base">');

    config.width && $Div.css('width', config.width);
    config.height && $Div.css('height', config.height);
    config.className && $Div.addClass(config.className);
    config.css && $Div.css(config.css);

    $Div.on({
        cpLoad: function (index) {
            var index = index;
            setTimeout(function () {
                config.animateIn && $Div.animate(config.animateIn);
                console.log('slide ' + index + ' load')
            }, config.delay || 0)
        },
        cpLeave: function (index) {
            var index = index;
            setTimeout(function () {

                config.animateOut && $Div.animate(config.animateOut);
                console.log('slide ' + index + ' leave')

            }, config.delay || 0)
        }
    })

    config.event && $Div.on(config.event);
    return $Div;
}