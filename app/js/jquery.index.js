"use strict";
( function() {

    $( function() {

        $.each( $('.learn-more'), function () {

            new ScrollDown( $(this) );

        } );

        $.each( $('.site__anchors'), function () {

            new Anchors( $(this) );

        } );

        $.each( $('.host__offer'), function () {

            new HostOffer( $(this) );

        } );

    } );

    var ScrollDown = function ( obj ) {

        var _self = this,
            _obj = obj,
            _dom = $( 'html, body' ),
            _btnLearnMore = _obj;

        var _addEvents = function () {

                _btnLearnMore.on( {
                    click: function() {

                        _findNeedBlock( $(this) );

                        return false;
                    }
                } );

            },
            _findNeedBlock = function( btn ) {

                var clickBtn = btn,
                    parentBlock = clickBtn.parents('[data-more="true"]'),
                    nextBlock = parentBlock.next(),
                    nextBlockPosition = nextBlock.offset().top;

                _dom.animate( { scrollTop: nextBlockPosition }, 300 );


            },
            _init = function() {
                _obj[0].obj = _self;
                _addEvents();
            };

        _init();
    };

    var Anchors = function ( obj ) {

        var _self = this,
            _obj = obj,
            _dom = $( 'html, body' ),
            _window = $(window),
            _items  = $('[data-anchor="true"]');

        var _addEvents = function () {

                _obj.find('a').on( {
                    click: function() {

                        _findNeedBlock( $(this) );

                        return false;
                    }
                } );

                _window.on( {
                    scroll: function() {

                        _changeActiveAnchors();

                    }
                } );

            },
            _changeActiveAnchors = function() {

                var scrollTop = _window.scrollTop();

                _items.each( function() {

                    var curElem = $(this),
                        curElemIndex = curElem.index(),
                        curElemPos = curElem.offset().top;

                    if( ( ( scrollTop + _window.height()/2 ) >= curElemPos ) && ( ( curElem.innerHeight() + curElemPos ) >= scrollTop + _window.height()/2 )  ) {

                        _obj.find('a').removeClass('active');
                        _obj.find('a').eq(curElemIndex).addClass('active');

                    }

                } );

            },
            _findNeedBlock = function( btn ) {

                var clickBtn = btn,
                    index = clickBtn.index(),
                    needBlock = _items.eq(index),
                    needBlockPosition = needBlock.offset().top;

                _dom.animate( { scrollTop: needBlockPosition }, 300 );


            },
            _init = function() {
                _obj[0].obj = _self;
                _addEvents();
                _changeActiveAnchors();
            };

        _init();
    };

    var HostOffer = function ( obj ) {

        var _self = this,
            _obj = obj,
            _date  = _obj.find('.host__offer-date');

        var _addEvents = function () {

            },
            _setNeededDay = function(  date, dayOfWeek ) {

                var resultDate = new Date( date.getTime() );

                if( ( new Date().getHours() == 17 ) && ( new Date().getMinutes() > 0 ) ) {

                    resultDate.setDate( (date.getDate() + ( 7 + dayOfWeek - date.getDay() ) % 7 ) + 7 );

                } else {

                    resultDate.setDate( date.getDate() + ( 7 + dayOfWeek - date.getDay() ) % 7 );

                }

                _date.html( ''+ (resultDate.getMonth() + 1) +'/'+ (resultDate.getDate()) +'/'+ (resultDate.getFullYear()) +'' );

            },
            _init = function() {
                _obj[0].obj = _self;
                _addEvents();
                _setNeededDay( new Date(), 5 );
            };

        _init();
    };

} )();
