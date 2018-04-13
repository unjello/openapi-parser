const validateOpenAPI = schema => {
  validateOpenAPIObject(schema)
}

const validateOpenAPIObject = schema => {
  if (!schema.hasOwnProperty('openapi')) throw new Error('openapi field is REQUIRED in root object')
  if (typeof schema.openapi !== 'string') throw new Error('openapi field is MUST be a string')
  if (schema.openapi !== '3.0.0') throw new Error('parser supports openapi version 3.0.0')
}

module.exports = {
  validateOpenAPI,
  validateOpenAPIObject
}
