itemColl = new Meteor.Collection('itemColl');


if (Meteor.isClient) {
var sub;

  Template.nameSelection.events({
    'change select':function(e,templ){
      var currentName = e.target.value;
      if(sub){
        sub.stop();
      }
      sub = Meteor.subscribe('itemColl',currentName);
    }
  });
  Template.mainTemplate.items = function(){
    return itemColl.find();
  }

}

if (Meteor.isServer) {

  Meteor.startup(function() {

    if (itemColl.find().count() == 0) {
      itemColl.insert({
        owner:'nico',
        name: 'stylo'
      });
      itemColl.insert({
        owner:'nico',
        name: 'bouteille'
      });
      itemColl.insert({
        owner:'marie',
        name: 'livre'
      });
    }
  });

  Meteor.publish('itemColl', function(name) {
    return itemColl.find({owner:name});
  })

}