Session.setDefault('serverUrl', "---");
Session.setDefault('apiResponse', false);



Meteor.startup(function(){
  console.log('Meteor.absoluteUrl: ', Meteor.absoluteUrl());
  Session.set('serverUrl', Meteor.absoluteUrl());
});

Router.configure({
  layoutTemplate: 'appLayout'
});



//----------------------------------------------------------
// MAIN PAGE


Template.homePage.events({
  'click #listButton':function(){
    console.count('click #listButton');
    //var newRecordId = Math.random().toString(36).slice(2,26);
    //HTTP.call("GET", Session.get('serverUrl') + '/api/', function(error, result){
    HTTP.call("GET", Session.get('serverUrl') + 'api/', function(error, result){
      if(result){
        console.log(result);
        Session.set('apiResponse', result.content);
      }
      if(error){
        console.error(error);
      }
    });
  },
  'click #createButton':function(){
    console.count('click #createButton');

    var dataObject = {data:
      {title: $("#titleInput").val(),
       text: $("#textInput").val()
      }
    };
    //HTTP.call("POST", Session.get('serverUrl') + '/api/', dataObject, function(error, result){
    HTTP.call("POST", Session.get('serverUrl') + 'api/', dataObject, function(error, result){
      if(result){
        console.log(result);
        Session.set('apiResponse', result.content, true, 2);
      }
      if(error){
        console.error(error);
      }
    });
  },
  'click #readButton':function(){
    console.count('click #readButton');
    //var newRecordId = Math.random().toString(36).slice(2,26);
    var newRecordId = $('#findRecordByIdInput').val();
    //HTTP.call("GET", Session.get('serverUrl') + '/api/' + newRecordId, function(error, result){
    HTTP.call("GET", Session.get('serverUrl') + 'api/' + newRecordId, function(error, result){
      if(result){
        console.log(result);
        Session.set('apiResponse', result.content, true, 2);
      }
      if(error){
        console.error(error);
      }
    });
  },
  'click #updateButton':function(){
    console.count('click #updateButton');
    //var newRecordId = Math.random().toString(36).slice(2,26);
    var newRecordId = $('#updateRecordByIdInput').val();

    var updatedObject = {data:
      {title: $("#titleUpdateInput").val(),
        text: $("#textUpdateInput").val()
      }
    };

    //HTTP.call("PUT", Session.get('serverUrl') + '/api/' + newRecordId, updatedObject, function(error, result){
    HTTP.call("PUT", Session.get('serverUrl') + 'api/' + newRecordId, updatedObject, function(error, result){
      if(result){
        console.log(result);
        Session.set('apiResponse', result.content, true, 2);
      }
      if(error){
        console.error(error);
      }
    });
  },
  'click #deleteButton':function(){
    console.count('click #deleteButton');
    //var newRecordId = Math.random().toString(36).slice(2,26);
    var newRecordId = $('#deleteRecordByIdInput').val();
    //HTTP.call("DELETE", Session.get('serverUrl') + '/api/'  + newRecordId, function(error, result){
    HTTP.call("DELETE", Session.get('serverUrl') + 'api/'  + newRecordId, function(error, result){
      if(result){
        console.log(result);
        Session.set('apiResponse', result.content, true, 2);
      }
      if(error){
        console.error(error);
      }
    });
  }
});

Template.homePage.getServerAddress = function(){
  if(Session.get('serverUrl')){
    return Session.get('serverUrl');
  }else{
    return "---";
  }
}




//----------------------------------------------------------
// REST API CARD

Session.setDefault('selectedPanel', 5);

Template.restApi.events({
  'click #firstPanelTab':function(){
    Session.set('apiResponse', false);
    Session.set('selectedPanel', 1);
  },
  'click #secondPanelTab':function(){
    Session.set('apiResponse', false);
    Session.set('selectedPanel', 2);
  },
  'click #thirdPanelTab':function(){
    Session.set('apiResponse', false);
    Session.set('selectedPanel', 3);
  },
  'click #fourthPanelTab':function(){
    Session.set('apiResponse', false);
    Session.set('selectedPanel', 4);
  },
  'click #fifthPanelTab':function(){
    Session.set('apiResponse', false);
    Session.set('selectedPanel', 5);
  }
});


Template.restApi.helpers({
  firstContentPanelActive: function(){
    if(Session.get('selectedPanel') === 1){
      return "active panel-tab";
    }else{
      return "panel-tab";
    }
  },
  secondContentPanelActive: function () {
    if(Session.get('selectedPanel') === 2){
      return "active panel-tab";
    }else{
      return "panel-tab";
    }
  },
  thirdContentPanelActive: function () {
    if(Session.get('selectedPanel') === 3){
      return "active panel-tab";
    }else{
      return "panel-tab";
    }
  },
  fourthContentPanelActive: function () {
    if(Session.get('selectedPanel') === 4){
      return "active panel-tab";
    }else{
      return "panel-tab";
    }
  },
  fifthContentPanelActive: function () {
    if(Session.get('selectedPanel') === 5){
      return "active panel-tab";
    }else{
      return "panel-tab";
    }
  },
  firstContentPanelVisibility: function () {
    if(Session.get('selectedPanel') === 1){
      return "visible";
    }else{
      return "hidden";
    }
  },
  secondContentPanelVisibility: function () {
    if(Session.get('selectedPanel') === 2){
      return "visible";
    }else{
      return "hidden";
    }
  },
  thirdContentPanelVisibility: function () {
    if(Session.get('selectedPanel') === 3){
      return "visible";
    }else{
      return "hidden";
    }
  },
  fourthContentPanelVisibility: function () {
    if(Session.get('selectedPanel') === 4){
      return "visible";
    }else{
      return "hidden";
    }
  },
  fifthContentPanelVisibility: function () {
    if(Session.get('selectedPanel') === 5){
      return "visible";
    }else{
      return "hidden";
    }
  },
  getCurrentPanel: function () {
    return Session.get('selectedPanel');
  },
  displayResponse: function () {
    return Session.get('apiResponse');
  },
  isResponseVisible: function () {
    if(Session.get('apiResponse')){
      return true;
    }else{
      return false;
    }
  },
  isInterfacePanelVisible: function () {
    if(Session.get('isInterfacePanelVisible')){
      return "hidden";
    }else{
      return "visible";
    }
  }
});








//----------------------------------------------------------
// REST API STATISTICS

Template.restStats.helpers({
  getConfigurationRecord: function(){
    return Statistics.findOne({_id: 'configuration'});
  },
  getRootCount: function () {
    return this.total_count;
  },
  getGetCount: function () {
    return this.get_count;
  },
  getListCount: function () {
    return this.list_count;
  },
  getInsertCount: function () {
    return this.insert_count;
  },
  getUpdateCount: function () {
    return this.update_count;
  },
  getDeleteCount: function () {
    return this.delete_count;
  },
  isStatisticsPanelVisible: function () {
    if(Session.get('isStatisticsPanelVisible')){
      return "hidden";
    }else{
      return "visible";
    }
  }
});


//----------------------------------------------------------
// DATABASE COLLECTION

Template.databaseCollection.helpers({
  postsList: function(){
    return Posts.find();
  },
  isDatabasePanelVisible: function () {
    if(Session.get('isDatabasePanelVisible')){
      return "hidden";
    }else{
      return "visible";
    }
  }
});
