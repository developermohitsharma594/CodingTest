import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Provider, useSubscription } from 'urql';
import { createWSClient, newMeasurementSubscription as query } from '../../../common/graphql';
import { actions } from '../reducer';
import { IState } from '../../../store';

const useStyles = makeStyles({
  card: {
    padding: 10,
  },
});

export default () => {
  return (
    <Provider value={createWSClient()}>
      <MetricCard />
    </Provider>
  );
};

const MetricCard = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const metrics = useSelector((state: IState) => state.dashboard.metrics);
  const realtimeMeasurements = useSelector((state: IState) => state.dashboard.realtimeMeasurements);

  const [result] = useSubscription({ query });
  const { data, error } = result;
  useEffect(() => {
    if (error) {
      dispatch(actions.apiErrorReceived({ error: error.message }));
      return;
    }
    if (!data) return;
    const { newMeasurement } = data;
    // only dispatch action when metric is selected
    if (metrics.find(metric => metric.name === newMeasurement.metric && metric.isSelected))
      dispatch(actions.setRealtimeMeasurements(newMeasurement));
  }, [dispatch, data, error, metrics]);

  return (
    <Grid container spacing={2}>
      {realtimeMeasurements.map(measurement => (
        <Grid item sm={12} md={6} lg={4} key={measurement.metric}>
          <Card elevation={3} className={classes.card}>
            <CardContent>
              <Typography variant="h6">{measurement.metric}</Typography>
              <Typography variant="h3">{measurement.value}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
