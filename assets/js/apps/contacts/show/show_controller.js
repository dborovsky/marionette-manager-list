ContactManager.module('ContactsApp.Show', function(Show, ContactManager, Backbone, Marionette, $, _){
    Show.Controller = {
        showContact: function(id){
            var promise = ContactManager.request('contact:entity', id);
            promise.then(function(contact){
                var contactView;
            
                if(contact !== undefined){
                    contactView = new Show.Contact({
                        model: contact
                    });    
                }
                else{
                    contactView = new Show.MissingContact();
                }
                        
                ContactManager.mainRegion.show(contactView);        
            });
        }
    }
});