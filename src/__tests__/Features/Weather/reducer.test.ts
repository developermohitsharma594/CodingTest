import { reducer, actions, WeatherForLocation } from '../../../Features/Weather/reducer';

describe('Weather -> reducer', () => {
  describe('Reducer', () => {
    it('should get default state when undefined', () => {
      const state = {
        temperatureinCelsius: 0,
        temperatureinFahrenheit: 0,
        description: '',
        locationName: '',
      };

      const result = reducer(undefined, { type: 'invalid' });

      expect(result).toStrictEqual(state);
    });

    it('should get the same original status when action is not allow', () => {
      const state = {
        temperatureinCelsius: 1,
        temperatureinFahrenheit: 2,
        description: 'A',
        locationName: 'B',
      };

      const result = reducer(state, { type: 'invalid' });

      expect(result).toStrictEqual(state);
      // don't mutate
      expect(state).toStrictEqual({
        temperatureinCelsius: 1,
        temperatureinFahrenheit: 2,
        description: 'A',
        locationName: 'B',
      });
    });

    it('should overwrite values when action is weatherDataRecevied', () => {
      const state = {
        temperatureinCelsius: 1,
        temperatureinFahrenheit: 2,
        description: 'A',
        locationName: 'B',
      };

      const stateExpected = {
        temperatureinCelsius: 5,
        temperatureinFahrenheit: 41,
        description: 'AA',
        locationName: 'BB',
      };

      const payload: WeatherForLocation = {
        temperatureinCelsius: 5,
        description: 'AA',
        locationName: 'BB',
      };

      const result = reducer(state, { type: actions.weatherDataRecevied.type, payload });

      expect(result).toStrictEqual(stateExpected);
      // don't mutate
      expect(state).toStrictEqual({
        temperatureinCelsius: 1,
        temperatureinFahrenheit: 2,
        description: 'A',
        locationName: 'B',
      });
    });

    it('should get the same original status when action is weatherApiErrorReceived', () => {
      const state = {
        temperatureinCelsius: 1,
        temperatureinFahrenheit: 2,
        description: 'A',
        locationName: 'B',
      };

      const result = reducer(state, { type: actions.weatherApiErrorReceived.type, payload: { error: 'error test' } });

      expect(result).toStrictEqual(state);
      // don't mutate
      expect(state).toStrictEqual({
        temperatureinCelsius: 1,
        temperatureinFahrenheit: 2,
        description: 'A',
        locationName: 'B',
      });
    });
  });
});
