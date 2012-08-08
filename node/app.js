
// @TODO: check out bootstrap.js code 
// http://stackoverflow.com/questions/7732293/node-js-express-js-breaking-up-the-app-js-file

/** Module dependencies */
var express = require('express')
  , routes = require('./routes')
  , sockjs = require('sockjs')
  , appPort = process.env['app_port'] || 3000
  , sockJsApp = module.exports = express()       // initializes express app
  , sockjs_opts = { sockjs_url: "http://cdn.sockjs.org/sockjs-0.3.min.js" }
  , sjsEchoServer
  , server
  ;

/* ============== Init sockJsApp app ================ */

// Configuration
sockJsApp.configure(function(){
  sockJsApp.use(express.logger());
  sockJsApp.use(sockJsApp.router);
  sockJsApp.use(express.static(__dirname + '/public'));
});

sockJsApp.configure('development', function(){
  sockJsApp.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

sockJsApp.configure('production', function(){
  sockJsApp.use(express.errorHandler()); 
});

// Routes
sockJsApp.get('/', routes.index);

// Init server
server = sockJsApp.listen(appPort, function() {
  console.log("Express server listening on port %d in %s mode", server.address().port, sockJsApp.settings.env);
});


/* ============== Init WebSockets servers within the sockJsApp app ================ */

// SockJS echo server
sjsEchoServer = sockjs.createServer(sockjs_opts);

sockjs_echo.on('connection', function(conn) {
  conn.of
  conn.on('data', function(message) {
    console.log("echoing the message: " + message)
    conn.write(message);    // echoing the message
  });
  conn.on('close', function() {});
});


// attach SockJS servers to the main node server
sjsEchoServer.installHandlers(server, { prefix: '/echo' });
