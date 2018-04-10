const parse = require('./')

test('Parsing existing file succeeds', () => {
  const api = parse().validate('data/openapi.yaml')
  expect(api).resolves.not.toBeUndefined()
})

test('Parsing non-existing file fails', () => {
  const api = parse().validate('data/not-openapi.yaml')
  expect(api).rejects.toThrowError()
})
