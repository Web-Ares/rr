"use strict";
( function() {

    $( function() {

        $.each( $('.choose-data'), function () {

            new ChooseData( $(this) );

        } );

        $.each( $('.order'), function () {

            new PasteData( $(this) );

        } );

        $.each( $('.plans'), function () {

            new DatePlan( $(this) );

        } );

    } );

    var ChooseData = function (obj) {

        //private properties
        var _self = this,
            _obj = obj,
            _items = _obj.find('.choose-data__items'),
            _input = _items.find('input'),
            _redirectBtn = _obj.find('.btn_next'),
            _dataRadio = {},
            _dataCheckbox = {},
            _dataInput = {},
            _idItems = {},
            _valueInputItems = {};

        //private methods
        var _addEvents = function () {

                _input.on( {
                    click: function() {

                        if( !($(this).attr('type') === 'text') ) {

                            _getData( $(this) );
                            _writeInSessionStorage();

                            localStorage.setItem('idItems', JSON.stringify(_idItems));

                        }

                    },
                    keyup: function() {

                        if( $(this).attr('type') === 'text' ) {

                            _getData( $(this) );
                            _writeInSessionStorage();

                            localStorage.setItem('idItems', JSON.stringify(_idItems));
                            localStorage.setItem('valueInput', JSON.stringify(_valueInputItems));

                        }

                    }
                } );

                _redirectBtn.on( {
                    click: function() {

                        var curItem = $(this),
                            dataSrc = curItem.data('src');

                        _writeAllId();

                        window.location.href = dataSrc;

                        return false;

                    }
                } );

            },
            _getData = function( elem ) {

                var curItem = elem;

                if( curItem.attr('type') === 'radio' ) {

                    if( curItem.parents('.plans').length ) {

                        _dataRadio.ratePlan = {
                            sessionType: curItem.data('rate'),
                            value: curItem.attr('value')
                        };


                    } else {

                        _dataRadio[curItem.attr('name')] = curItem.attr('value');

                    }

                    _idItems[curItem.attr('name')] = curItem.attr('id');

                } else if( curItem.attr('type') === 'checkbox' ) {

                    if ( curItem.is(":checked") ) {

                        _dataCheckbox[curItem.attr('name')] = curItem.attr('value');
                        _idItems[curItem.attr('name')] = curItem.attr('id');

                    } else {

                        delete _dataCheckbox[curItem.attr('name')];
                        delete _idItems[curItem.attr('name')];

                    }
                } else if( curItem.attr('type') === 'text' ) {

                    if ( curItem.val() != '' ) {

                        _dataInput[curItem.attr('name')] = curItem.val();
                        _idItems[curItem.attr('name')] = curItem.attr('id');
                        _valueInputItems[curItem.attr('id')] = curItem.val();

                    } else {

                        delete _dataInput[curItem.attr('name')];
                        delete _idItems[curItem.attr('name')];
                        delete _valueInputItems[curItem.attr('id')];

                    }
                }

            },
            _setCheckedNeedInput = function() {

                if( localStorage.idItems != undefined ) {

                    _input.each( function() {

                        var curItem = $(this);

                        if( curItem.attr('type') === 'checkbox' ) {

                            curItem.prop('checked', false );

                        } else if( curItem.attr('type') === 'text' ) {

                            curItem.val('');

                        }

                    } );

                    var allId = JSON.parse( localStorage.idItems),

                        valueInput = JSON.parse( localStorage.valueInput );

                    for( var key in allId  ) {

                        var item = allId[ key ];

                        _input.each( function() {

                            var curItem = $(this);

                            curItem.filter('#'+ item +'').prop('checked', true );

                            console.log(item)

                            if( curItem.attr('type') === 'text' ) {

                                for( var key2 in valueInput  ) {

                                    var item1 = valueInput[ key2 ];

                                    curItem.filter('#'+ item +'').val( item1 );
                                }

                            }

                        } );




                    }

                }

            },
            _writeAllId = function() {

                _input.each( function() {

                    var curItem = $(this);

                    if( curItem.is(":checked") ) {

                        if( curItem.attr('type') === 'radio' ) {

                            _idItems[curItem.attr('name')] = curItem.attr('id');

                        } else if( curItem.attr('type') === 'checkbox' ) {

                            if( curItem.is(":checked") ) {

                                _idItems[curItem.attr('name')] = curItem.attr('id');

                            } else {

                                delete _idItems[curItem.attr('name')];

                            }


                        }

                    }

                    if( curItem.attr('type') === 'text' ) {

                        if( curItem.val() != '' ) {

                            _idItems[curItem.attr('name')] = curItem.attr('id');
                            _valueInputItems[curItem.attr('id')] = curItem.val();

                        } else {

                            delete _idItems[curItem.attr('name')];
                            delete _valueInputItems[curItem.attr('id')];

                        }

                        localStorage.setItem('valueInput', JSON.stringify(_valueInputItems));

                    }

                } );

                localStorage.setItem('idItems', JSON.stringify(_idItems));


            },
            _writeDataInObjAfterLoad = function() {

                _input.each( function() {

                    var curItem = $(this);

                    if( curItem.is(":checked") ) {

                        if( curItem.attr('type') === 'radio' ) {

                            if( curItem.parents('.plans').length ) {

                                _dataRadio.ratePlan = {
                                    sessionType: curItem.data('rate'),
                                    value: curItem.attr('value')
                                };

                            } else {

                                _dataRadio[curItem.attr('name')] = curItem.attr('value');

                            }

                        } else if( curItem.attr('type') === 'checkbox' ) {

                            if( curItem.is(":checked") ) {

                                _dataCheckbox[curItem.attr('name')] = curItem.attr('value');

                            } else {

                                delete _dataCheckbox[curItem.attr('name')];

                            }


                        }


                    }

                    if( curItem.attr('type') === 'text' ) {

                        if ( curItem.val() != '' ) {

                            _dataInput[curItem.attr('name')] = curItem.val();

                        } else {

                            delete _dataInput[curItem.attr('name')];

                        }
                    }

                } );

                _writeInSessionStorage();
                _writeAllId();

            },
            _writeInSessionStorage = function() {

                localStorage.setItem('radioChoose', JSON.stringify(_dataRadio));
                localStorage.setItem('checkboxChoose', JSON.stringify(_dataCheckbox));
                localStorage.setItem('inputValue', JSON.stringify(_dataInput));

            },
            _init = function () {

                _obj[0].obj = _self;
                _addEvents();
                _setCheckedNeedInput();
                _writeDataInObjAfterLoad();

            };

        _init();
    };

    var PasteData = function (obj) {

        //private properties
        var _self = this,
            _obj = obj,
            _chosenData = _obj.find('.order__chosen-data span'),
            _dataRadio,
            _dataCheckbox,
            _dataInput,
            _input = _obj.find('input#input_1_5'),
            _arr = [],
            _str = '';

        //private methods
        var _addEvents = function () {



            },
            _writeInBlock = function() {

                var divRate = '',
                    num = '',
                    arr = [];

                for( var key in _dataRadio  ) {

                    var item = _dataRadio[ key ] + ', ';

                }

                if( _dataRadio.ratePlan != undefined ) {

                    $.each( _dataRadio.ratePlan, function() {

                        var value = _dataRadio.ratePlan.value.split(' ');

                        if( _dataRadio.ratePlan.sessionType === 'session pricing' ) {

                            divRate = '<span>'+ _dataRadio.ratePlan.sessionType +' ('+ value[0] +' sessions)</span>' + ', ';

                        } else if( _dataRadio.ratePlan.sessionType === 'minute pricing' ) {

                            var minutes = value[0].replace(/[^0-9]+/g,'');

                            if( minutes > 100000 ) {

                                minutes = minutes/1000000 + 'M'

                            }

                            divRate = '<span>'+ _dataRadio.ratePlan.sessionType +' ('+ minutes +' minutes (' + value[2] + '/minute)</span>' + ', ';

                        }


                    } );

                }

                if( divRate == '' ) {

                    divRate = '';

                }

                for( var key1 in _dataCheckbox  ) {

                    arr.push(key1)

                }

                if( arr.length > 0 ) {

                    if( arr.length == 1 ) {

                        num = '+ ' + arr.length + ' service';

                    } else {

                        num = '+ ' + arr.length + ' service';

                    }

                }

                var item2 = '';

                for( var key2 in _dataInput  ) {

                    if (_dataInput.hasOwnProperty(key2)) {

                        item2 = _dataInput[ key2 ]  + ' ';

                    } else {

                        item2 = '';

                    }


                }

                if( divRate == '' ) {

                    _chosenData.html('You chose ' + item + 'ports: ' + item2 + num + '.');

                } else {

                    _chosenData.html('You chose ' + divRate + item + num + ').');

                }

            },
            _writeInHidden = function() {

                _str = '';

                for( var key in _dataRadio  ) {

                    var item = _dataRadio[ key ];

                    if( typeof item === 'string' ) {

                        _str += ''+ item +'; '

                    } else if( typeof item === 'object' ) {

                        for( var key1 in item  ) {

                            var item1 = item[ key1 ];

                            _str += ''+ item1 +'; '

                        }

                    }

                }

                for( var key3 in _dataCheckbox  ) {

                    var item3 = _dataCheckbox[ key3 ];

                    _str += ''+ item3 +'; '

                }

                var item4 = '';

                for( var key4 in _dataInput  ) {

                    if (_dataInput.hasOwnProperty(key4)) {

                        item4 = _dataInput[ key4 ];

                    } else {

                        item4 = '';

                    }

                    _str += ''+ item4 +'; '

                }

                _input.val( _str );

            },
            _getSessionData = function() {

                if( localStorage.radioChoose != undefined ) {

                    _dataRadio = JSON.parse( localStorage.radioChoose );
                    _dataCheckbox = JSON.parse( localStorage.checkboxChoose );
                    _dataInput = JSON.parse( localStorage.inputValue );

                    _writeInHidden();
                    _writeInBlock();

                } else {

                    window.location.href = $('body').data('src');

                }

            },
            _init = function () {

                _obj[0].obj = _self;
                _addEvents();
                _getSessionData();
            };

        _init();
    };

    var DatePlan = function (obj) {

        //private properties
        var _self = this,
            _obj = obj,
            _items = _obj.find('.plans__item'),
            _radio = _obj.find('input[type="radio"]'),
            _window = $(window);

        //private methods
        var _addEvents = function () {

                _window.on( {
                    load: function() {

                        _setActiveClass();

                    }
                } );

                _radio.on( {
                    change: function() {

                        var curItem = $(this),
                            parent = curItem.parents('.plans__item');

                        if( !( parent.hasClass('active') ) ) {

                            _items.removeClass('active');
                            parent.addClass('active');

                        }

                    }
                } );

                _items.on( {
                    click: function() {

                        var curItem = $(this),
                            firstRadio = curItem.find('input[type="radio"]:first');

                        if( !( curItem.hasClass('active') ) ) {

                            _items.removeClass('active');
                            curItem.addClass('active');
                            firstRadio.trigger('click');

                        }

                    }
                } );

            },
            _setActiveClass = function() {

                var activeRadio = _radio.filter(':checked'),
                    parent = activeRadio.parents('.plans__item');

                    parent.addClass('active');

            },
            _init = function () {

                _obj[0].obj = _self;
                _addEvents();
            };

        _init();
    };

} )();
