const axios = require('axios')

axios
  .get('https://tidesandcurrents.noaa.gov/api/datagetter', {
    station: 8410140,
    format: 'json',
    time_zone: 'lst_ldt',
    product: 'predictions',
    units: 'english',
    date: 'today',
    datum: 'MLLW',
    interval: 'hilo'
  }).then(res => console.log(res.data))