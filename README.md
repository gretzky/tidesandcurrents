# NOAA Tides and Currents API

Node wrapper around the [NOAA Tides and Currents API](https://api.tidesandcurrents.noaa.gov/api/prod).

## Usage

```
yarn add tidesandcurrents
```

### `get(stationId: number, params?: {})`

Make a generic call to the tides and currents API. 
All params valid to pass can be found [here](https://api.tidesandcurrents.noaa.gov/api/prod).

```js
import tidesandcurrents from 'tidesandcurrents'

// the `now` method returns today's date as 'yyyymmdd'.
const currentAirTemperature = tidesandcurrents.get(8410140, {
  product: 'air_temperature',
  date: tidesandcurrents.now
});
```

### `tidePredictions(stationId: number, date?: string)`

Get the day's high/low tide predictions. Date param defaults to today.

```js
import tidesandcurrents from 'tidesandcurrents'

// date defaults to today
const tidePredictions = tidesandcurrents.tidePredictions(8410140)

// or you can specify a past/future date
const yesterdaysTidePredictions = tidesandcurrents.tidePredictions(8410140, '20201231')

// returns an array of the day's predictions
// [
//   { t: '2020-08-05 00:26', v: '19.640', type: 'H' },
//   { t: '2020-08-05 06:53', v: '-0.412', type: 'L' },
//   { t: '2020-08-05 12:54', v: '18.423', type: 'H' },
//   { t: '2020-08-05 19:10', v: '0.786', type: 'L' }
// ]
```

### `stationMetadata(stationId: number)`

Gets station metadata info -- id, name, latitude, and longitude.

```js
import tidesandcurrents from 'tidesandcurrents'

const stationMetadata = tidesandcurrents.stationMetadata(8410140)

// returns
// {
//   id: '8410140',
//   name: 'Eastport',
//   lat: '44.9046',
//   long: '-66.9829'
// }
```
