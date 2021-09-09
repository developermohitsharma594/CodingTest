import { createClient, defaultExchanges, subscriptionExchange } from 'urql';
import { SubscriptionClient } from 'subscriptions-transport-ws';

export const client = createClient({
  url: 'https://react.eogresources.com/graphql',
});

export const createWSClient = () => {
  const url = 'wss://react.eogresources.com/graphql';
  const subscriptionClient = new SubscriptionClient(url, { reconnect: true });

  return createClient({
    url,
    exchanges: [
      ...defaultExchanges,
      subscriptionExchange({
        forwardSubscription(operation) {
          return subscriptionClient.request(operation);
        },
      }),
    ],
  });
};

export const getWeatherForLocationQuery = `
query($latLong: WeatherQuery!) {
  getWeatherForLocation(latLong: $latLong) {
    description
    locationName
    temperatureinCelsius
  }
}
`;

export const getMetricsQuery = `
query {
  getMetrics
}
`;

export const newMeasurementSubscription = `
subscription {
    newMeasurement {
      metric
      value
      at
      unit
    }
  }
`;

export const getMultipleMeasurementsQuery = `
query($input: [MeasurementQuery]) {
  getMultipleMeasurements(input: $input)  {
    metric
    measurements {
      metric
      value
      at
      unit
    }
  }
}
`;
