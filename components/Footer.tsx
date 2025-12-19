import { prisma } from '@/lib/prisma'

export async function Footer() {
  const settings = await prisma.siteSettings.findFirst()
  
  return (
    <footer className="bg-gray-50 pt-16 pb-12 px-4 md:pt-24">
       <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-sm text-gray-600">
         <div className="space-y-4">
           <h3 className="uppercase tracking-widest text-black font-bold">Contact</h3>
           {settings?.email && <p className="break-all">{settings.email}</p>}
           {settings?.phone && <p>{settings.phone}</p>}
           {settings?.whatsapp && <p>WhatsApp: <br className="md:hidden" />{settings.whatsapp}</p>}
           {settings?.address && <p className="whitespace-pre-line">{settings.address}</p>}
         </div>
         
         <div className="space-y-4">
           <h3 className="uppercase tracking-widest text-black font-bold">Follow Us</h3>
           <div className="flex flex-col gap-2">
             {settings?.instagram && <a href={settings.instagram} target="_blank" className="hover:text-black transition-colors">Instagram</a>}
             {settings?.tiktok && <a href={settings.tiktok} target="_blank" className="hover:text-black transition-colors">TikTok</a>}
             {settings?.facebook && <a href={settings.facebook} target="_blank" className="hover:text-black transition-colors">Facebook</a>}
             {settings?.shopee && <a href={settings.shopee} target="_blank" className="hover:text-black transition-colors">Shopee</a>}
           </div>
         </div>
         
         <div className="space-y-4 col-span-2 md:col-span-2">
            <h3 className="uppercase tracking-widest text-black font-bold">About</h3>
            <p className="max-w-md leading-relaxed">
              BONBURL represents the essence of minimalist luxury. Designed for the modern woman who appreciates timeless elegance and superior craftsmanship.
            </p>
         </div>
       </div>
       
       <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-gray-200 text-center text-xs text-gray-400">
         &copy; {new Date().getFullYear()} BONBURL. All rights reserved.
       </div>
    </footer>
  )
}
