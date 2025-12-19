import { prisma } from '@/lib/prisma'
import Image from 'next/image'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { notFound } from 'next/navigation'

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const product = await prisma.product.findUnique({
    where: { id },
    include: { images: true },
  })

  if (!product) {
    notFound()
  }

  return (
    <div className="bg-white min-h-screen font-sans text-gray-900">
      <Navbar />
      
      <div className="pt-32 pb-24 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
          {/* Images */}
          <div className="space-y-4">
            {product.images.map((image) => (
              <div key={image.id} className="relative aspect-[4/5] bg-gray-50">
                <Image
                  src={image.url}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
            {product.images.length === 0 && (
              <div className="relative aspect-[4/5] bg-gray-50 flex items-center justify-center text-gray-300">
                No Image
              </div>
            )}
          </div>

          {/* Details - Sticky on Desktop */}
          <div className="md:sticky md:top-32 h-fit space-y-8">
            <div>
              <h1 className="text-3xl font-serif tracking-widest text-black mb-2">{product.name}</h1>
              <p className="text-xl text-gray-600 font-serif">{product.price}</p>
            </div>

            <div className="prose text-gray-600 text-sm leading-relaxed whitespace-pre-line">
              <p>{product.description}</p>
            </div>

            <div className="pt-8 border-t border-gray-100 space-y-4">
              {product.purchaseLink ? (
                <a
                  href={product.purchaseLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-4 bg-black text-white text-center text-xs uppercase tracking-widest hover:bg-gray-800 transition-colors"
                >
                  Buy Now
                </a>
              ) : (
                <button disabled className="block w-full py-4 bg-gray-200 text-gray-400 text-center text-xs uppercase tracking-widest cursor-not-allowed">
                  Available in Store
                </button>
              )}
              
              <div className="text-xs text-gray-500 space-y-2 mt-4">
                <p>Category: {product.category}</p>
                <p>Free shipping on all orders.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
