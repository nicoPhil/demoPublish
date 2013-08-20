itemColl = new Meteor.Collection('itemColl');

if (Meteor.isClient) {

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
}