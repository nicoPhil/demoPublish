itemColl = new Meteor.Collection('itemColl');

if (Meteor.isClient) {
  Meteor.subscribe('itemColl');

  Template.mainTemplate.items = function(){
    return itemColl.find();
  }

}

if (Meteor.isServer) {
  Meteor.startup(function() {

    if (itemColl.find().count() == 0) {
      itemColl.insert({
        name: 'stylo'
      });
      itemColl.insert({
        name: 'bouteille'
      });
      itemColl.insert({
        name: 'livre'
      });
    }
  });

  Meteor.publish('itemColl', function() {
    return itemColl.find();
  })

}