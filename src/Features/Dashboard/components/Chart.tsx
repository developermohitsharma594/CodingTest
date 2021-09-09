import React from 'react';
import moment from 'moment';
import numeral from 'numeral';
import { useSelector } from 'react-redux';
import { Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { IState } from '../../../store';

export default () => {
  const allHistoryMeasurements = useSelector((state: IState) => state.dashboard.historyMeasurements);
  const historyMeasurements = allHistoryMeasurements.filter(({ measurements }) => measurements.length);
  const colors = ['purple', 'red', 'orange', 'brown', 'blue', 'green'];
  const createYAxis = () => {
    // get all units removing empty or duplicated
    const units = Array.from(new Set(historyMeasurements.filter(({ unit }) => unit).map(({ unit }) => unit)));
    return units.map(unit => {
      const tickCount = unit === '%' ? 5 : 10;
      const ticks = unit === '%' ? [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100] : [];
      return (
        <YAxis
          key={unit}
          yAxisId={unit}
          domain={['auto', 'auto']}
          tickCount={tickCount}
          ticks={ticks}
          label={{ value: unit, angle: -90, position: 'insideTopLeft', dy: 10 }}
          tickFormatter={tick => (tick > 999 ? numeral(tick).format('0.0 a') : tick)}
        />
      );
    });
  };

  const renderCustomAxisTick = ({ x, y, payload }: { x: number; y: number; payload: any }) => (
    <text x={x - 20} y={y + 15}>
      {moment(payload.value).format('hh:mm')}
    </text>
  );

  return (
    <ResponsiveContainer>
      <LineChart>
        <XAxis dataKey="at" tick={renderCustomAxisTick} tickCount={13} type="number" domain={['left', 'right']} />
        {createYAxis()}
        <Tooltip labelFormatter={label => moment(label).format('MMM DD YYYY h:mm:ss A')} />
        <Legend />
        {historyMeasurements.map((history, index) => (
          <Line
            type="monotone"
            dataKey="value"
            dot={false}
            isAnimationActive={false}
            stroke={colors[index]}
            name={history.metric}
            key={history.metric}
            data={history.measurements}
            yAxisId={history.unit}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};
