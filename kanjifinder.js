kanji = new Meteor.Collection("kanji");

var characters = Array();



if (Meteor.isClient) {
  Session.set("q",characters);
  Template.kanjifinder.kanjicharacters = function () {
    if (Session.get("q")[0] === "*") {
      return kanji.find({},{sort: {cardid: 1}});
    }
    else
    {
      return kanji.find({kanji: {$in:Session.get("q")}}, {sort: {cardid: 1}});
    }
  };

  SetCharacters = function() {
    Session.set("q", document.getElementById("txtQuery").value.split(""));
  }

  Template.kanjifinder.events({
    'click input.btnOK': function () {
      SetCharacters();
    },
    'keydown input.txtQuery': function (evt) {
      if (evt.which === 13) {
        SetCharacters();
      }
    }
  });

  Handlebars.registerHelper('cardsetFormatter', function(volume) {
    var volnum = volume.charAt(volume.length-1);
    var result = '<td class="' + 'vol' + volnum + '">' + volume + '</td>';
    return new Handlebars.SafeString(result);
  });

}
if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
