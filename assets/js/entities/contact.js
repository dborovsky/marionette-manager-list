ContactManager.module('Entities', function(Entities, ContactManager, Backbone, Marionette, $, _) {
  Entities.Contact = Backbone.Model.extend({
    urlRoot: 'contacts',
    
    defaults: {
      firstName: '',
      lastName: '',
      phoneNumber: ''
    },

    validate: function(attr, options){
      var errors = {};
      
      if(!attr.firstName){
        errors.firstName = 'can\`t be blank';
      }
      if(!attr.lastName){
        errors.lastName = 'can\`t be blank';
      } 
          
      if(attr.lastName.length < 2){
        errors.lastName = 'is too short';
      }
      
      if(!_.isEmpty(errors)){
        return errors;
      }  
    }
  });

  Entities.configureStorage("ContactManager.Entities.Contact");

  Entities.ContactCollection = Backbone.Collection.extend({
    url: 'contacts',
    model: Entities.Contact,
    comparator: function(contact){
      return contact.get('firstName') + " " + contact.get('lastName');
    }
  });

  Entities.configureStorage("ContactManager.Entities.ContactCollection");

  var contacts;

  var initializeContacts = function(){
    contacts = new Entities.ContactCollection([
      {id: 1, firstName: 'Alice', lastName: 'Arten', phoneNumber: 555-666},
      {id: 2, firstName: 'Bob', lastName: 'Brigham', phoneNumber: 555-777},
      {id: 3, firstName: 'Charlie', lastName: 'Campbel', phoneNumber: 555-888}
    ]);

    contacts.forEach(function(contact){
      contact.save();
    });

    return contacts;
  };

  var API = {
    getContactEntities: function(){
      var contacts = new Entities.ContactCollection();
      var promise = new Promise(function(resolve){
          contacts.fetch({
              success: function(data){
                  resolve(data);
              }
          });
      });
      
      return promise.then(function(contacts){
        if(contacts.length === 0) {
            return initializeContacts();
        }
        else {
            return contacts;
        }
      });
    },

    getContactEntity: function(contactId){
      var contact = new Entities.Contact({ id: contactId });
      return new Promise(function(resolve){
        setTimeout(function(){
          contact.fetch({
            success: function(data){
              resolve(data);
            },
            error: function(){
              resolve(undefined);
            }
          });
        }, 2000);
      })
        
    }
  };

  ContactManager.reqres.setHandler('contact:entities', function(){
    return API.getContactEntities();
  });

  ContactManager.reqres.setHandler('contact:entity', function(id){
    return API.getContactEntity(id);
  });  
});