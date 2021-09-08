var readlineSync = require('readline-sync');
var thermostat = require('./thermostat');

// let thermo = new thermostat.Thermostat();

while(true) {
    console.log("Temperature is " + thermostat.getTemperature());
    var command = readlineSync.question("Enter command: ");

    if (command == 'up') {
        thermostat.up();
    }
    else if (command == 'down') {
        thermostat.down();
    }
    else if (command == "psm on") {
        thermostat.setPowerSavingMode("on");
    }
    else if (command == "psm off") {
        thermostat.setPowerSavingMode("off");
    }
    else if (command == "quit") {
        break;
    }

}
