const parse = require('./')

describe('Parsing OpenAPI schema', () => {
  test('from object succeeds', () => {
    const api = parse().validate(JSON.parse(`{"openapi": "3.0.0"}`))
    expect(api).resolves.not.toBeUndefined()
  })
  test('from existing yaml file succeeds', () => {
    const api = parse().validate('data/openapi.yaml')
    expect(api).resolves.not.toBeUndefined()
  })
  test('from existing json file succeeds', () => {
    const api = parse().validate('data/api.json')
    expect(api).resolves.not.toBeUndefined()
  })
  test('from file with not recommended name fails in strict mode', () => {
    const api = parse().validate('data/api.json', { strict: true })
    expect(api).rejects.toThrowError()
  })
  test('from non-existing file fails', () => {
    const api = parse().validate('data/not-openapi.yaml')
    expect(api).rejects.toThrowError()
  })
  test('from undefined fails', () => {
    const api = parse().validate(undefined)
    expect(api).rejects.toThrowError()
  })
  test('from null fails', () => {
    const api = parse().validate(null)
    expect(api).rejects.toThrowError()
  })
  test('from empty string fails', () => {
    const api = parse().validate('')
    expect(api).rejects.toThrowError()
  })
})
