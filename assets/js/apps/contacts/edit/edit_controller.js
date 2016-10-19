ContactManager.module('ContactsApp.Edit', function(Edit, ContactManager, Backbone, Marionette, $, _){
    Edit.Controller = {
        editContact: function(id) {
            var loadingView = new ContactManager.Common.Views.Loading({
                title: 'Artificial loading Delay',
                message: 'Data loading is delayed to demonstrate using a loading view.'
            });

            ContactManager.mainRegion.show(loadingView);

            var promise = ContactManager.request('contact:entity', id);
            promise.then(function(contact){
                var view;
                if(contact !== undefined){
                    view = new Edit.Contact({
                        model: contact,
                        generateTitle: true
                    });

                    view.on('form:submit', function(data){
                        if(contact.save(data)){
                            ContactManager.trigger('contact:show', contact.get('id'));   
                        } else {
                            view.triggerMethod('form:data:invalid', contact.validationError);
                        }                             
                    });
                } else {
                    view = new ContactManager.ContactsApp.MissingContact();
                }

                ContactManager.mainRegion.show(view);
            });
        }
    }
});