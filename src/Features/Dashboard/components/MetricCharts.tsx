import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { client, getMultipleMeasurementsQuery as query } from '../../../common/graphql';
import { actions } from '../reducer';
import { Provider, useQuery } from 'urql';
import { IState } from '../../../store';
import Chart from './Chart';

const useStyles = makeStyles({
  chart: {
    width: '100%',
    height: 500,
  },
});

export default () => {
  return (
    <Provider value={client}>
      <MetricCharts />
    </Provider>
  );
};

const MetricCharts = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const metrics = useSelector((state: IState) => state.dashboard.metrics);
  const [after] = useState(new Date().getTime() - 30 * 60 * 1000); // current time - 30 mins
  const input = metrics.filter(({ isSelected }) => isSelected).map(({ name }) => ({ metricName: name, after }));

  const [result] = useQuery({
    query,
    variables: {
      input,
    },
  });
  const { data, error } = result;
  useEffect(() => {
    if (error) {
      dispatch(actions.apiErrorReceived({ error: error.message }));
      return;
    }
    if (!data) return;
    const { getMultipleMeasurements } = data;
    dispatch(actions.setMeasurementHistory(getMultipleMeasurements));
  }, [dispatch, data, error]);

  return (
    <div className={classes.chart}>
      <Chart />
    </div>
  );
};
