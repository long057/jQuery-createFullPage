
pageEngine.init('.wrapper', ['pink', 'lightblue', 'limegreen'])
    .addSection('section-1')
        .addSlide('slide-1')
            .addComponent({
                    type: 'base',
                    width: 192,
                    height: 120,
                    css: {
                        position: 'absolute',
                        top: 0,
                        left: '50%',
                        marginLeft: -86,
                        marginTop: -60,
                        opacity: 0,
                        backgroundImage: 'url("./src/img/0.jpg")',
                        backgroundSize: '100% 100%',
                        transform: 'translate(-50%, -50%)'
                    },
                    animateIn: {
                        top: '50%',
                        opacity: 1
                    },
                    // animateOut: {
                    //     top: 0,
                    //     opacity: 0
                    // },
                    delay: 1000
                })
        .addSlide('slide-2')
            .addComponent({
                type: 'base',
                width: 192,
                height: 120,
                css: {
                    position: 'absolute',
                    top: '50%',
                    left: 0,
                    marginLeft: -86,
                    marginTop: -60,
                    opacity: 0,
                    backgroundImage: 'url("./src/img/2.jpg")',
                    backgroundSize: '100% 100%',
                    transform: 'translate(-50%, -50%)'
                },
                animateIn: {
                    left: '50%',
                    opacity: 1
                },
                // animateOut: {
                //     left: 0,
                //     opacity: 0
                // },
                delay: 1000,
                event: {
                    click: function () {
                        alert('click');
                    }
                }
            })
        .addSlide('slide-3')
            .addComponent({
                type: 'base',
                width: 192,
                height: 120,
                css: {
                    position: 'absolute',
                    top: '50%',
                    left: 0,
                    marginLeft: -86,
                    marginTop: -60,
                    opacity: 0,
                    backgroundImage: 'url("./src/img/6.jpg")',
                    backgroundSize: '100% 100%',
                    transform: 'translate(-50%, -50%)'
                },
                animateIn: {
                    left: '50%',
                    opacity: 1
                },
                animateOut: {
                    left: 0,
                    opacity: 0
                },
                delay: 1000
            })
    .addSection('section-2')
        .addComponent({
            type: 'base',
            width: 300,
            height: 300,
            css: {
                position: 'absolute',
                top: 0,
                left: '50%',
                opacity: 0,
                backgroundImage: 'url("./src/img/6.jpg")',
                backgroundSize: '100% 100%',
                transform: 'translate(-50%, -50%)'
            },
            animateIn: {
                top: '50%',
                opacity: 1
            },
            animateOut: {
                top: 0,
                opacity: 0,
            },
            delay: 300
        })
    .addSection('section-3')
        .addComponent({
            type: 'base',
            width: 300,
            height: 300,
            css: {
                position: 'absolute',
                top: 0,
                left: '50%',
                opacity: 0,
                backgroundImage: 'url("./src/img/0.jpg")',
                backgroundSize: '100% 100%',
                transform: 'translate(-50%, -50%)'
            },
            animateIn: {
                top: '50%',
                opacity: 1
            },
            animateOut: {
                top: 0,
                opacity: 0,
            },
            delay: 1000
        })
    .load()