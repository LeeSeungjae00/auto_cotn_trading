const axios = require('axios').default;
const {v4} = require('uuid');
const sign = require('jsonwebtoken').sign


require("dotenv").config();

const access_key = process.env.UPBIT_ACCESS_KEY
const secret_key = process.env.UPBIT_SECRET_KEY
const server_url = process.env.UPBIT_OPEN_API_SERVER_URL

const payload = {
    access_key: access_key,
    nonce: v4(),
}

const token  = sign(payload, secret_key)

const options  = {
    method: "GET",
    url: server_url + "/v1/accounts",
    headers: {'Authorization': `Bearer ${token}`},
} 

// request(options, (error, response, body) => {
//     if (error) throw new Error(error)
//     console.log(body)
// })

axios({
    method : "GET",
    url: server_url + "/v1/market/all",
})
    .then(res => console.log(res.data))
    .catch(error => console.log(error))
axios(options)
    .then(res => console.log(res.data))
    .catch(error => console.log(error))