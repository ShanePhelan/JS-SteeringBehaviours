/**
 * Created with IntelliJ IDEA.
 * User: shanephelan
 * Date: 05/02/2014
 * Time: 21:20
 * To change this template use File | Settings | File Templates.
 */
(function(demo, soma) {

    'use strict'

    var WanderDemo = soma.Application.extend({
        constructor: function(element) {
            this.element = element;
            soma.Application.call(this);
        },
        init: function() {
            // mapping rules
            this.injector.mapClass('timer', demo.TimerModel, true);
//            // seek mediator
            this.mediators.create(demo.DemoMediator, this.element.querySelector('.display'));
//            // clock selector template
//            this.createTemplate(clock.SelectorView, this.element.querySelector('.clock-selector'));
        },
        start: function() {
            this.dispatcher.dispatch('create', demo.View);
        }
    });

    var wanderDemo = new WanderDemo(document.querySelector('.seek-app'));
})(window.demo = window.demo || {}, soma);
