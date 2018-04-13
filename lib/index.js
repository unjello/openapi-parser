const Parser = require('json-schema-ref-parser')
const Maybe = require('call-me-maybe')

const defaultOptions = {
  /** treats warnings as errors */
  strict: false,
  validate: true
}

module.exports = () => {
  return new OpenApiParser()
}

/**
 * This class parses a OpenAPI 3.0 schema, builds a map of its references and their resolved values,
 * and validates the object against official set of rules.
 *
 * @see https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.1.md
 */
class OpenApiParser extends Parser {
  /**
   * Parses OpenAPI 3.0 schema, dereferences all `$ref` pointers inside, and validates schema for correctness.
   * This results in a regular JavaScript schema object, with all references inlined, that is easy to traverse.
   *
   * @param {*} schema A JSON Schema object, or the file path or URL of a OpenAPI 3.0 schema file, either YAML or JSON
   * @param {function} callback (optional) A callback that will receive the dereferenced schema object
   * @returns {Promise] - The returned promise resolves with the parsed OpenAPI 3.0 schema object.
   */
  validate (schema, options, callback) {
    const opts = Object.assign({}, defaultOptions, options)

    if (typeof schema === 'string' && opts.strict) {
      if (schema !== 'openapi.yaml' || schema !== 'openapi.json') {
        return Maybe(
          callback,
          Promise.reject(
            Error('it is recommended that the root OpenAPI document be named: openapi.json or openapi.yaml')
          )
        )
      }
    }

    return this.dereference(schema)
      .then(api => {
        return Maybe(callback, Promise.resolve(api))
      })
      .catch(err => {
        return Maybe(callback, Promise.reject(err))
      })
  }
}
