# What's it do?


https://user-images.githubusercontent.com/3193546/126076459-7282f925-96b7-4ebd-bfe3-b9b83ccfecf0.mp4



### How to run
```
npm install

set API_KEY=...
set ORGANIZATION_ID=...
set NETWORK_ID=...
set CLIENT_ID=...
node server.js
```
Then navigate to: http://localhost:8080

### Create docker image
```
docker build . -t meraki
docker run -p 8080:8080 --env API_KEY=hi --env ORGANIZATION_ID=hi --env NETWORK_ID=hi --env CLIENT_ID=hi -d meraki
```
