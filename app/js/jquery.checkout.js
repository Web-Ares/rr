"use strict";
( function() {

    $( function() {

        $.each( $('.choose-data'), function () {

            new ChooseData( $(this) );

        } );

        $.each( $('.order'), function () {

            new PasteData( $(this) );

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
            _dataCheckbox = {};

        //private methods
        var _addEvents = function () {

                _input.on( {
                    click: function() {

                        _getData( $(this) );
                        _writeInSessionStorage();

                    }
                } );

                _redirectBtn.on( {
                    click: function() {

                        var curItem = $(this),
                            dataSrc = curItem.data('src');

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

                } else if( curItem.attr('type') === 'checkbox' ) {

                    if (curItem.is(":checked")) {

                        _dataCheckbox[curItem.attr('name')] = curItem.attr('value');

                    } else {

                        delete _dataCheckbox[curItem.attr('name')];

                    }


                }

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

                } );

                _writeInSessionStorage();

            },
            _writeInSessionStorage = function() {

                localStorage.setItem('radioChoose', JSON.stringify(_dataRadio));
                localStorage.setItem('checkboxChoose', JSON.stringify(_dataCheckbox));

            },
            _init = function () {

                _obj[0].obj = _self;
                _addEvents();
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
            _input = _obj.find('input[type="hidden"]'),
            _arr = [],
            _arr1 = [];

        //private methods
        var _addEvents = function () {



            },
            _writeInBlock = function() {

                var divRate = '',
                    num = '',
                    arr = [];

                for( var key in _dataRadio  ) {

                    var item = _dataRadio[ key ];

                }

                if( _dataRadio.ratePlan != undefined ) {

                    $.each( _dataRadio.ratePlan, function() {

                        var value = _dataRadio.ratePlan.value.split(' ');

                        if( _dataRadio.ratePlan.sessionType === 'session pricing' ) {

                            divRate = '<span>'+ _dataRadio.ratePlan.sessionType +' ( '+ value[0] +' sessions )</span>';

                        } else if( _dataRadio.ratePlan.sessionType === 'minute pricing' ) {

                            divRate = '<span>'+ _dataRadio.ratePlan.sessionType +' ( '+ value[0] +' minutes ( ' + value[2] + '/minute )</span>';

                        }


                    } );

                }

                for( var key1 in _dataCheckbox  ) {

                    var item1 = _dataRadio[ key1];
                    arr.push(key1)

                }



                if( arr.length > 0 ) {

                    if( arr.length == 1 ) {

                        num = '+ ' + arr.length + ' service';

                    } else {

                        num = '+ ' + arr.length + ' service';

                    }

                }

                _chosenData.html('You chose ' + divRate + ', ' + item + ' ' + num + ').');

                _input.val( _arr );

            },
            _writeInSearch = function() {

                _arr = [];

                _arr.push(  ' ' + _dataRadio );
                _arr.push(  ' ' + _dataCheckbox );

                _input.val( _arr );

            },
            _getSessionData = function() {

                if( localStorage.radioChoose != undefined ) {

                    _dataRadio = JSON.parse( localStorage.radioChoose );
                    _dataCheckbox = JSON.parse( localStorage.checkboxChoose );

                    _writeInSearch();
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

} )();