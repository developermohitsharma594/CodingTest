import { createSlice, PayloadAction } from 'redux-starter-kit';

export type ApiErrorAction = {
  error: string;
};

export type Metric = {
  name: string;
  isSelected: boolean;
};

export type History = {
  metric: string;
  unit: string;
  measurements: Measurement[];
};

export type Measurement = {
  metric: string;
  value: number;
  at: number;
  unit: string;
};

export type MetricsState = {
  metrics: Metric[];
  realtimeMeasurements: Measurement[];
  historyMeasurements: History[];
};

const initialState: MetricsState = {
  metrics: [],
  realtimeMeasurements: [],
  historyMeasurements: [],
};

const slice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    changeSelection: (state, action: PayloadAction<string[]>) => {
      state.metrics.forEach(metric => (metric.isSelected = action.payload.includes(metric.name)));
      state.realtimeMeasurements = action.payload.map(
        metric =>
          state.realtimeMeasurements.find(measurement => measurement.metric === metric) || {
            metric,
            value: 0,
            at: 0,
            unit: '',
          },
      );
      state.historyMeasurements = action.payload.map(
        metric =>
          state.historyMeasurements.find(measurement => measurement.metric === metric) || {
            metric,
            unit: '',
            measurements: [],
          },
      );
    },
    setMeasurementHistory: (state, action: PayloadAction<History[]>) => {
      state.historyMeasurements = action.payload.map(history => {
        const firstValue = history.measurements[0];
        const unit = firstValue ? firstValue.unit : '';
        return { ...history, unit };
      });
    },
    setRealtimeMeasurements: (state, action: PayloadAction<Measurement>) => {
      state.realtimeMeasurements = state.realtimeMeasurements.map(measurement =>
        measurement.metric === action.payload.metric ? action.payload : measurement,
      );

      // add real time Measurement to history
      const history = state.historyMeasurements.find(({ metric }) => metric === action.payload.metric);
      if (history && history.measurements.length) history.measurements.push(action.payload);
    },
    metricsDataReceived: (state, action: PayloadAction<string[]>) => {
      state.metrics = action.payload.map(name => ({ name, isSelected: false }));
    },
    apiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
