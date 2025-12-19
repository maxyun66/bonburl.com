'use client'

import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { RefreshCcw } from 'lucide-react'

export function ContactForm() {
  const [loading, setLoading] = useState(false)
  const [captchaQuestion, setCaptchaQuestion] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    captcha: ''
  })

  const refreshCaptcha = async () => {
    try {
      const res = await fetch(`/api/captcha?t=${Date.now()}`)
      const data = await res.json()
      setCaptchaQuestion(data.question)
      setFormData(prev => ({ ...prev, captcha: '' }))
    } catch (error) {
      console.error('Failed to fetch captcha:', error)
    }
  }

  useEffect(() => {
    refreshCaptcha()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong')
      }

      toast.success('Message sent successfully! We will get back to you soon.')
      setFormData({ name: '', email: '', message: '', captcha: '' })
      refreshCaptcha()
    } catch (error: any) {
      toast.error(error.message)
      refreshCaptcha()
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Name</label>
        <input 
          type="text" 
          id="name"
          required
          value={formData.name}
          onChange={e => setFormData({...formData, name: e.target.value})}
          className="w-full bg-white border border-gray-200 p-3 focus:outline-none focus:border-black transition-colors"
          placeholder="Your Name"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Email</label>
        <input 
          type="email" 
          id="email"
          required
          value={formData.email}
          onChange={e => setFormData({...formData, email: e.target.value})}
          className="w-full bg-white border border-gray-200 p-3 focus:outline-none focus:border-black transition-colors"
          placeholder="Your Email"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Message</label>
        <textarea 
          id="message"
          rows={4}
          required
          value={formData.message}
          onChange={e => setFormData({...formData, message: e.target.value})}
          className="w-full bg-white border border-gray-200 p-3 focus:outline-none focus:border-black transition-colors"
          placeholder="How can we help you?"
        />
      </div>

      {/* Captcha Field */}
      <div>
        <label htmlFor="captcha" className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
          Verification: {captchaQuestion}
        </label>
        <div className="flex gap-4">
          <input 
            type="text" 
            id="captcha"
            required
            value={formData.captcha}
            onChange={e => setFormData({...formData, captcha: e.target.value})}
            className="flex-1 bg-white border border-gray-200 p-3 focus:outline-none focus:border-black transition-colors"
            placeholder="Enter the result"
          />
          <button 
            type="button" 
            onClick={refreshCaptcha} 
            className="px-4 bg-gray-100 border border-gray-200 hover:bg-gray-200 transition-colors flex items-center justify-center"
            title="Refresh Question"
          >
            <RefreshCcw className="w-4 h-4 text-black" />
          </button>
        </div>
      </div>

      <button 
        type="submit" 
        disabled={loading}
        className="w-full bg-black text-white py-4 text-xs uppercase tracking-widest hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  )
}