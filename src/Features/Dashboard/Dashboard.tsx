import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { IState } from '../../store';
import SelectedMetric from './components/SelectedMetric';
import MetricCard from './components/MetricCard';
import MetricCharts from './components/MetricCharts';

const useStyles = makeStyles({
  grid: {
    width: '100%',
  },
  select: {
    textAlign: 'right',
  },
});

export default () => {
  const classes = useStyles();
  const metrics = useSelector((state: IState) => state.dashboard.metrics);
  const showContent = !!metrics.filter(metric => metric.isSelected).length;

  return (
    <Grid container spacing={5} className={classes.grid}>
      <Grid item xs={6}>
        {showContent && <MetricCard />}
      </Grid>
      <Grid item xs={6} className={classes.select}>
        <SelectedMetric />
      </Grid>
      <Grid item xs={12}>
        {showContent && <MetricCharts />}
      </Grid>
    </Grid>
  );
};
