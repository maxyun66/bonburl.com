import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { prisma } from '@/lib/prisma'
import { ContactForm } from '@/components/ContactForm'

export const dynamic = 'force-dynamic'

export default async function ContactPage() {
  const settings = await prisma.siteSettings.findFirst({
    where: { id: 1 }
  })

  return (
    <div className="bg-white min-h-screen font-sans text-gray-900">
      <Navbar />
      
      <main className="pt-32 pb-16 px-4 md:px-8 max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-serif text-center mb-8">Contact Us</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-2">Email</h3>
              <a href={`mailto:${settings?.email || 'info@bonburl.com'}`} className="text-lg md:text-xl font-medium hover:text-gray-600 transition-colors">
                {settings?.email || 'info@bonburl.com'}
              </a>
            </div>
            
            <div>
              <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-2">Phone / WhatsApp</h3>
              <a href={`tel:${settings?.whatsapp || settings?.phone || '+1234567890'}`} className="text-lg md:text-xl font-medium hover:text-gray-600 transition-colors">
                {settings?.phone || settings?.whatsapp || '+1 (234) 567-890'}
              </a>
            </div>

            <div>
              <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-2">Address</h3>
              <p className="text-lg md:text-xl font-light leading-relaxed whitespace-pre-line">
                {settings?.address || "123 Luxury Avenue,\nParis, 75001\nFrance"}
              </p>
            </div>

            <div>
              <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-2">Business Hours</h3>
              <p className="text-base text-gray-600 font-light">
                Mon - Fri: 10am - 7pm<br />
                Sat - Sun: Closed
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-50 p-6 md:p-8">
             <h2 className="text-xl font-serif mb-6">Send us a message</h2>
             <ContactForm />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
