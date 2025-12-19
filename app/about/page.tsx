import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import Image from 'next/image'
import { prisma } from '@/lib/prisma'

export const metadata = {
  title: 'Our Story | BONBURL - Minimalist Luxury Handbags',
  description: 'The story behind BONBURL. Born from a desire for timeless simplicity and exceptional craftsmanship in women\'s handbags.',
}

export const dynamic = 'force-dynamic'

export default async function AboutPage() {
  const heroBlock = await prisma.contentBlock.findUnique({ where: { slug: 'about-hero' } })
  const originsBlock = await prisma.contentBlock.findUnique({ where: { slug: 'about-origins' } })
  const visual1Block = await prisma.contentBlock.findUnique({ where: { slug: 'about-visual-1' } })
  const visual2Block = await prisma.contentBlock.findUnique({ where: { slug: 'about-visual-2' } })
  const philosophyBlock = await prisma.contentBlock.findUnique({ where: { slug: 'about-philosophy' } })

  return (
    <div className="bg-white min-h-screen font-sans text-gray-900">
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
        <Image
          src={heroBlock?.imageUrl || "https://images.unsplash.com/photo-1605218427368-35b15867f794?q=80&w=2070&auto=format&fit=crop"}
          alt={heroBlock?.title || "BONBURL Atelier"}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-serif text-white tracking-wider">{heroBlock?.title || "The Atelier"}</h1>
        </div>
      </section>

      {/* Narrative Section 1 */}
      <section className="py-24 px-4 max-w-4xl mx-auto text-center space-y-8">
        <span className="text-xs uppercase tracking-[0.2em] text-gray-400 block">{originsBlock?.subtitle || "Origins"}</span>
        <h2 className="text-2xl md:text-4xl font-serif leading-relaxed text-gray-900">
          {originsBlock?.title || "Born from a desire for timeless simplicity."}
        </h2>
        <p className="text-sm md:text-base text-gray-600 leading-loose font-light max-w-2xl mx-auto whitespace-pre-line">
          {originsBlock?.description || "BONBURL was founded in 2023 with a singular vision: to create handbags that transcend trends. In a world of fast fashion and excess, we choose to slow down. We believe that true luxury lies in the subtraction of the unnecessary, leaving only pure form and exceptional material."}
        </p>
      </section>

      {/* Visual Break */}
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative aspect-[4/5] bg-gray-100">
             <Image 
               src={visual1Block?.imageUrl || "https://images.unsplash.com/photo-1549488497-293e4d943265?q=80&w=1887&auto=format&fit=crop"}
               alt="Design Process"
               fill
               className="object-cover"
             />
          </div>
          <div className="relative aspect-[4/5] bg-gray-100 md:mt-24">
             <Image 
               src={visual2Block?.imageUrl || "https://images.unsplash.com/photo-1559563458-527698bf5295?q=80&w=2070&auto=format&fit=crop"}
               alt="Leather Crafting"
               fill
               className="object-cover"
             />
          </div>
        </div>
      </section>

      {/* Narrative Section 2 */}
      <section className="py-24 px-4 max-w-4xl mx-auto text-center space-y-8">
        <span className="text-xs uppercase tracking-[0.2em] text-gray-400 block">{philosophyBlock?.subtitle || "Philosophy"}</span>
        <h2 className="text-2xl md:text-4xl font-serif leading-relaxed text-gray-900">
          {philosophyBlock?.title || "Functionality meets architectural beauty."}
        </h2>
        <p className="text-sm md:text-base text-gray-600 leading-loose font-light max-w-2xl mx-auto whitespace-pre-line">
          {philosophyBlock?.description || "Our design process is rigorous. We study how women move, how they travel, and what they carry. Every curve is intentional, every pocket is placed with purpose. We source the finest full-grain leathers from sustainable tanneries in Italy, ensuring that each piece ages beautifully over time."}
        </p>
      </section>

      <Footer />
    </div>
  )
}
