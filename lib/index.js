const Parser = require('json-schema-ref-parser')
const Maybe = require('call-me-maybe')

module.exports = (api) => {
  return new OpenApiParser(api)
}

class OpenApiParser extends Parser {
  validate (path, callback) {
    return this.dereference(path)
      .then(api => {
        return Maybe(callback, Promise.resolve(api))
      })
      .catch(err => {
        return Maybe(callback, Promise.reject(err))
      })
  }
}
