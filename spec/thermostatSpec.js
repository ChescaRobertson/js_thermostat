'use strict'

describe('Thermostat', () => {
  let thermostat;

  beforeEach(() => {
    thermostat = new Thermostat();
  });

  it("starts at 20 degrees", () => {
    expect(thermostat.getTemperature()).toEqual(20);
  });

  it('up raises the temperature by one', () => {
    thermostat.up();
    thermostat.up();
    expect(thermostat.getTemperature()).toBe(22);
  });

  it('down lowers the temperature by one', () => {
      thermostat.down();
      thermostat.down();
      expect(thermostat.getTemperature()).toEqual(18);
  });

  it('has a minimum temp of 10 degrees', () => {
    for (let i = 0; i < 21; i++) {
      thermostat.down();
    }
    expect(thermostat.getTemperature()).toEqual(10);
  });

  it('can switch PSM off', () => {
    thermostat.switchPowerSavingModeOff();
    expect(thermostat.isPowerSavingModeOn()).toBe(false);
  });

  it('can switch PSM back on', () => {
    thermostat.switchPowerSavingModeOff();
    expect(thermostat.isPowerSavingModeOn()).toBe(false);
    thermostat.switchPowerSavingModeOn();
    expect(thermostat.isPowerSavingModeOn()).toBe(true);
  });

  describe('when power saving mode is on', () => {
    it('has maximum temp of 25', () => {
      thermostat.switchPowerSavingModeOn();  
      for(let i = 0; i < 6; i++) {
            thermostat.up();
        }
        expect(thermostat.getTemperature()).toEqual(25);
    });
  });

  describe('when power saving mode is off', () => {
    it('has a maximum temperature of 32 degrees', () => {
      thermostat.switchPowerSavingModeOff();
      for (let i = 0; i < 13; i++) {
        thermostat.up();
      }
      expect(thermostat.getTemperature()).toEqual(32);
    });
  });

  it('resets the temperature to 20', () => {
      thermostat.reset();
      expect(thermostat.getTemperature()).toEqual(20);
  });

  describe('display usage levels', () => {
    describe('when the temperature is below 18 degress', () => {
      it('it is considered low usage', () => {
        for (let i =0; i <3; i++) {
          thermostat.down();
        }
        expect(thermostat.energyUsage()).toEqual('low-usage');
      });
    });
  });

  describe('when the temperature is between 18 and 25 degrees', () => {
    it('it is considered medium-usage', () => {
      expect(thermostat.energyUsage()).toEqual('medium-usage');
    });
  });

  describe('when the temperature is anything else', () => {
    it('it is considered high-usage', () => {
      thermostat.powerSavingMode = false;
      for (let i = 0; i < 6; i++) {
        thermostat.up();
      }
      expect(thermostat.energyUsage()).toEqual('high-usage');
    });
  });

});

