Meteor.methods({
  getPort: function(){
    return process.env.port;
  },
  getRootUrl: function(){
    var url = process.env.ROOT_URL;
    var result = url;
    if(url != 'http://localhost:3000'){
      result = url + "/";
    }
    console.log(result);
    return result;
  }
});