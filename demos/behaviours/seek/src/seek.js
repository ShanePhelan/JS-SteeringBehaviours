/**
 * Created with IntelliJ IDEA.
 * User: shanephelan
 * Date: 01/02/2014
 * Time: 12:22
 * To change this template use File | Settings | File Templates.
 */
(function(seek, soma) {

    'use strict'

    var SeekDemo = soma.Application.extend({
        constructor: function(element) {
            this.element = element;
            soma.Application.call(this);
        },
        init: function() {
            // mapping rules
            this.injector.mapClass('timer', seek.TimerModel, true);
//            this.injector.mapClass('face', clock.FaceView);
//            this.injector.mapClass('needleSeconds', clock.NeedleSeconds);
//            this.injector.mapClass('needleMinutes', clock.NeedleMinutes);
//            this.injector.mapClass('needleHours', clock.NeedleHours);
//            // seek mediator
            this.mediators.create(seek.SeekMediator, this.element.querySelector('.display'));
//            // clock selector template
//            this.createTemplate(clock.SelectorView, this.element.querySelector('.clock-selector'));
        },
        start: function() {
            this.dispatcher.dispatch('create', seek.View);
        }
    });

    var seekDemo = new SeekDemo(document.querySelector('.seek-app'));
})(window.seek = window.seek || {}, soma);
