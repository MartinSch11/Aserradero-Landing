import { describe, it, expect } from 'vitest'
import { useContactForm } from '@/composables/useContactForm'

describe('useContactForm', () => {
  it('valida email correctamente', () => {
    const { _priv } = useContactForm()
    expect(_priv.validateEmail('')).toBeTruthy()
    expect(_priv.validateEmail('a@b')).toBeTruthy()
    expect(_priv.validateEmail('test@mail.com')).toBeNull()
  })

  it('valida longitud de mensaje', () => {
    const { _priv } = useContactForm()
    expect(_priv.validateMessage('')).toBeTruthy()
    expect(_priv.validateMessage('a'.repeat(200))).toBeNull()
    expect(_priv.validateMessage('a'.repeat(201))).toBeTruthy()
  })

  it('permite teléfono vacío y valida formatos comunes', () => {
    const { _priv } = useContactForm()
    expect(_priv.validatePhone('')).toBeNull()
    expect(_priv.validatePhone('+54 9 11 5555-5555')).toBeNull()
    expect(_priv.validatePhone('abc')).toBeTruthy()
  })
})
