
$.fn.extend({
    createFullPage: function (config) {
        var colorArr = config.colorArr;
        var $w = $(this);
        var $section = $w.find('.section');
        var commonStyle = {
            width: '100%',
            height: '100%',
        };
        var clientWidth = $(window).outerWidth();
        var clientHeight = $(window).outerHeight();
        var curIndex = 0; // section的当前索引
        var direction = ''; // 键盘的按键方向
        var lock = true; // 运动的过程中keydown不可以用

        // html, body, wrapper style
        $('html').add('body').css({
            position: 'relative',
            margin: 0,
            overflow: 'hidden'
        }).add($w).css({
            position: 'absolute',
            left: 0,
            top: 0,
        }).add($section).css(commonStyle);

        // section slide style
        $section.eq(0).addClass('active');
        $section.each(function (index, ele) {
            $(ele).css({
                backgroundColor: colorArr[index],
                position: 'relative',
            }).find('.slide').wrapAll($('<div class="slideWrapper" />'))
                .css({
                    position: 'relative',
                    float: 'left',
                    width: clientWidth,
                    height: clientHeight
                }).eq(0).addClass('innerActive');
        });
        // slideWrapper style
        $section.find('.slideWrapper').css({
            position: 'absolute',
            left: 0,
            top: 0,
            height: clientHeight
        }).each(function (index, ele) {
            $(ele).css({
                width: $(ele).find('.slide').length * clientWidth
            }).find('.slide').each(function (index, ele) {
                $(ele).css('backgroundColor', colorArr[index]);
            })
        })

        // keydown事件
        $(document).on('keydown', function (e) {
            if(e.which == 38 || e.which == 40) {
                if(!lock) {
                    return;
                }
                lock = false;
                // up down
                var newTop = $w.offset().top;
                $section.eq(curIndex).removeClass('active');
                if( e.which == 38 && curIndex > 0 && curIndex <= $section.length - 1) {
                    direction = 'up';
                    config.onLeave(curIndex, direction);
                    curIndex --;
                    newTop += clientHeight;
                } else if( e.which == 40 && curIndex >=0 && curIndex < $section.length - 1) {
                    direction = 'down';
                    config.onLeave(curIndex, direction);
                    curIndex ++;
                    newTop -= clientHeight;
                }
                $w.animate({
                    top: newTop
                }, 300, function () {
                    config.afterLoad(curIndex, direction);
                    $section.eq(curIndex).addClass('active');
                    lock = true;
                })
            } else if( e.which == 37 || e.which == 39 ) {
                if(!lock) {
                    return;
                }
                lock = false;
                var $sw = $('.active').find('.slideWrapper');
                var curShowDom = $sw.find('.innerActive');
                var showDomIndex = curShowDom.index();
                var newLeft = $sw.offset().left;
                var direction = null;

                if(e.which == 37 && showDomIndex > 0 && showDomIndex <= $sw.find('.slide').length - 1) {
                    direction = 'left';
                    config.onLeave(showDomIndex, direction);
                    newLeft += clientWidth;
                } else if( e.which == 39 && showDomIndex >= 0 && showDomIndex < $sw.find('.slide').length - 1) {
                    direction = 'right';
                    config.onLeave(showDomIndex, direction);
                    newLeft -= clientWidth;
                }
                $sw.animate({
                    left: newLeft
                }, 300, function () {
                    direction != null ? curShowDom.removeClass('innerActive') : '';
                    if(direction == 'left') {
                        curShowDom.prev().addClass('innerActive');
                        config.afterLoad(showDomIndex - 1, direction);
                    } else if(direction == 'right') {
                        curShowDom.next().addClass('innerActive');
                        config.afterLoad(showDomIndex + 1, direction);
                    }
                    lock = true;
                })
            }
        })

    }
})