var sys = require('sys');
var exec = require('child_process').exec;


exports.commandLineRunner = function () {

    var validColors = ['red', 'yellow', 'green'];
    
    var command = "clewarecontrol -d 407571 -c 1 -as";
    
    function puts(error, stdout, stderr) {
        sys.puts(stdout);
    };
    
    function runCommand(state) {
        var lightsState = {
            red: 0,
            yellow: 0,
            green: 0
        };
        
        for(buildId in state) {
            if (state.hasOwnProperty(buildId)) {
                console.log("configuration " + buildId + "   state: " + JSON.stringify(state[buildId]));
                if(state[buildId].isBroken > 0) {
                    lightsState.red += 1;
                }
                if (state[buildId].isBuilding > 0) {
                    lightsState.yellow += 1;
                }
            }
        }
        
        lightsState.green = (lightsState.red === 0) ? 1 : 0;
        
        console.log("sum.red = " + lightsState.red + ". sum.yellow = " + lightsState.yellow);

        validColors.forEach(function (color) {
            var commandToRun = command.concat(' ', getColorIndex(color), ' ', (lightsState[color] > 0) ? '1' : '0');
            console.log(commandToRun);
            
            exec(commandToRun, puts);
        });
    }

    function getColorIndex(color) {
        return validColors.indexOf(color).toString();
    }
    
    return {
        runCommand: runCommand
    };
    
}();