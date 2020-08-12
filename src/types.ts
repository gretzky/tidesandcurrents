export enum Products {
  WATER_LEVEL = "water_level",
  AIR_TEMP = "air_temperature",
  WATER_TEMP = "water_temperature",
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
  GMT = "gmt",
  LST = "lst",
  LDT = "lst_ldt",
}

export enum Units {
  IMPERIAL = "english",
  METRIC = "metric",
}

export enum Symbols {
  DEGREE = "degree",
  SPEED = "speed",
  HEIGHT = "height",
  PRESSURE = "pressure",
}

export enum MoonPhases {
  NEW = "new",
  WAX_CRES = "waxing crescent",
  QUAR_CRES = "quarter crescent",
  WAX_GIBB = "waxing gibbous",
  FULL = "full",
  WAN_GIBB = "waning gibbous",
  LAST_QUAR = "last quarter",
  WAN_CRES = "waning crescent",
}

export type MeasurementSystem = Units.IMPERIAL | Units.METRIC;

export interface UnitSymbols {
  degree: string;
  height: string;
  speed: string;
  pressure: string;
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

export interface RawReturnData {
  t: string;
  v: string | number;
  type: string;
}

export interface FormattedReturnData {
  time: string;
  rawValue: number | string;
  value: string;
  type?: string;
}

export interface StationMetadata {
  id?: number | string;
  name?: string;
  state?: string;
  latitude?: number;
  longitude?: number;
  error?: string | null;
}

export interface ReturnData {
  data: RawReturnData[];
}

export interface RawWindData {
  t: string;
  s: number;
  g: number;
  dr: string;
}

export interface RawWindReturnData {
  data: RawWindData[];
}

export interface FormattedWindReturnData {
  time: string;
  rawSpeed: number;
  speed: string;
  rawGust: number;
  gust: string;
  direction: string;
}

export interface Moonlight {
  rise: Date;
  set: Date;
  alwaysUp?: boolean;
  alwaysDown?: boolean;
}

export interface Sunlight {
  sunrise: Date;
  sunriseEnd: Date;
  goldenHourEnd: Date;
  solarNoon: Date;
  sunsetStart: Date;
  sunset: Date;
  dusk: Date;
  nauticalDusk: Date;
  night: Date;
  nadir: Date;
  nightEnd: Date;
  nauticalDawn: Date;
  dawn: Date;
}
