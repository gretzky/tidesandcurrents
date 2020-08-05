import axios, { AxiosResponse } from 'axios'
import { Params, TimeZones, Products, Datum, Units, ReturnData } from './types'

// converts today to 'yyyymmdd' for use in begin_date and end_date params
const now: string = new Date().toISOString().substr(0, 10).replace(/\-/g, '')

/**
 * get - call the tidescurrents API with a given station ID and params
 * 
 * @param stationId - ID of a station to get data for (station IDs can be found here: https://tidesandcurrents.noaa.gov/stations.html)
 * @param params - params to grab specific data (available params: https://api.tidesandcurrents.noaa.gov/api/prod)
 */
const get = async (stationId: number | string, params: Params): Promise<AxiosResponse> => {
  const localUsesImperial = await axios.get('http://ipinfo.io').then(res => res.data.country === 'US' || res.data.country === 'MM' || res.data.country === 'LR')

  const { format, time_zone, units, ...rest } = params

  return axios
    .get('https://tidesandcurrents.noaa.gov/api/datagetter', {
      params: {
        station: stationId,
        format: format ?? 'json',
        time_zone: time_zone ?? TimeZones.LDT,
        units: units ?? localUsesImperial ? Units.IMPERIAL : Units.METRIC,
        ...rest
      }
    })
}

/**
 * tidePredictions - return tide predictions for a given date (defaults to today)
 * 
 * @param stationId - ID of a station to get data for (station IDs can be found here: https://tidesandcurrents.noaa.gov/stations.html)
 * @param params - params to grab specific data (available params: https://api.tidesandcurrents.noaa.gov/api/prod)
 */
const tidePredictions = (stationId: number | string, date?: string): Promise<ReturnData> => {
  return get(stationId, {
    product: Products.TIDE_PREDICTIONS,
    date: date ?? 'today',
    datum: Datum.MLLW,
    interval: 'hilo',
  }).then(res => {
    if (!res || !res.data) {
      throw new Error('Something went wrong.')
    }
    if (!res.data.predictions) {
      throw new Error(`Could not get tide predictions for station ${stationId}. Is the station ID correct?`)
    }
    return res.data.predictions
  })
}

export default {
  get,
  tidePredictions,
  now
}