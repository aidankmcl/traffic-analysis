/*
Requests required for Data handling
*/

import { buildRangeRequest } from './helpers.js'

const getBandwidth = buildRangeRequest('http://localhost:3000/bandwidth')
const getAudience = buildRangeRequest('http://localhost:3000/audience')

export default {
  getBandwidth,
  getAudience
}
