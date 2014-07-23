var commandLineRunner = require("./commandLineRunner");


exports.stateContainer = function (commandLineRunner) {

    var globalState = {};

    var validStateProperties = ['buildId', 'isBroken', 'isBuilding'];

    function apply(inputSignal) {
        if (!isValid(inputSignal)) {
            return;
        }

        var currentBuildState = globalState[inputSignal.buildId] || { isBroken: 0, isBuilding: 0 };
        
        if (inputSignal.isBroken !== undefined) {
            currentBuildState.isBroken = inputSignal.isBroken;
        }
        if (inputSignal.isBuilding !== undefined) {
            currentBuildState.isBuilding = inputSignal.isBuilding;
        }

        globalState[inputSignal.buildId] = currentBuildState;
        
        console.log("-----> global state: " + JSON.stringify(globalState));
        commandLineRunner.runCommand(globalState);
    }
    
    function isValid(inputSignal) {
        var isPropertiesValid = (('buildId' in inputSignal) && ('isBroken' in inputSignal) && ('isBuilding' in inputSignal)) || false;
        var isBuildIdValid = (inputSignal.buildId.length > 0) || false;
        //var isActionsValid = (validActions.indexOf(inputSignal.action) > -1) || false;
        //var isColorsValid = (validColors.indexOf(inputSignal.color) > -1) || false;

        return (isBuildIdValid && isPropertiesValid) || false;
    }

    return {
        apply: apply
    };

}(commandLineRunner.commandLineRunner);