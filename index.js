var server = require("./server");
var stateContainer = require("./stateContainer");
var requestParser = require("./requestParser");

server.start(stateContainer.stateContainer, requestParser.requestParser);