
var pageEngine = {
    init: function (selector, colorArr) {
        this.$w = $(selector);
        this.colorArr = colorArr;
        this.slideFlag = false;
        return this;
    },
    addSection: function (className) { // 添加每一页 wrapper中上下展示
        this.slideFlag = false;
        this.$Section = $('<div class="section" />');
        this.$Section.addClass(className)
            .appendTo(this.$w);
        return this;
    },
    addSlide: function (className) {  // section中添加横向展示内容
        this.slideFlag = true;
        this.$Slide = $('<div class="slide" />');
        this.$Slide.addClass(className)
            .appendTo(this.$Section);
        return this;
    },
    addComponent: function (config) {  // section、slide添加展示内容
        var oCp = null;
        switch(config.type) {
            case 'base':
                oCp = ComponentFactory(config); // 构造一个component div
                break;
            default: {
                return;
            }
        }
        this.slideFlag ? this.$Slide.append(oCp) : this.$Section.append(oCp);
        return this;
    },
    bindEvent: function () {
        var self = this;
        this.$w.find('.section').on({
            _leave: function (index) {
                console.log(index + ' leave');
                $(this).find('.component').trigger('cpLeave', index);
            },
            _load: function (index) {
                console.log(index + ' load')
                $(this).find('.component').trigger('cpLoad', index);
            }
        })
    },
    load: function () {
        var self = this;
        this.bindEvent();
        this.$w.createFullPage({
            colorArr: self.colorArr,
            onLeave: function (index, direction) {
                if(direction == 'up' || direction == 'down') {
                    self.$w.find('.section').eq(index).trigger('_leave', index);
                } else if( direction == 'left' || direction == 'right') {
                    self.$w.find('.active').find('.slide').eq(index).trigger('_leave', index);
                }
            },
            afterLoad: function (index, direction) {
                if(direction == 'up' || direction == 'down') {
                    self.$w.find('.section').eq(index).trigger('_load', index);
                } else if (direction == 'left' || direction == 'right') {
                    self.$w.find('.active').find('.slide').eq(index).trigger('_load', index);
                }
            }
        });
        this.$w.find('.section').eq(0).trigger('_load', 0);
    }
}