ContactManager.module('ContactsApp.Edit', function(Edit, ContactManager, Backbone, Marionette, $, _){
    Edit.Contact = ContactManager.ContactsApp.Common.Views.Form.extend({
        
        initialize: function(){
            this.title = 'edit ' + this.model.get('firstName');
            this.title += ' ' + this.model.get('lastName');
        },
    });
});