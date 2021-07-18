const express = require('express');
const path = require('path');
const axios = require('axios')

const app = express();

const config = {
  port: process.env.PORT || 8080,
  apiKey: process.env.API_KEY,
  organizationId: process.env.ORGANIZATION_ID,
  networkId: process.env.NETWORK_ID,
  clientId: process.env.CLIENT_ID
}
Object.keys(config).forEach(key => {
  if (!config[key])
    throw new Error(`Missing config: ${key}`)
})

const client = axios.create({
  baseURL: 'https://api.meraki.com',
  headers: {
    'X-Cisco-Meraki-API-Key': config.apiKey
  },
})
const url = `/api/v0/organizations/${config.organizationId}/networks/${config.networkId}/clients/${config.clientId}/policy`
console.log(url)

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/toggle', async function(req, res) {
  const {data} = await client.get(url);
  console.log('got initial data', data);

  let newType;
  // let new
  if (data.type === 'Normal') {
    console.log('setting group policy')
    const r = await client.put(url, {
      devicePolicy: 'Group policy',
      groupPolicyId: '100'
    })
    console.log(r.data)
    newType = 'Group policy'
  } else {
    console.log('settign normal')
    await client.put(url, {
      devicePolicy: 'Normal'
    })
    newType = 'Normal'
  }

  // console.log(data)
  res.json({
    type: newType
  })
})

app.listen(config.port);
console.log('Server started at http://localhost:' + config.port);
