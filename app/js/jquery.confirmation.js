"use strict";
( function() {

    $( function() {

        $.each( $('.confirmation'), function () {

            new PasteData( $(this) );

        } );

    } );

    var PasteData = function (obj) {

        //private properties
        var _self = this,
            _obj = obj,
            _chosenData = _obj.find('.confirmation__data-paste'),
            _dataRadio,
            _dataCheckbox,
            _dataInput,
            _str = '';

        //private methods
        var _writeInBlock = function() {

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

                        item2 = _dataInput[ key2 ] + ' ';

                    } else {

                        item2 = '';

                    }

                }

                if( divRate == '' ) {

                    _chosenData.html('You chose ' + item + item2 + num + '.');

                } else {

                    _chosenData.html('You chose ' + divRate + item + num + ').');

                }

            },
            _getSessionData = function() {

                if( localStorage.radioChoose != undefined ) {

                    _dataRadio = JSON.parse( localStorage.radioChoose );
                    _dataCheckbox = JSON.parse( localStorage.checkboxChoose );
                    _dataInput = JSON.parse( localStorage.inputValue );

                    _writeInBlock();

                } else {

                    window.location.href = $('body').data('src');

                }

            },
            _init = function () {

                _obj[0].obj = _self;
                _getSessionData();
            };

        _init();
    };

} )();
