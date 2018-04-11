const Parser = require('json-schema-ref-parser')
const Maybe = require('call-me-maybe')

module.exports = (api) => {
  return new OpenApiParser(api)
}

class OpenApiParser extends Parser {
    validate (schema, callback) {
    return this.dereference(schema)
      .then(api => {
        return Maybe(callback, Promise.resolve(api))
      })
      .catch(err => {
        return Maybe(callback, Promise.reject(err))
      })
  }
}
