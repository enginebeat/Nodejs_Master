console.log('App is running');

/*
* Primary file for the API
*
*/

/* Dependencies */

const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const config = require('./config');

/* The server should respond to all requests with a string */
var server = http.createServer((req, res)=>{
    /* Get the URL and parse it */
    var parsedUrl = url.parse(req.url, true);
    
    
    /* Get the path */
    var path = parsedUrl.pathname;
    var trimmedPath = path.replace(/^\/+|\/+$/g, '');

    /* get the HTTP Method */
    var method = req.method.toLowerCase();

    /* Get the headers as an object */
    var headers = req.headers;

    /* Get the Payload, if any */
    var decoder = new StringDecoder('utf-8');
    var buffer = '';
    req.on('data', (data)=>{
        buffer += decoder.write(data);
    });
    /* The end event will always happen */
    req.on('end', ()=>{
        buffer += decoder.end();

        /* Send the response */
        //res.end('Hello!\n');
        /* choose the handler this request should go to. If one is not found use the notFound Handler */
        var chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;

        var data = {
            'trimmedPath': trimmedPath,
            'queryStringObject': queryStringObject,
            'method': method,
            'headers': headers,
            'payload': buffer
        };

        /* Route the request to the handler specified in the router */
        chosenHandler(data, (statusCode, payload)=>{
            /* use the status code called back by the handler, or default to 200 */
            statusCode = typeof(statusCode) == 'number' ? statusCode : 200;

            /* use the payload called back by the handler, or default to an empty object */
            payload = typeof(payload) == 'object' ? payload : {};

            /* convert the payload to a string */
            var payloadString = JSON.stringify(payload);

            /* return the Response */
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(statusCode);
            res.end(payloadString);

            console.log('Returning this response: ', statusCode, payloadString);


        });


        /* Log the request path */
        //console.log('Request received on this path: ' + trimmedPath + ' with the method: ' + method + ' and with these query string parameters ', queryStringObject);
        //console.log('Request Received with these headers: ', headers);
        //console.log('Request Received with this payload: ', buffer);
    });
    
    /* get the query string as an object */
    var queryStringObject = parsedUrl.query;

});

/* Start Server */
server.listen(config.port, ()=>{
    console.log(`Server listening on port ${config.port} now in ${config.envName}`);
});

/* Define the handlers */
var handlers = {
   
};

/* Sample Handler */
handlers.sample = function(data, callback){

    /* Callback a HTTP status code, and a payload object */
    callback(406, {'name': 'sample handler'});
};

/* Not Found Handler */
handlers.notFound = function(data, callback){
    callback(404);
};
/* Define a request Router */
var router = {
    'sample': handlers.sample
};


