ContactManager.module("Entities", function(Entities, ContactManager,
Backbone, Marionette, $, _){
    Entities.Header = Backbone.Model.extend({
        initialize: function(){
            Backbone.Select.Me.applyTo(this); 
        }
    });

    Entities.HeaderCollection = Backbone.Collection.extend({
        model: Entities.Header,

        initialize: function(models, options){
            Backbone.Select.One.applyTo(this, models, options);
        } 
    });

    var initializeHeaders = function(){
        Entities.headers = new Entities.HeaderCollection([
            { name: "Contacts", url: "contacts" },
            { name: "About", url: "about"}
        ]);
    };

    var API = {
        getHeaders: function(){
            if(Entities.headers === undefined){
                initializeHeaders();
            }
                return Entities.headers;
            
        }
    };

    ContactManager.reqres.setHandler('header:entities', function(){
        return API.getHeaders();
    });
});