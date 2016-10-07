ContactManager.module('ContactsApp.List', function(List, ContactManager, Backbone, Marionette, $, _){
  List.Contact = Marionette.ItemView.extend({
        tagName: 'tr',
        template: "#contact-list-item",

        events: {
          'click td a.js-show': 'showClicked',
          'click button.js-delete': 'deleteClicked' 
        },

        showClicked: function(e){
          e.preventDefault();
          this.trigger('contact:show', this.model);
        },
        
        deleteClicked: function(){
            this.trigger('contact:delete', this.model);
        },

        remove: function(){
          var self = this;
          this.$el.fadeOut(function(){
            Marionette.ItemView.prototype.remove.call(self);
          });
        }  
      });

      List.Contacts = Marionette.CompositeView.extend({
        tagName: 'table',
        className: 'table table-hover',
        template: '#contact-list',
        childView: List.Contact,
        childViewContainer: 'tbody',
        
      });
});