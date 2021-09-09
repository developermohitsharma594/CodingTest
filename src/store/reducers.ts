import { reducer as dashboardReducer } from '../Features/Dashboard/reducer';
import { reducer as weatherReducer } from '../Features/Weather/reducer';

export default {
  dashboard: dashboardReducer,
  weather: weatherReducer,
};
