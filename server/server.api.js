Router.map(function () {
  this.route("apiRoute", {path: "/api/",
    where: "server",
    action: function(){
      console.log('#########################################');
      console.log('apiRoute');
      //console.log(this);
      console.log(this.request.headers);
      console.log(this.request.method);
      console.log(this.request.body);
      console.log(this.params);
      console.log('------------------------------');
      console.log(this);
      console.log('------------------------------');


      this.response.statusCode = 200;
      //this.response.setHeader("Content-Type", "application/javascript");
      //this.response.setHeader("Content-Type", "text/html");
      this.response.setHeader("content-type", "application/javascript");
      this.response.setHeader("Access-Control-Allow-Origin", "*");
      this.response.setHeader("Access-Control-Allow-Header", "Origin, X-Requested-With, Content-Type, Accept");

//      this.response.writeHead(200, {
//        'Content-Type': 'text/html',
//        'Access-Control-Allow-Origin': '*'
//      });

      if (this.request.method == 'GET') {
        console.log('GET');
        Statistics.update({_id: "configuration"},{$inc:{
          total_count: 1,
          list_count: 1
        }});

      }else if (this.request.method == 'POST') {
        console.log('POST');
        Statistics.update({_id: "configuration"},{$inc:{
          total_count: 1,
          insert_count: 1
        }});
      }else if (this.request.method == 'UPDATE') {
        console.log('PUT');
        Statistics.update({_id: "configuration"},{$inc:{
          total_count: 1,
          update_count: 1
        }});
      }else if (this.request.method == 'DELETE') {
        console.log('DELETE');
        Statistics.update({_id: "configuration"},{$inc:{
          total_count: 1,
          delete_count: 1
        }});

      }
       this.response.end("Meteor REST API");
    }
  });


});
