ContactManager.module('ContactsApp.List', function(List, ContactManager, Backbone, Marionette, $, _){
  List.Controller = {
    listContacts: function(criterion){
      var loadingView = new ContactManager.Common.Views.Loading();
      ContactManager.mainRegion.show(loadingView);
      
      var  promise = ContactManager.request('contact:entities');
      
      var contactListLayout = new List.Layout();
      var contactsListPanel = new List.Panel();
      
      promise.then(function(contacts){
        var filteredContacts = ContactManager.Entities.FilteredCollection({
          collection: contacts,
          filterFunction: function(filterCriterion){
             var criterion = filterCriterion.toLowerCase();
             return function(contact){
              if(contact.get("firstName").toLowerCase().indexOf(criterion) !== -1 
                || contact.get("lastName").toLowerCase().indexOf(criterion) !== -1
                || contact.get("phoneNumber").toLowerCase().indexOf(criterion) !== -1){

                  return contact;
                }          
             } 
          }
        });

        if(criterion){
          filteredContacts.filter(criterion);
          contactsListPanel.once("show", function(){
            contactsListPanel.triggerMethod("set:filter:criterion", criterion)
          });
        }
        
        var contactListView = new List.Contacts({
          collection: filteredContacts
        });

        contactsListPanel.on("contacts:filter", function(filterCriterion){
          filteredContacts.filter(filterCriterion);
          ContactManager.trigger("contacts:filter", filterCriterion);
        });
        
        contactListLayout.on('show', function(){
          contactListLayout.panelRegion.show(contactsListPanel);
          contactListLayout.contactsRegion.show(contactListView);
        });

        contactsListPanel.on('contact:new', function(){
          var newContact = new ContactManager.Entities.Contact();

          var view = new ContactManager.ContactsApp.New.Contact({
            model: newContact
          });

          view.on('form:submit', function(data){
            var highestId = contacts.max(function(c){
              return c.id;
            });
            highestId = highestId.get('id');
            data.id = highestId + 1;

            if(newContact.save(data)){
              contacts.add(newContact);
              view.trigger('dialog:close');
              
              var newContactView = contactListView.children.findByModel(newContact);
              
              if(newContactView){
                newContactView.flash('success');
              }
            } else {
              view.triggerMethod('form:data:invalid', newContact.validationErrors);
            }
          });

          ContactManager.dialogRegion.show(view);
        });

        contactListView.on('childview:contact:delete', function(childview, model){
          model.destroy();
        });

        contactListView.on('childview:contact:show', function(childView, model){
          ContactManager.trigger('contact:show', model.get('id'));
        });

        contactListView.on('childview:contact:edit', function(childView, model){
          var view = new ContactManager.ContactsApp.Edit.Contact({
            model: model
          });
          
          view.on('form:submit', function(data){
            if(model.save(data)){
              childView.render();
              view.trigger('dialog:close');
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