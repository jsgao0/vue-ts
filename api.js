const run = require('restful-json-api')
run({
  webPort: 3000,
  apiPort: 3001,
  fakeFolder: 'src/api',
  pathPrefix: '/api',
})
