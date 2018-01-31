/*
Store for maintaining streaming data across application
*/

const now = Date.now()
const then = new Date()
then.setDate(then.getDate() - 15)

export default {
  state: {
    range: {
      start: then,
      end: now
    },
    data: {}
  }
}
