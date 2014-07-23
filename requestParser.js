var url = require("url");


exports.requestParser = function () {

    // http://localhost:8888/?buildId=an_id&isBroken=0&isBuilding=0
    function parse(requestUrl) {
        var pathObject = url.parse(requestUrl, true, false);

        var buildId = pathObject.query.buildId;
        var isBroken = pathObject.query.isBroken;
        var isBuilding = pathObject.query.isBuilding;

        return {
            buildId: buildId,
            isBroken: isBroken,
            isBuilding: isBuilding
        };
    }

    return {
        parse: parse
    };

}();