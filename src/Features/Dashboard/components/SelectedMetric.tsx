import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { client, getMetricsQuery as query } from '../../../common/graphql';
import { actions } from '../reducer';
import { Provider, useQuery } from 'urql';
import LinearProgress from '@material-ui/core/LinearProgress';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import { IState } from '../../../store';

const useStyles = makeStyles({
  select: {
    margin: 20,
    minWidth: '80%',
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
});

export default () => {
  return (
    <Provider value={client}>
      <SelectedMetric />
    </Provider>
  );
};

const SelectedMetric = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const metrics = useSelector((state: IState) => state.dashboard.metrics);

  const [result] = useQuery({ query });
  const { fetching, data, error } = result;
  useEffect(() => {
    if (error) {
      dispatch(actions.apiErrorReceived({ error: error.message }));
      return;
    }
    if (!data) return;
    const { getMetrics } = data;
    dispatch(actions.metricsDataReceived(getMetrics));
  }, [dispatch, data, error]);

  if (fetching) return <LinearProgress />;

  return (
    <FormControl className={classes.select}>
      <InputLabel>Metrics</InputLabel>
      <Select
        multiple
        value={metrics.filter(metric => metric.isSelected).map(metric => metric.name)}
        onChange={(event: any) => dispatch(actions.changeSelection(event.target.value))}
        input={<Input />}
        renderValue={(selected: any) => (
          <div className={classes.chips}>
            {selected.map((value: string) => (
              <Chip key={value} label={value} className={classes.chip} />
            ))}
          </div>
        )}
      >
        {metrics.map(({ name }) => (
          <MenuItem key={name} value={name}>
            <Checkbox checked={!!metrics.find(metric => metric.name === name && metric.isSelected)} />
            <ListItemText primary={name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
