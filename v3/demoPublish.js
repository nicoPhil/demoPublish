itemColl = new Meteor.Collection('itemColl');


if (Meteor.isClient) {
  var sub;

  Template.nameSelection.events({
    'change select': function(e, templ) {
      var currentName = e.target.value;
      if (sub) {
        sub.stop();
      }
      sub = Meteor.subscribe('itemColl', currentName);
      Session.set('currentName', currentName);
    }
  });

  Template.mainTemplate.items = function() {
    return itemColl.find();
  }

  Template.addItem.events({
    'click button': function(e, templ) {
      var itemName = templ.find('input').value;
      var currentName = Session.get('currentName');
      Meteor.call('addItem', currentName, itemName, function(error, id) {
        console.log('inserted elem with id:' + id);
      });
    }
  });

}

if (Meteor.isServer) {

  Meteor.startup(function() {

    if (itemColl.find().count() == 0) {
      itemColl.insert({
        owner: 'nico',
        name: 'stylo'
      });
      itemColl.insert({
        owner: 'nico',
        name: 'bouteille'
      });
      itemColl.insert({
        owner: 'marie',
        name: 'livre'
      });
    }
  });

  Meteor.publish('itemColl', function(name) {
    return itemColl.find({
      owner: name
    });
  })

  Meteor.methods({
    addItem: function(owner, name) {
      var id = itemColl.insert({
        owner: owner,
        name: name
      });
      return id;
    },
  });

}