import axios from 'axios'

export default {
  login: function (username, password) {
    axios.post('http://localhost:3000/auth', {identifiant: username, password: password})
      .then((res) => {
        console.log(res.data)
      })
      .catch((err) => { console.error(err.response.data) })
  }
}
