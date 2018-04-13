const openapi = require('./openapi')

describe('Valid OpenAPI object', () => {
  test('includes openapi field', () => {
    openapi.validateOpenAPIObject({ openapi: '3.0.0' })
  })
})
