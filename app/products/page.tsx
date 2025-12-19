import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import Image from 'next/image'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

export const metadata = {
  title: 'Collection | Women\'s Handbags & Accessories',
  description: 'Browse our full range of handbags, backpacks, wallets, and accessories. Premium quality for the discerning woman.',
}

export default async function ProductsIndexPage() {
  const products = await prisma.product.findMany({
    include: { images: true },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="bg-white min-h-screen font-sans text-gray-900">
      <Navbar />
      
      <div className="pt-32 pb-12 px-4 text-center">
        <h1 className="text-3xl md:text-4xl font-serif tracking-widest">Collection</h1>
      </div>

      <section className="py-12 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {products.map((product) => (
            <Link href={`/products/${product.id}`} key={product.id} className="group block">
              <div className="aspect-[4/5] relative bg-gray-100 overflow-hidden mb-6">
                {product.images[0] ? (
                  <Image
                    src={product.images[0].url}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300 bg-gray-50">
                    <span className="text-xs uppercase tracking-widest">No Image</span>
                  </div>
                )}
              </div>
              <h3 className="text-base font-medium tracking-wide uppercase text-gray-900">{product.name}</h3>
              <p className="text-sm text-gray-500 mt-2 font-serif">{product.price}</p>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}
