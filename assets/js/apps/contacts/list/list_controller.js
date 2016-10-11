ContactManager.module('ContactsApp.List', function(List, ContactManager, Backbone, Marionette, $, _){
  List.Controller = {
    listContacts: function(){
      var loadingView = new ContactManager.Common.Views.Loading();
      ContactManager.mainRegion.show(loadingView);
      
      var  promise = ContactManager.request('contact:entities');
      promise.then(function(contacts){
        var contactListView = new List.Contacts({
          collection: contacts
        });

        contactListView.on('childview:contact:delete', function(childview, model){
          model.destroy();
        });

        contactListView.on('childview:contact:show', function(childView, model){
          ContactManager.trigger('contact:show', model.get('id'));
        });
        
        ContactManager.mainRegion.show(contactListView);
      });
          
    }
  }
});