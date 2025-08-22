import { ref, reactive } from 'vue'

type ContactForm = {
  name: string
  email: string
  phone: string
  message: string
  captcha: string
}

export function useContactForm() {
  const form = reactive<ContactForm>({
    name: '',
    email: '',
    phone: '',
    message: '',
    captcha: ''
  })

  const errors = reactive<Record<string, string>>({})
  const submitting = ref(false)
  const sent = ref(false)

  // 👇 función tipada que usará el componente
  const setCaptchaToken = (t: string) => {
    form.captcha = t
  }

  function validateAll() {
    Object.keys(errors).forEach(k => delete (errors as any)[k])
    if (form.name.trim().length < 2) errors.name = 'Ingresá tu nombre.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Email inválido.'
    if (!form.message.trim()) errors.message = 'Escribí tu consulta.'
    if (!form.captcha) errors.captcha = 'Completá el captcha.'
    return Object.keys(errors).length === 0
  }

  async function submitHandler() {
    submitting.value = true
    try {
      const res = await fetch(import.meta.env.VITE_CONTACT_API || 'http://localhost:3001/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      if (!res.ok || !data.ok) throw new Error(data.error || 'Error al enviar')
      sent.value = true
    } finally {
      submitting.value = false
    }
  }

  function reset() {
    form.name = ''
    form.email = ''
    form.phone = ''
    form.message = ''
    form.captcha = ''
    sent.value = false
    Object.keys(errors).forEach(k => delete (errors as any)[k])
  }

  return {
    form,
    errors,
    submitting,
    sent,
    validateAll,
    reset,
    submitHandler,
    setCaptchaToken // 👈 expuesto
  }
}
