import axios, { AxiosResponse } from "axios";
import {
  Params,
  TimeZones,
  Products,
  Datum,
  Units,
  ReturnData,
  StationMetadata,
} from "./types";

// converts today to 'yyyymmdd' for use in begin_date and end_date params
const now: string = new Date()
  .toISOString()
  .substr(0, 10)
  .replace(/\-/g, "");

/**
 * get - call the tidescurrents API with a given station ID and params
 *
 * @param stationId - ID of a station to get data for (station IDs can be found here: https://tidesandcurrents.noaa.gov/stations.html)
 * @param params - params to grab specific data (available params: https://api.tidesandcurrents.noaa.gov/api/prod)
 */
const get = async (
  stationId: number | string,
  params: Params
): Promise<AxiosResponse> => {
  const { format, time_zone, ...rest } = params;

  return axios.get("https://tidesandcurrents.noaa.gov/api/datagetter", {
    params: {
      station: stationId,
      format: format ?? "json",
      time_zone: time_zone ?? TimeZones.LDT,
      ...rest,
    },
  });
};

/**
 * tidePredictions - return tide predictions for a given date (defaults to today)
 *
 * @param stationId - ID of a station to get data for (station IDs can be found here: https://tidesandcurrents.noaa.gov/stations.html)
 * @param params - params to grab specific data (available params: https://api.tidesandcurrents.noaa.gov/api/prod)
 */
const tidePredictions = (
  stationId: number | string,
  date?: string,
  units?: Units.IMPERIAL | Units.METRIC
): Promise<ReturnData> => {
  return get(stationId, {
    product: Products.TIDE_PREDICTIONS,
    date: date ?? "today",
    datum: Datum.MLLW,
    interval: "hilo",
    units: units ?? Units.IMPERIAL
  }).then(res => {
    if (!res || !res.data) {
      throw new Error("Something went wrong.");
    }
    if (!res.data.predictions) {
      throw new Error(
        `Could not get tide predictions for station ${stationId}. Is the station ID correct?`
      );
    }
    return res.data.predictions;
  });
};

const stationMetadata = (
  stationId: number | string
): Promise<StationMetadata> => {
  return axios
    .get(
      `https://api.tidesandcurrents.noaa.gov/mdapi/prod/webapi/stations/${stationId}.json`,
      {
        params: {
          expand: "details",
        },
      }
    )
    .then(res => {
      if (!res || !res.data) {
        throw new Error("Something went wrong.");
      }

      if (!res.data.stations) {
        throw new Error(`Could not get metadata for station ${stationId}.`);
      }

      const { name, state, lat, lng } = res.data.stations[0];

      return {
        id: stationId,
        name,
        state,
        latitude: lat,
        longitude: lng,
      };
    });
};

/**
 * currentWaterLevel - get the current water level (as average lowest tide recorded) for a given station
 * 
 * @param stationId - ID of a station to get data for (station IDs can be found here: https://tidesandcurrents.noaa.gov/stations.html)
 */
const currentWaterLevel = (
  stationId: number | string,
  units?: Units.IMPERIAL | Units.METRIC
): Promise<ReturnData> => {
  return get(stationId, {
    date: 'latest',
    datum: 'MLLW',
    product: 'water_level',
    units: units ?? Units.IMPERIAL
  }).then(res => res.data.data[0])
}

export default {
  get,
  tidePredictions,
  stationMetadata,
  currentWaterLevel,
  now,
};
