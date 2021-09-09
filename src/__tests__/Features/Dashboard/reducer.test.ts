import { reducer, actions, MetricsState, History, Measurement } from '../../../Features/Dashboard/reducer';

describe('Dashboard -> reducer', () => {
  describe('Reducer', () => {
    it('should get default state when undefined', () => {
      const state: MetricsState = {
        metrics: [],
        realtimeMeasurements: [],
        historyMeasurements: [],
      };

      const result = reducer(undefined, { type: 'invalid' });

      expect(result).toStrictEqual(state);
    });

    it('should get the same original status when action is not allow', () => {
      const state: MetricsState = {
        metrics: [],
        realtimeMeasurements: [],
        historyMeasurements: [],
      };

      const result = reducer(state, { type: 'invalid' });

      expect(result).toStrictEqual(state);
      // don't mutate
      expect(state).toStrictEqual({
        metrics: [],
        realtimeMeasurements: [],
        historyMeasurements: [],
      });
    });

    it(
      'should change isSelected values and overwrite realtimeMeasurements and historyMeasurements' +
        ' values when action is changeSelection',
      () => {
        const state: MetricsState = {
          metrics: [
            { name: 'Metric 1', isSelected: false },
            { name: 'Metric 2', isSelected: true },
            { name: 'Metric 3', isSelected: false },
            { name: 'Metric 4', isSelected: true },
            { name: 'Metric 5', isSelected: false },
          ],
          realtimeMeasurements: [
            {
              metric: 'Metric 2',
              value: 76675,
              at: 5787456,
              unit: '%',
            },
            {
              metric: 'Metric 4',
              value: 5670,
              at: 664660,
              unit: 'F',
            },
          ],
          historyMeasurements: [
            {
              metric: 'Metric 1',
              unit: 'F',
              measurements: [
                {
                  metric: 'Old F',
                  value: 36546,
                  at: 34555566,
                  unit: 'F',
                },
              ],
            },
            {
              metric: 'Metric 5',
              unit: '%',
              measurements: [
                {
                  metric: 'Old value',
                  value: 57456,
                  at: 2224334,
                  unit: '%',
                },
              ],
            },
          ],
        };

        const stateExpected: MetricsState = {
          metrics: [
            { name: 'Metric 1', isSelected: false },
            { name: 'Metric 2', isSelected: true },
            { name: 'Metric 3', isSelected: false },
            { name: 'Metric 4', isSelected: false },
            { name: 'Metric 5', isSelected: true },
          ],
          realtimeMeasurements: [
            {
              metric: 'Metric 2',
              value: 76675,
              at: 5787456,
              unit: '%',
            },
            {
              metric: 'Metric 5',
              value: 0,
              at: 0,
              unit: '',
            },
          ],
          historyMeasurements: [
            {
              metric: 'Metric 2',
              unit: '',
              measurements: [],
            },
            {
              metric: 'Metric 5',
              unit: '%',
              measurements: [
                {
                  metric: 'Old value',
                  value: 57456,
                  at: 2224334,
                  unit: '%',
                },
              ],
            },
          ],
        };

        const payload: string[] = ['Metric 2', 'Metric 5'];

        const result = reducer(state, { type: actions.changeSelection.type, payload });

        expect(result).toStrictEqual(stateExpected);
        // don't mutate
        expect(state).toStrictEqual({
          metrics: [
            { name: 'Metric 1', isSelected: false },
            { name: 'Metric 2', isSelected: true },
            { name: 'Metric 3', isSelected: false },
            { name: 'Metric 4', isSelected: true },
            { name: 'Metric 5', isSelected: false },
          ],
          realtimeMeasurements: [
            {
              metric: 'Metric 2',
              value: 76675,
              at: 5787456,
              unit: '%',
            },
            {
              metric: 'Metric 4',
              value: 5670,
              at: 664660,
              unit: 'F',
            },
          ],
          historyMeasurements: [
            {
              metric: 'Metric 1',
              unit: 'F',
              measurements: [
                {
                  metric: 'Old F',
                  value: 36546,
                  at: 34555566,
                  unit: 'F',
                },
              ],
            },
            {
              metric: 'Metric 5',
              unit: '%',
              measurements: [
                {
                  metric: 'Old value',
                  value: 57456,
                  at: 2224334,
                  unit: '%',
                },
              ],
            },
          ],
        });
      },
    );

    it('should overwrite historyMeasurements values when action is setMeasurementHistory', () => {
      const state: MetricsState = {
        metrics: [
          { name: 'Metric 1', isSelected: false },
          { name: 'Metric 2', isSelected: true },
          { name: 'Metric 3', isSelected: false },
          { name: 'Metric 4', isSelected: true },
          { name: 'Metric 5', isSelected: false },
        ],
        realtimeMeasurements: [
          {
            metric: 'Metric 2',
            value: 76675,
            at: 5787456,
            unit: '%',
          },
          {
            metric: 'Metric 4',
            value: 5670,
            at: 664660,
            unit: 'F',
          },
        ],
        historyMeasurements: [
          {
            metric: 'Metric 1',
            unit: 'F',
            measurements: [
              {
                metric: 'Old F',
                value: 36546,
                at: 34555566,
                unit: 'F',
              },
            ],
          },
          {
            metric: 'Metric 5',
            unit: '%',
            measurements: [
              {
                metric: 'Old value',
                value: 57456,
                at: 2224334,
                unit: '%',
              },
            ],
          },
        ],
      };

      const stateExpected: MetricsState = {
        metrics: [
          { name: 'Metric 1', isSelected: false },
          { name: 'Metric 2', isSelected: true },
          { name: 'Metric 3', isSelected: false },
          { name: 'Metric 4', isSelected: true },
          { name: 'Metric 5', isSelected: false },
        ],
        realtimeMeasurements: [
          {
            metric: 'Metric 2',
            value: 76675,
            at: 5787456,
            unit: '%',
          },
          {
            metric: 'Metric 4',
            value: 5670,
            at: 664660,
            unit: 'F',
          },
        ],
        historyMeasurements: [
          {
            metric: 'Metric 1',
            unit: 'F',
            measurements: [
              {
                metric: 'Metric 1',
                value: 1,
                at: 2,
                unit: 'F',
              },
              {
                metric: 'Metric 1',
                value: 11,
                at: 222,
                unit: 'F',
              },
            ],
          },
          {
            metric: 'Metric 3',
            unit: '',
            measurements: [
              {
                metric: 'Metric 3',
                value: 221,
                at: 222,
                unit: '',
              },
              {
                metric: 'Metric 3',
                value: 2211,
                at: 22222,
                unit: '%',
              },
            ],
          },
        ],
      };

      const payload: History[] = [
        {
          metric: 'Metric 1',
          unit: '',
          measurements: [
            {
              metric: 'Metric 1',
              value: 1,
              at: 2,
              unit: 'F',
            },
            {
              metric: 'Metric 1',
              value: 11,
              at: 222,
              unit: 'F',
            },
          ],
        },
        {
          metric: 'Metric 3',
          unit: '',
          measurements: [
            {
              metric: 'Metric 3',
              value: 221,
              at: 222,
              unit: '',
            },
            {
              metric: 'Metric 3',
              value: 2211,
              at: 22222,
              unit: '%',
            },
          ],
        },
      ];

      const result = reducer(state, { type: actions.setMeasurementHistory.type, payload });

      expect(result).toStrictEqual(stateExpected);
      // don't mutate
      expect(state).toStrictEqual({
        metrics: [
          { name: 'Metric 1', isSelected: false },
          { name: 'Metric 2', isSelected: true },
          { name: 'Metric 3', isSelected: false },
          { name: 'Metric 4', isSelected: true },
          { name: 'Metric 5', isSelected: false },
        ],
        realtimeMeasurements: [
          {
            metric: 'Metric 2',
            value: 76675,
            at: 5787456,
            unit: '%',
          },
          {
            metric: 'Metric 4',
            value: 5670,
            at: 664660,
            unit: 'F',
          },
        ],
        historyMeasurements: [
          {
            metric: 'Metric 1',
            unit: 'F',
            measurements: [
              {
                metric: 'Old F',
                value: 36546,
                at: 34555566,
                unit: 'F',
              },
            ],
          },
          {
            metric: 'Metric 5',
            unit: '%',
            measurements: [
              {
                metric: 'Old value',
                value: 57456,
                at: 2224334,
                unit: '%',
              },
            ],
          },
        ],
      });
    });

    it('should overwrite realtimeMeasurements values when action is setRealtimeMeasurements', () => {
      const state: MetricsState = {
        metrics: [
          { name: 'Metric 1', isSelected: false },
          { name: 'Metric 2', isSelected: true },
          { name: 'Metric 3', isSelected: false },
          { name: 'Metric 4', isSelected: true },
          { name: 'Metric 5', isSelected: false },
        ],
        realtimeMeasurements: [
          {
            metric: 'Metric 2',
            value: 76675,
            at: 5787456,
            unit: '%',
          },
          {
            metric: 'Metric 4',
            value: 5670,
            at: 664660,
            unit: 'F',
          },
        ],
        historyMeasurements: [
          {
            metric: 'Metric 1',
            unit: 'F',
            measurements: [
              {
                metric: 'Old F',
                value: 36546,
                at: 34555566,
                unit: 'F',
              },
            ],
          },
          {
            metric: 'Metric 5',
            unit: '%',
            measurements: [
              {
                metric: 'Old value',
                value: 57456,
                at: 2224334,
                unit: '%',
              },
            ],
          },
        ],
      };

      const stateExpected: MetricsState = {
        metrics: [
          { name: 'Metric 1', isSelected: false },
          { name: 'Metric 2', isSelected: true },
          { name: 'Metric 3', isSelected: false },
          { name: 'Metric 4', isSelected: true },
          { name: 'Metric 5', isSelected: false },
        ],
        realtimeMeasurements: [
          {
            metric: 'Metric 2',
            value: 76675,
            at: 5787456,
            unit: '%',
          },
          {
            metric: 'Metric 4',
            value: 5,
            at: 6,
            unit: '%',
          },
        ],
        historyMeasurements: [
          {
            metric: 'Metric 1',
            unit: 'F',
            measurements: [
              {
                metric: 'Old F',
                value: 36546,
                at: 34555566,
                unit: 'F',
              },
            ],
          },
          {
            metric: 'Metric 5',
            unit: '%',
            measurements: [
              {
                metric: 'Old value',
                value: 57456,
                at: 2224334,
                unit: '%',
              },
            ],
          },
        ],
      };

      const payload: Measurement = {
        metric: 'Metric 4',
        value: 5,
        at: 6,
        unit: '%',
      };

      const result = reducer(state, { type: actions.setRealtimeMeasurements.type, payload });

      expect(result).toStrictEqual(stateExpected);
      // don't mutate
      expect(state).toStrictEqual({
        metrics: [
          { name: 'Metric 1', isSelected: false },
          { name: 'Metric 2', isSelected: true },
          { name: 'Metric 3', isSelected: false },
          { name: 'Metric 4', isSelected: true },
          { name: 'Metric 5', isSelected: false },
        ],
        realtimeMeasurements: [
          {
            metric: 'Metric 2',
            value: 76675,
            at: 5787456,
            unit: '%',
          },
          {
            metric: 'Metric 4',
            value: 5670,
            at: 664660,
            unit: 'F',
          },
        ],
        historyMeasurements: [
          {
            metric: 'Metric 1',
            unit: 'F',
            measurements: [
              {
                metric: 'Old F',
                value: 36546,
                at: 34555566,
                unit: 'F',
              },
            ],
          },
          {
            metric: 'Metric 5',
            unit: '%',
            measurements: [
              {
                metric: 'Old value',
                value: 57456,
                at: 2224334,
                unit: '%',
              },
            ],
          },
        ],
      });
    });

    it(
      'should overwrite realtimeMeasurements values and add Measurement to history' +
        ' when action is setRealtimeMeasurements',
      () => {
        const state: MetricsState = {
          metrics: [
            { name: 'Metric 1', isSelected: false },
            { name: 'Metric 2', isSelected: true },
            { name: 'Metric 3', isSelected: false },
            { name: 'Metric 4', isSelected: true },
            { name: 'Metric 5', isSelected: false },
          ],
          realtimeMeasurements: [
            {
              metric: 'Metric 1',
              value: 76675,
              at: 5787456,
              unit: '%',
            },
            {
              metric: 'Metric 4',
              value: 5670,
              at: 664660,
              unit: 'F',
            },
          ],
          historyMeasurements: [
            {
              metric: 'Metric 1',
              unit: 'F',
              measurements: [
                {
                  metric: 'Old F',
                  value: 36546,
                  at: 34555566,
                  unit: 'F',
                },
              ],
            },
            {
              metric: 'Metric 5',
              unit: '%',
              measurements: [
                {
                  metric: 'Old value',
                  value: 57456,
                  at: 2224334,
                  unit: '%',
                },
              ],
            },
          ],
        };

        const stateExpected: MetricsState = {
          metrics: [
            { name: 'Metric 1', isSelected: false },
            { name: 'Metric 2', isSelected: true },
            { name: 'Metric 3', isSelected: false },
            { name: 'Metric 4', isSelected: true },
            { name: 'Metric 5', isSelected: false },
          ],
          realtimeMeasurements: [
            {
              metric: 'Metric 1',
              value: 55,
              at: 66,
              unit: 'F',
            },
            {
              metric: 'Metric 4',
              value: 5670,
              at: 664660,
              unit: 'F',
            },
          ],
          historyMeasurements: [
            {
              metric: 'Metric 1',
              unit: 'F',
              measurements: [
                {
                  metric: 'Old F',
                  value: 36546,
                  at: 34555566,
                  unit: 'F',
                },
                {
                  metric: 'Metric 1',
                  value: 55,
                  at: 66,
                  unit: 'F',
                },
              ],
            },
            {
              metric: 'Metric 5',
              unit: '%',
              measurements: [
                {
                  metric: 'Old value',
                  value: 57456,
                  at: 2224334,
                  unit: '%',
                },
              ],
            },
          ],
        };

        const payload: Measurement = {
          metric: 'Metric 1',
          value: 55,
          at: 66,
          unit: 'F',
        };

        const result = reducer(state, { type: actions.setRealtimeMeasurements.type, payload });

        expect(result).toStrictEqual(stateExpected);
        // don't mutate
        expect(state).toStrictEqual({
          metrics: [
            { name: 'Metric 1', isSelected: false },
            { name: 'Metric 2', isSelected: true },
            { name: 'Metric 3', isSelected: false },
            { name: 'Metric 4', isSelected: true },
            { name: 'Metric 5', isSelected: false },
          ],
          realtimeMeasurements: [
            {
              metric: 'Metric 1',
              value: 76675,
              at: 5787456,
              unit: '%',
            },
            {
              metric: 'Metric 4',
              value: 5670,
              at: 664660,
              unit: 'F',
            },
          ],
          historyMeasurements: [
            {
              metric: 'Metric 1',
              unit: 'F',
              measurements: [
                {
                  metric: 'Old F',
                  value: 36546,
                  at: 34555566,
                  unit: 'F',
                },
              ],
            },
            {
              metric: 'Metric 5',
              unit: '%',
              measurements: [
                {
                  metric: 'Old value',
                  value: 57456,
                  at: 2224334,
                  unit: '%',
                },
              ],
            },
          ],
        });
      },
    );

    it('should overwrite metrics values when action is metricsDataReceived', () => {
      const state: MetricsState = {
        metrics: [
          { name: 'Metric 1', isSelected: false },
          { name: 'Metric 2', isSelected: true },
          { name: 'Metric 3', isSelected: false },
          { name: 'Metric 4', isSelected: true },
          { name: 'Metric 5', isSelected: false },
        ],
        realtimeMeasurements: [
          {
            metric: 'Metric 2',
            value: 76675,
            at: 5787456,
            unit: '%',
          },
          {
            metric: 'Metric 4',
            value: 5670,
            at: 664660,
            unit: 'F',
          },
        ],
        historyMeasurements: [
          {
            metric: 'Metric 1',
            unit: 'F',
            measurements: [
              {
                metric: 'Old F',
                value: 36546,
                at: 34555566,
                unit: 'F',
              },
            ],
          },
          {
            metric: 'Metric 5',
            unit: '%',
            measurements: [
              {
                metric: 'Old value',
                value: 57456,
                at: 2224334,
                unit: '%',
              },
            ],
          },
        ],
      };

      const stateExpected: MetricsState = {
        metrics: [{ name: 'Metric 2', isSelected: false }, { name: 'Metric 4', isSelected: false }],
        realtimeMeasurements: [
          {
            metric: 'Metric 2',
            value: 76675,
            at: 5787456,
            unit: '%',
          },
          {
            metric: 'Metric 4',
            value: 5670,
            at: 664660,
            unit: 'F',
          },
        ],
        historyMeasurements: [
          {
            metric: 'Metric 1',
            unit: 'F',
            measurements: [
              {
                metric: 'Old F',
                value: 36546,
                at: 34555566,
                unit: 'F',
              },
            ],
          },
          {
            metric: 'Metric 5',
            unit: '%',
            measurements: [
              {
                metric: 'Old value',
                value: 57456,
                at: 2224334,
                unit: '%',
              },
            ],
          },
        ],
      };

      const payload: string[] = ['Metric 2', 'Metric 4'];

      const result = reducer(state, { type: actions.metricsDataReceived.type, payload });

      expect(result).toStrictEqual(stateExpected);
      // don't mutate
      expect(state).toStrictEqual({
        metrics: [
          { name: 'Metric 1', isSelected: false },
          { name: 'Metric 2', isSelected: true },
          { name: 'Metric 3', isSelected: false },
          { name: 'Metric 4', isSelected: true },
          { name: 'Metric 5', isSelected: false },
        ],
        realtimeMeasurements: [
          {
            metric: 'Metric 2',
            value: 76675,
            at: 5787456,
            unit: '%',
          },
          {
            metric: 'Metric 4',
            value: 5670,
            at: 664660,
            unit: 'F',
          },
        ],
        historyMeasurements: [
          {
            metric: 'Metric 1',
            unit: 'F',
            measurements: [
              {
                metric: 'Old F',
                value: 36546,
                at: 34555566,
                unit: 'F',
              },
            ],
          },
          {
            metric: 'Metric 5',
            unit: '%',
            measurements: [
              {
                metric: 'Old value',
                value: 57456,
                at: 2224334,
                unit: '%',
              },
            ],
          },
        ],
      });
    });

    it('should get the same original status when action is apiErrorReceived', () => {
      const state: MetricsState = {
        metrics: [],
        realtimeMeasurements: [],
        historyMeasurements: [],
      };

      const result = reducer(state, { type: actions.apiErrorReceived.type, payload: { error: 'error test' } });

      expect(result).toStrictEqual(state);
      // don't mutate
      expect(state).toStrictEqual({
        metrics: [],
        realtimeMeasurements: [],
        historyMeasurements: [],
      });
    });
  });
});
