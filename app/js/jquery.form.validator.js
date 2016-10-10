( function() {

    $( function() {
        'use strict';

        $.each( $('.order__place'), function () {

            new FormValidator( $(this) );

        } );


    } );

    var FormValidator = function (obj) {

        //private properties
        var _self = this,
            _obj = obj,
            _form =  _obj.find('form'),
            _fieldsRequired = _obj.find('input[data-required="required"], textarea[data-required="required"], input[aria-required="true"], textarea[aria-required="true"]'),
            _validField = _obj.find('input[data-validation="valid"]');

        //private methods
        var
            _constructor = function () {
                _onEvents();
                _obj[0].obj = _self;
            },
            _addNotTouchedClass = function () {

                _fieldsRequired.each( function() {

                    if( $(this).val() === '' ){

                        $(this).addClass( 'not-touched' );

                    }

                } );
                _validField.each( function () {

                    _validateField( $( this ) );

                } );

            },
            _onEvents = function () {

                _form.on( {
                    submit: function( ) {

                        _addNotTouchedClass();

                        if( _fieldsRequired.hasClass('not-touched') ) {

                            _obj.find('.not-touched:first').focus();

                            return false;


                        } if( _validField.hasClass('not-valid') ) {

                            _obj.find('.not-valid:first').focus();

                            return false;


                        } else {

                            return true;

                        }

                    }

                } );
                _fieldsRequired.on( {
                    keypress: function() {

                        $(this).removeClass( 'not-touched' );

                    }
                } );

                _validField.on( {
                    keyup: function() {

                        _validateField( $( this ) );
                    }
                } );

            },
            _makeNotValid = function ( field ) {
                field.addClass( 'not-valid' );
                field.removeClass( 'valid' );
            },
            _makeValid = function ( field ) {
                field.removeClass( 'not-valid' );
                field.addClass( 'valid' );
            },
            _validateEmail = function ( email ) {
                var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(email);
            },
            _validatePhone = function ( phone ) {
                var re = /^(?:\(\d{3}\)|\d{3})[- ]?\d{3}[- ]?\d{4}$/;
                return re.test(phone);
            },
            _validateField = function ( field, e ) {

                var type = field.attr( 'type'),
                    className = field.attr( 'class');

                //if( type === 'email' || type === 'text' ){
                //
                //    if( field.val() === '' ){
                //        _makeNotValid( field );
                //        return false;
                //    }
                //
                //}

                if( type === 'email' ){
                    if( !_validateEmail( field.val() ) ){
                        _makeNotValid( field );
                        return false;
                    }
                }

                //if( className.indexOf('site__input_phone') + 1 ){
                //
                //    if( field.val() != '' ) {
                //
                //        if( !_validatePhone( field.val() ) ){
                //            _makeNotValid( field );
                //            return false;
                //        }
                //
                //    }
                //
                //}

                _makeValid( field );

            };

        //public properties

        //public methods
        _self.checkValid = function () {
            var valid = true;

            _fields.each( function () {
                $( this ).removeClass( 'not-touched' );
                if( $( this ).hasClass( 'not-valid' ) ){
                    valid = false;

                }
            } );

            return valid;
        };

        _constructor();
    };

} )();


