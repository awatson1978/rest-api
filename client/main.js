Session.setDefault('serverUrl', "---");
Meteor.startup(function(){
  Meteor.call('getRootUrl', function(error, result){
    console.log('getRootUrl: ' + result);
    Session.set('serverUrl', result);
  });
});

Router.configure({
  layoutTemplate: 'mainLayout'
});

Template.mainPage.events({
  'click #listButton':function(){
    console.count('click #listButton');
    var newRecordId = Math.random().toString(36).slice(2,26);
    HTTP.call("GET", Session.get('serverUrl') + '/api/', function(error, result){
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
    HTTP.call("POST", Session.get('serverUrl') + '/api/', dataObject, function(error, result){
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
    HTTP.call("GET", Session.get('serverUrl') + '/api/' + newRecordId, function(error, result){
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

    HTTP.call("PUT", Session.get('serverUrl') + '/api/' + newRecordId, updatedObject, function(error, result){
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
    HTTP.call("DELETE", Session.get('serverUrl') + '/api/'  + newRecordId, function(error, result){
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

Template.mainPage.getServerAddress = function(){
  if(Session.get('serverUrl')){
    return Session.get('serverUrl');
  }else{
    return "---";
  }
}



Template.databaseCollection.postsList = function(){
  return Posts.find();
}


//----------------------------------------------------------
// REST API TESTER

Session.setDefault('selectedPanel', 1);

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

Template.restApi.firstContentPanelActive = function(){
  if(Session.get('selectedPanel') === 1){
    return "active panel-tab";
  }else{
    return "panel-tab";
  }
}
Template.restApi.secondContentPanelActive= function(){
  if(Session.get('selectedPanel') === 2){
    return "active panel-tab";
  }else{
    return "panel-tab";
  }
}
Template.restApi.thirdContentPanelActive= function(){
  if(Session.get('selectedPanel') === 3){
    return "active panel-tab";
  }else{
    return "panel-tab";
  }
}
Template.restApi.fourthContentPanelActive= function(){
  if(Session.get('selectedPanel') === 4){
    return "active panel-tab";
  }else{
    return "panel-tab";
  }
}
Template.restApi.fifthContentPanelActive= function(){
  if(Session.get('selectedPanel') === 5){
    return "active panel-tab";
  }else{
    return "panel-tab";
  }
}


Template.restApi.firstContentPanelVisibility = function(){
  if(Session.get('selectedPanel') === 1){
    return "visible";
  }else{
    return "hidden";
  }
}
Template.restApi.secondContentPanelVisibility = function(){
  if(Session.get('selectedPanel') === 2){
    return "visible";
  }else{
    return "hidden";
  }
}
Template.restApi.thirdContentPanelVisibility = function(){
  if(Session.get('selectedPanel') === 3){
    return "visible";
  }else{
    return "hidden";
  }
}
Template.restApi.fourthContentPanelVisibility = function(){
  if(Session.get('selectedPanel') === 4){
    return "visible";
  }else{
    return "hidden";
  }
}
Template.restApi.fifthContentPanelVisibility = function(){
  if(Session.get('selectedPanel') === 5){
    return "visible";
  }else{
    return "hidden";
  }
}
Template.restApi.getCurrentPanel = function(){
  return Session.get('selectedPanel');
}
Template.restApi.displayResponse = function(){
  return Session.get('apiResponse');
}
Session.setDefault('apiResponse', false);
Template.restApi.isResponseVisible = function(){
  if(Session.get('apiResponse')){
    return true;
  }else{
    return false;
  }
}


//----------------------------------------------------------
// REST API STATISTICS

Template.restStats.getConfigurationRecord = function(){
  return Statistics.findOne({_id: 'configuration'});
}

Template.restStats.getRootCount = function(){
  return this.total_count;
}
Template.restStats.getGetCount = function(){
  return this.get_count;
}
Template.restStats.getListCount = function(){
  return this.list_count;
}
Template.restStats.getInsertCount = function(){
  return this.insert_count;
}
Template.restStats.getUpdateCount = function(){
  return this.update_count;
}
Template.restStats.getDeleteCount = function(){
  return this.delete_count;
}