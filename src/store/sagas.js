import { spawn } from 'redux-saga/effects';
import dashboardSaga from '../Features/Dashboard/saga';
import weatherSaga from '../Features/Weather/saga';

export default function* root() {
  yield spawn(dashboardSaga);
  yield spawn(weatherSaga);
}
