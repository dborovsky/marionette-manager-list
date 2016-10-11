ContactManager.module('ContactsApp.List', function(List, ContactManager, Backbone, Marionette, $, _){
  List.Controller = {
    listContacts: function(){
      var loadingView = new ContactManager.Common.Views.Loading();
      ContactManager.mainRegion.show(loadingView);
      
      var  promise = ContactManager.request('contact:entities');
      
      var contactListLayout = new List.Layout();
      var contactsListPanel = new List.Panel();
      
      promise.then(function(contacts){
        var contactListView = new List.Contacts({
          collection: contacts
        });

        contactListLayout.on('show', function(){
          contactListLayout.panelRegion.show(contactsListPanel);
          contactListLayout.contactsRegion.show(contactListView);
        });

        contactListView.on('childview:contact:delete', function(childview, model){
          model.destroy();
        });

        contactListView.on('childview:contact:show', function(childView, model){
          ContactManager.trigger('contact:show', model.get('id'));
        });

        contactListView.on('childview:contact:edit', function(childView, model){
          var view = new ContactManager.ContactsApp.Edit.Contact({
            model: model,
            asModal: true
          });
          
          view.on('form:submit', function(data){
            if(model.save(data)){
              childView.render();
              ContactManager.dialogRegion.reset();
              childView.flash('success');
            }else{
              view.triggerMethod('form:data:invalid', model.validationErrors);
            }
          });

          ContactManager.dialogRegion.show(view);

        });
        
        ContactManager.mainRegion.show(contactListLayout);
      });
          
    }
  }
});