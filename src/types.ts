export enum Products {
  WATER_LEVEL = "water_level",
  AIR_TEMP = "air_temperature",
  WATER_TEMP = "water_temp",
  WIND = "wind",
  AIR_PRESSURE = "air_pressure",
  AIR_GAP = "air_gap",
  CONDUCTIVITY = "conductivity",
  VISIBILITY = "visibility",
  HUMIDITY = "humidity",
  SALINITY = "salinity",
  HOURLY_HEIGHT = "hourly_height",
  HIGH_LOW = "high_low",
  DAILY_MEAN = "daily_mean",
  MONTHLY_MEAN = "monthly_mean",
  ONE_MIN_WATER_LEVEL = "one_minute_water_level",
  TIDE_PREDICTIONS = "predictions",
  DATUMS = "datums",
  CURRENTS = "currents",
  CURRENT_PREDICTIONS = "currents_predictions",
}

export enum Datum {
  CRD = "CRD",
  IGLD = "IGLD",
  LWD = "LWD",
  MHHW = "MHHW",
  MHW = "MHW",
  MTL = "MTL",
  MSL = "MSL",
  MLW = "MLW",
  MLLW = "MLLW",
  NAVD = "NAVD",
  STND = "STND",
}

export enum TimeZones {
  GST = "gst",
  LST = "lst",
  LDT = "lst_ldt",
}

export enum Units {
  IMPERIAL = "english",
  METRIC = "metric",
}

export interface Params {
  product: string;
  format?: "json" | "csv" | "xml";
  time_zone?: "gmt" | "lst" | "lst_ldt";
  units?: "english" | "metric";
  date?: string;
  begin_date?: string;
  end_date?: string;
  range?: string;
  datum?: string;
  interval?: string | number;
  bin?: number;
  vel_type?: string;
}

export interface ReturnData {
  t: string;
  v: string;
  type?: string;
}
