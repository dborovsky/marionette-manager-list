ContactManager.module('Common.Views', function(Views, ContactManager, Backbone, Marionette, $, _){
    Views.Loading = Marionette.ItemView.extend({
        template: '#loading-view',
        
        initialize: function(options){
            var options = options || {};
            this.title = options.title || 'Loading';
            this.message = options.message || 'Please wait, data is loading';
        },

        serializeData: function(){
            return {
                title: this.title,
                message: this.message
            };
        },
        
        onShow: function(){
            var opts = {
                lines: 13,
                length: 28,
                width: 14,
                radius: 42,
                scale: 1,
                corners: 1,
                color: '#000',
                opacity: 0.25,
                rotate: 0,
                direction: 1,
                speed: 1,
                trail: 60,
                fps: 20,
                zIndex: 2e9,
                className: 'spinner',
                top: '50%',
                left: '50%',
                shadow: false,
                hwaccel: false,
                position: 'absolute'
            };
            $('#spinner').spin(opts);
        }
    });
});