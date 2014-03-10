Meteor.methods({
  getPort: function(){
    return process.env.port;
  },
  getRootUrl: function(){
    var url = process.env.ROOT_URL;
    console.log(url);
    return url;
  }
});