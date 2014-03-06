

Router.configure({
  layoutTemplate: 'mainLayout'
});

Template.mainPage.events({

  'click #rootPanelTile' : function () {
    console.log('rootPanelTile');
  },
  'click #getPanelTile' : function () {
    console.log('getPanelTile');
  },
  'click #listPanelTile' : function () {
    console.log('listPanelTile');
  },
  'click #insertPanelTile' : function () {
    console.log('insertPanelTile');
  },
  'click #updatePanelTile' : function () {
    console.log('updatePanelTile');
  },
  'click #deletePanelTile' : function () {
    console.log('deletePanelTile');
  },


  'click #createButton':function(){
    HTTP.call("POST", Session.get('browser_window_location') + '/api/', {params: {title: "Purple"}}, function(error, result){
      if(result){
        console.log(result);
      }
      if(error){
        console.error(error);
      }
      //done();
    });
  },
  'click #readButton':function(){
    var newRecordId = Math.random().toString(36).slice(2,26);
    HTTP.call("GET", Session.get('browser_window_location') + '/api/' + newRecordId, function(error, result){
      if(result){
        console.log(result);
      }
      if(error){
        console.error(error);
      }
      //done();
    });
  },
  'click #updateButton':function(){
    var newRecordId = Math.random().toString(36).slice(2,26);
    var updatedObject = {
      "name" : "updated name"
    }

    HTTP.call("PUT", Session.get('browser_window_location') + '/api/' + newRecordId, {data: updatedObject}, function(error, result){
      if(result){
        console.log(result);
      }
      if(error){
        console.error(error);
      }
      //done();
    });
  },
  'click #deleteButton':function(){
    var newRecordId = Math.random().toString(36).slice(2,26);
    HTTP.call("DELETE", Session.get('browser_window_location') + '/api/'  + newRecordId, function(error, result){
      if(result){
        console.log(result);
      }
      if(error){
        console.error(error);
      }
      //done();
    });
  },
  'click #listButton':function(){
    var newRecordId = Math.random().toString(36).slice(2,26);
    HTTP.call("GET", Session.get('browser_window_location') + '/api/', function(error, result){
      if(result){
        console.log(result);
      }
      if(error){
        console.error(error);
      }
      //done();
    });
  }
});

Template.mainPage.getConfigurationRecord = function(){
  return Statistics.findOne({_id: 'configuration'});
}

Template.mainPage.getRootCount = function(){
  return this.total_count;
}
Template.mainPage.getGetCount = function(){
  return this.get_count;
}
Template.mainPage.getListCount = function(){
  return this.list_count;
}
Template.mainPage.getInsertCount = function(){
  return this.insert_count;
}
Template.mainPage.getUpdateCount = function(){
  return this.update_count;
}
Template.mainPage.getDeleteCount = function(){
  return this.delete_count;
}

Template.mainPage.postsList = function(){
  return Posts.find();
}