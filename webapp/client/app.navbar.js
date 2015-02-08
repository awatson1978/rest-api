Session.setDefault('isStatisticsPanelVisible', false);
Session.setDefault('isInterfacePanelVisible', false);
Session.setDefault('isDatabasePanelVisible', false);


Template.footerNavBar.events({
  'click #statisticsButton':function(){
    if(Session.get('isStatisticsPanelVisible')){
      Session.set('isStatisticsPanelVisible', false);
    }else{
      Session.set('isStatisticsPanelVisible', true);
    }
  },
  'click #interfaceButton':function(){
    if(Session.get('isInterfacePanelVisible')){
      Session.set('isInterfacePanelVisible', false);
    }else{
      Session.set('isInterfacePanelVisible', true);
    }
  },
  'click #databaseButton':function(){
    if(Session.get('isDatabasePanelVisible')){
      Session.set('isDatabasePanelVisible', false);
    }else{
      Session.set('isDatabasePanelVisible', true);
    }
  }
});




Template.footerNavBar.helpers({
  getStatisticsVisibility: function(){
    if(Session.get('isStatisticsPanelVisible')){
      return "btn-default";
    }else{
      return "btn-info";
    }
  },
  getInterfaceVisibility: function () {
    if(Session.get('isInterfacePanelVisible')){
      return "btn-default";
    }else{
      return "btn-info";
    }
  },
  getDatabaseVisibility: function () {
    if(Session.get('isDatabasePanelVisible')){
      return "btn-default";
    }else{
      return "btn-info";
    }
  }
});
