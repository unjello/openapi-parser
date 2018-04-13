const openapi = require('./openapi')

describe('Valid OpenAPI object', () => {
  const openapiObject = { openapi: '3.0.0' }

  test('includes openapi field', () => {
    expect(() => openapi.validateOpenAPIField(openapiObject)).not.toThrowError()
  })
})

describe('Invalid OpenAPI object', () => {
  test('has openapi field missing', () => {
    expect(() => openapi.validateOpenAPIField({})).toThrowError()
  })
  test('has openapi field different than string', () => {
    expect(() => openapi.validateOpenAPIField({ openapi: 3 })).toThrowError()
  })
  test('has unsupported openapi version', () => {
    expect(() => openapi.validateOpenAPIField({ openapi: '2.0.0' })).toThrowError()
  })
})
