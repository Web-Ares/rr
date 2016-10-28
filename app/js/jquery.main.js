"use strict";
( function() {

    $( function() {

        $.each( $('.clouds'), function () {

            new CloudsAnimated( $(this) );

        } );

        $.each( $('.guy'), function () {

            new GuyAnimated( $(this) );

        } );

        $.each( $('.site__content_full'), function () {

            new ContentFullHeight( $(this) );

        } );

        $.each( $('.plans'), function () {

            new PlansChooseHeight( $(this) );

        } );

        $.each( $('.site__header'), function () {

            new Menu( $(this) );

        } );

        $('.popup').each( function() {

            new Popup( $(this) );

        } );

    } );

    var CloudsAnimated = function (obj) {

        //private properties
        var _self = this,
            _obj = obj,
            _items = _obj,
            _window = $(window),
            _globalWidth = _window.width();

        //private methods
        var _addEvents = function () {

                _window.on( {
                    resize: function() {

                        _checkPutInWindow();
                        _checkScroll();

                    },
                    load: function() {

                        _checkScroll();

                    },
                    scroll: function () {

                        _checkScroll();

                    }
                } );

            },
            _checkScroll = function(){

                var topPos = _obj.offset().top ,
                    start = topPos - _window.height(),
                    end = topPos + _obj.height(),
                    scrollPoint;

                var x = ( end - _window.scrollTop() ) / ( end -  start );

                if ( x > 1 ) {

                    scrollPoint = 0;


                } else if ( x < 0 ) {

                    scrollPoint = 1;

                }

                if( ( x < 1 ) && ( x > 0 ) ){

                    scrollPoint = 1 - x;

                }
                if(  _obj.hasClass('putted-all') ) {

                    scrollPoint = 0.5;

                }

                _animationElems( start, end, scrollPoint );

            },
            _animationElems = function ( startPoint, endPoint, scrollPoint ) {

                _items.each( function () {

                    var curElem = $( this ),
                        translateStart = 0,
                        translateFinish = 100,
                        x = 1;

                    if( curElem.hasClass('clouds_1') ) {

                        x = -1;

                    }

                    if ( scrollPoint == 0 ) {

                        curElem.css( {

                            '-webkit-transform': 'translateX(' +( -translateFinish * x )+ '%)',
                            'transform': 'translateX(' +( -translateFinish * x )+ '%)'

                        } );

                    } else if ( scrollPoint == 1 ) {

                        curElem.css( {

                            '-webkit-transform': 'translateX(' +( -translateFinish * x )+ '%)',
                            'transform': 'translateX(' +( -translateFinish * x )+ '%)'

                        } );

                    } else {


                        //if( scrollPoint < 0.5 && scrollPoint > 0 ) {
                        //
                        //    curElem.css( {
                        //
                        //        '-webkit-transform': 'translateX(' +( scrollPoint * 200 * x )+ '%)',
                        //        'transform': 'translateX(' +( scrollPoint * 200 * x )+ '%)'
                        //
                        //    } );
                        //
                        //}
                        //
                        //
                        //if( scrollPoint >= 0.5 && scrollPoint < 0.8 ) {
                        //
                        //    curElem.css( {
                        //
                        //        '-webkit-transform': 'translateX(' +( translateFinish * x )+ '%)',
                        //        'transform': 'translateX(' +( translateFinish * x )+ '%)'
                        //
                        //    } );
                        //
                        //}
                        //
                        //if( scrollPoint >= 0.8 ) {
                        //
                        //    scrollPoint = 1.3 - scrollPoint;
                        //
                        //    curElem.css( {
                        //
                        //        '-webkit-transform': 'translateX(' +( scrollPoint * 200 * x )+ '%)',
                        //        'transform': 'translateX(' +( scrollPoint * 200 * x )+ '%)'
                        //
                        //    } );
                        //
                        //}

                        if( scrollPoint >= 0.5 ) {

                            scrollPoint = 1 - scrollPoint;

                        }

                        curElem.css( {

                            '-webkit-transform': 'translateX(' +( scrollPoint * 200 * x )+ '%)',
                            'transform': 'translateX(' +( scrollPoint * 200 * x )+ '%)'

                        } );


                    }

                } );

            },
            _checkPutInWindow = function() {

                var heightWin = _window.height(),
                    heightSite = $('.site').height();

                if( heightSite <= heightWin ) {

                    _obj.addClass('putted-all');

                } else {

                    _obj.removeClass('putted-all');

                }

            },
            _init = function () {

                _obj[0].obj = _self;
                _addEvents();
                _checkPutInWindow();

            };

        _init();
    };

    var GuyAnimated = function (obj) {

        //private properties
        var _self = this,
            _obj = obj,
            _hand = _obj.find('.guy__hand'),
            _window = $(window),
            _globalWidth = _window.width();

        //private methods
        var _addEvents = function () {

                _window.on( {
                    resize: function() {

                        if( _globalWidth != _window.width() ) {

                            _globalWidth = _window.width() + 1;


                            if( _window.width() < 768 ) {

                                _hand.css( {
                                    '-webkit-transform': 'none',
                                    'transform': 'none'
                                } );

                            }

                        }

                        _checkPutInWindow();
                        _checkGetInWindow();
                        _checkScroll();

                    },
                    load: function() {

                        if( _window.width() >= 768 ) {

                            _checkScroll();

                        }

                    },
                    scroll: function () {

                        if (_window.width() >= 768) {

                            _checkScroll();

                        }

                    }
                } );

            },
            _checkScroll = function() {

                var windowH = _window.height(),
                    topPos = _obj.offset().top,
                    start = _hand.offset().top - windowH,
                    end = topPos - windowH + _obj.height(),
                    scrollPoint;

                if(  _obj.hasClass('putted') ) {

                    start = _hand.offset().top - windowH/2;
                    end = windowH/2.5;

                }

                var x = ( end - _window.scrollTop() ) / ( end -  start );

                if ( x > 1 ) {

                    scrollPoint = 0;


                } else if ( x < 0 ) {

                    scrollPoint = 1;

                }

                if( ( x < 1 ) && ( x > 0 ) ){

                    scrollPoint = 1 - x;

                }
                if(  _obj.hasClass('putted-all') ) {

                    scrollPoint = 1;

                }


                _animationElems( start, end, scrollPoint );


            },
            _checkGetInWindow = function() {

                var heightWin = _window.height(),
                    scrollTopWin =_window.scrollTop(),
                    heightObj = _hand.height(),
                    positionObj = _hand.offset().top;

                if( ( heightObj + positionObj < heightWin + scrollTopWin ) && $('.site').height() > heightWin * 2  ) {

                    _obj.addClass('putted');

                } else {

                    _obj.removeClass('putted');

                }

            },
            _checkPutInWindow = function() {

                var heightWin = _window.height(),
                    heightSite = $('.site').height();

                if( heightSite <= heightWin ) {

                    _obj.addClass('putted-all');

                } else {

                    _obj.removeClass('putted-all');

                }

            },
            _animationElems = function ( startPoint, endPoint, scrollPoint ) {

                var segment = endPoint - startPoint;

                _hand.each( function () {

                    var curElem = $( this ),
                        rotateStart = curElem.data('rotate-start'),
                        rotateFinish = curElem.data('rotate-finish'),
                        kofRotate = rotateStart + ( rotateFinish - rotateStart ) / segment * ( _window.scrollTop() - startPoint );

                    if ( scrollPoint == 1 ) {

                        curElem.css( {
                            '-webkit-transform': 'rotate( '+ ( -rotateFinish ) +'deg )',
                            'transform': 'rotate( '+ ( -rotateFinish ) +'deg )'
                        } );

                        //_obj.removeClass('putted');

                    } else if ( scrollPoint == 0 ) {


                        curElem.css( {
                            '-webkit-transform': 'rotate( '+ ( -rotateStart ) +'deg )',
                            'transform': 'rotate( '+ ( -rotateStart ) +'deg )'
                        } );

                        //_obj.removeClass('putted');


                    } else {

                        curElem.css( {
                            '-webkit-transform': 'rotate( '+ ( -kofRotate )+'deg )',
                            'transform': 'rotate( '+ ( -kofRotate ) +'deg )'
                        } );

                    }
                } );

            },
            _init = function () {

                _obj[0].obj = _self;
                _addEvents();
                _checkGetInWindow();
                _checkPutInWindow();

            };

        _init();
    };

    var ContentFullHeight = function ( obj ) {

        var _self = this,
            _obj = obj,
            _window = $(window),
            _header = $('.site__header');

        var _addEvents = function () {

                _window.on( {
                    resize: function() {
                        _setHeight();
                    }
                } );

            },
            _setHeight = function() {

                var headerHeigth = _header.height();

                _obj.height( _window.height() - headerHeigth );
                _obj.css( {
                    'min-height': _obj.find('>div:first').height()
                } );
            },
            _init = function() {
                _obj[0].obj = _self;
                _addEvents();
                _setHeight();
            };

        _init();
    };

    var PlansChooseHeight = function ( obj ) {

        var _self = this,
            _obj = obj,
            _window = $(window),
            _caption = _obj.find('.plans__list_caption'),
            _content = _obj.find('.plans__list-row:not(.plans__list_caption)'),
            _captionHeights = [],
            _contentHeights = [];

        var _addEvents = function () {

                _window.on( {
                    load: function() {

                        if( _window.width() >= 1024 ) {

                            _setHeight();

                        }

                    },
                    resize: function() {

                        if( _window.width() < 1024 ) {

                            _caption.css( {
                                height: ''
                            } );
                            _content.css( {
                                height: ''
                            } );

                        } else {

                            _setHeight();

                        }

                    }
                } );

            },
            _setHeight = function() {
                _captionHeights = [];
                _contentHeights = [];

                _caption.each( function() {

                    var height = $(this).innerHeight();

                    _captionHeights.push( height );

                } );

                var maxHeightCaption = Math.max.apply(Math, _captionHeights);


                _content.each( function() {

                    var height = $(this).innerHeight();

                    _contentHeights.push( height );

                } );

                var maxHeightContent = Math.max.apply(Math, _contentHeights);

                _caption.innerHeight( maxHeightCaption );
                _content.innerHeight( maxHeightContent );

            },
            _init = function() {
                _obj[0].obj = _self;
                _addEvents();
            };

        _init();
    };

    var Menu = function (obj) {

        //private properties
        var _self = this,
            _obj = obj,
            _window = $( window),
            _menuBtn = _obj.find('.site__header__btn'),
            _menuItems = _obj.find('.site__header-menu'),
            _html = $('html');

        //private methods
        var _closeMenu = function() {

                _obj.removeClass( 'opened' );

                _html.css( {
                    'overflow-y': 'auto'
                } );

                _menuItems.attr( 'style', '' );

            },
            _onEvents = function () {

                _window.on( {
                    scroll: function () {

                        if( _window.scrollTop() > 0 ) {

                            _obj.addClass('fixed');

                        } else {

                            _obj.removeClass('fixed');

                        }
                    },
                    resize: function() {



                    }

                } );

                _menuBtn.on( {

                    click: function () {

                        if( _obj.hasClass( 'opened' ) ) {

                            _closeMenu();


                        } else {

                            _openMenu();

                        }

                        return false;

                    }

                } );

            },
            _openMenu = function() {

                _obj.addClass( 'opened' );

                _html.css( {
                    'overflow-y': 'hidden'
                } );

            },
            _init = function () {

                _onEvents();
                _obj[0].obj = _self;

                if( _window.scrollTop() > _obj.innerHeight()/2 ) {

                    _obj.addClass('fixed');

                } else {

                    _obj.removeClass('fixed');

                }

            };


        _init();
    };

    var Popup = function( obj ){

        //private properties
        var _self = this,
            _popupPadding = 40,
            _btnShow =  $( '.popup__open' ),
            _obj = obj,
            _btnClose = _obj.find( '.popup__close, .popup__cancel' ),
            _wrap = _obj.find( '.popup__wrap' ),
            _contents = _obj.find( '.popup__content' ),
            _scrollConteiner = $( 'html' ),
            _window = $( window ),
            _timer = setTimeout( function(){}, 1 );

        //private methods
        var _centerWrap = function(){
                if ( _window.height() - ( _popupPadding * 2 ) - _wrap.height() > 0 ) {
                    _wrap.css( { top: ( ( _window.height() - ( _popupPadding * 2 ) ) - _wrap.height() ) / 2 } );
                } else {
                    _wrap.css( { top: 0 } );
                }
            },
            _getScrollWidth = function (){
                var scrollDiv = document.createElement( 'div'),
                    scrollBarWidth;

                scrollDiv.className = 'popup__scrollbar-measure';

                document.body.appendChild( scrollDiv );

                scrollBarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;

                document.body.removeChild(scrollDiv);

                return scrollBarWidth;
            },
            _hide = function(){
                _obj.css( {
                    overflowY: 'hidden'
                } );
                _scrollConteiner.css( {
                    overflowY: 'auto',
                    paddingRight: 0
                } );

                _obj.removeClass( 'popup_opened' );
                _obj.addClass( 'popup_hide' );

                _timer = setTimeout( function(){

                    _obj.css ({
                        overflowY: 'auto'
                    });

                    _obj.removeClass( 'popup_hide' );
                }, 300 );

            },
            _init = function(){
                _obj[ 0 ].obj = _self;
                _onEvents();
            },
            _onEvents = function(){
                _window.on( {
                    resize: function(){
                        _centerWrap();
                    }
                } );
                _btnShow.on( {
                    click: function(){
                        _show( $( this ).attr( 'data-popup' ) );
                        return false;
                    }
                } );
                _wrap.on( {
                    click: function( e ){
                        e.stopPropagation();
                    }
                } );
                _obj.on( {
                    click: function(){
                        _hide();
                        return false;
                    }
                } );
                _btnClose.on( {
                    click: function(){
                        _hide();
                        return false;
                    }
                } );
            },
            _show = function( className ){
                _setPopupContent( className );

                _scrollConteiner.css( {
                    overflowY: 'hidden',
                    paddingRight: _getScrollWidth()
                } );
                _obj.addClass( 'popup_opened' );
                _centerWrap();

            },
            _setPopupContent = function( className ){
                var curContent = _contents.filter( '.popup__' + className );

                _contents.css( { display: 'none' } );
                curContent.css( { display: 'block' } );
            };

        //public properties

        //public methods


        _init();
    };

} )();
