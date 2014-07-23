var http = require("http");


function start(state, requestParser) {
    function onRequest(request, response) {
        
        // favicon filter
        if (request.url === '/favicon.ico') {
            response.writeHead(200, { 'Content-Type': 'image/x-icon' });
            response.end();
            return;
        }
        
        response.writeHead(200, { "Content-Type": "text/plain" });

        var inputSignal = requestParser.parse(request.url);
        //console.log(JSON.stringify(inputSignal));

        state.apply(inputSignal);

        //state.writeToResponse(response);
        //state.test();
        //state.writeToResponse(response);
        
        response.end();
    }

    var server = http.createServer(onRequest);
    server.listen(8888);
}

exports.start = start;
