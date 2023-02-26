import { isJson } from './isJson'

describe('isJson', () => {
  it('should pass with a JSON object string', () => {
    const input = JSON.stringify({
      name: 'Dexter',
      job: 'React Developer'
    })

    const isJsonReturn = isJson(input);

    expect(isJsonReturn).toBe(true)
  })

  it('should pass with a JSON array string', () => {
    const input = JSON.stringify([
      'Apple',
      'Orange'
    ])

    const isJsonReturn = isJson(input);

    expect(isJsonReturn).toBe(true)
  })

  it('should pass with a JSON string string', () => {
    const input = JSON.stringify('Apple')

    const isJsonReturn = isJson(input);

    expect(isJsonReturn).toBe(true)
  })

  it('should pass with a JSON number string', () => {
    const input = JSON.stringify(1)

    const isJsonReturn = isJson(input);

    expect(isJsonReturn).toBe(true)
  })

  it('should pass with a JSON boolean string', () => {
    const input = JSON.stringify(true)

    const isJsonReturn = isJson(input);

    expect(isJsonReturn).toBe(true)
  })

  it('should fail with a plain string', () => {
    const input = 'apple';

    const isJsonReturn = isJson(input);

    expect(isJsonReturn).toBe(false)
  })
})
