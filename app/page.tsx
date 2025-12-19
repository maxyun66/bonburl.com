import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import Image from 'next/image'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { HeroCarousel } from '@/components/HeroCarousel'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'BONBURL | Premium Women\'s Handbags & Distributor Opportunities',
  description: 'Explore BONBURL\'s collection of minimalist luxury handbags. We are also looking for partners and distributors (女包分销) to join our global network.',
}

export default async function Home() {
  const products = await prisma.product.findMany({
    take: 8, // Fetch enough for Desktop 2 rows (4 cols * 2 = 8 items)
    include: { images: true },
    orderBy: [
      { order: 'desc' }, // Higher order = Higher priority (show first)
      { createdAt: 'desc' }
    ],
  })

  const banners = await prisma.banner.findMany({
    where: { active: true },
    orderBy: { order: 'asc' }
  })

  // Fetch Content Blocks
  const campaignBlock = await prisma.contentBlock.findUnique({ where: { slug: 'home-campaign' } })
  const craftBlock = await prisma.contentBlock.findUnique({ where: { slug: 'home-craftsmanship' } })
  
  const catHandbag = await prisma.contentBlock.findUnique({ where: { slug: 'home-cat-handbag' } })
  const catWallet = await prisma.contentBlock.findUnique({ where: { slug: 'home-cat-wallet' } })
  const catAccessory = await prisma.contentBlock.findUnique({ where: { slug: 'home-cat-accessories' } })

  return (
    <div className="bg-white min-h-screen font-sans text-gray-900 overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section (Carousel) */}
      <HeroCarousel banners={banners} />

      {/* Brand Introduction / Philosophy */}
      <section className="py-16 px-4 md:py-32 md:px-6 max-w-4xl mx-auto text-center">
        <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-gray-400 block mb-4 md:mb-6">The Philosophy</span>
        <h2 className="text-2xl md:text-4xl font-serif leading-relaxed text-gray-900 mb-6 md:mb-8">
          We believe in the quiet power of <br className="hidden md:block"/>
          <span className="italic">understated luxury</span>.
        </h2>
        <p className="text-xs md:text-base text-gray-500 leading-loose font-light max-w-2xl mx-auto">
          Every BONBURL piece is a testament to architectural form and functional beauty. 
          Designed in our Paris atelier and crafted by expert artisans, our collections 
          transcend seasons to become lifelong companions.
        </p>
      </section>

      {/* Category Grid - "Shop by Category" */}
      <section className="px-4 pb-32 max-w-[1920px] mx-auto">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href={catHandbag?.link || "/products?category=Handbag"} className="group relative aspect-[16/9] md:h-[600px] md:aspect-auto overflow-hidden block">
              <Image 
                src={catHandbag?.imageUrl || "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=2069&auto=format&fit=crop"} 
                alt={catHandbag?.title || "Handbags"} 
                fill 
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-500" />
              <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 text-white">
                <h3 className="text-xl md:text-2xl font-serif tracking-widest mb-2">{catHandbag?.title || "Handbags"}</h3>
                <span className="text-xs uppercase tracking-[0.2em] border-b border-white pb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0 block w-fit">
                  {catHandbag?.linkText || "Explore"}
                </span>
              </div>
            </Link>
            <div className="grid grid-rows-2 gap-4 md:h-[600px]">
              <Link href={catWallet?.link || "/products?category=Wallet"} className="group relative aspect-[16/9] md:aspect-auto overflow-hidden block h-full">
                <Image 
                  src={catWallet?.imageUrl || "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=1887&auto=format&fit=crop"} 
                  alt={catWallet?.title || "Small Leather Goods"} 
                  fill 
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-500" />
                <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 text-white">
                  <h3 className="text-lg md:text-xl font-serif tracking-widest mb-2">{catWallet?.title || "Small Leather Goods"}</h3>
                  <span className="text-xs uppercase tracking-[0.2em] border-b border-white pb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0 block w-fit">
                    {catWallet?.linkText || "Shop Now"}
                  </span>
                </div>
              </Link>
              <Link href={catAccessory?.link || "/products"} className="group relative aspect-[16/9] md:aspect-auto overflow-hidden block h-full">
                 <Image 
                  src={catAccessory?.imageUrl || "https://images.unsplash.com/photo-1445633629932-0029acc44e88?q=80&w=1887&auto=format&fit=crop"} 
                  alt={catAccessory?.title || "Accessories"} 
                  fill 
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-500" />
                <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 text-white">
                  <h3 className="text-lg md:text-xl font-serif tracking-widest mb-2">{catAccessory?.title || "Accessories"}</h3>
                  <span className="text-xs uppercase tracking-[0.2em] border-b border-white pb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0 block w-fit">
                    {catAccessory?.linkText || "Discover"}
                  </span>
                </div>
              </Link>
            </div>
         </div>
      </section>

      {/* Featured Products */}
      <section className="pb-32 px-4 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-8 md:mb-16 px-2">
          <h2 className="text-2xl md:text-3xl font-serif tracking-wide">New Arrivals</h2>
          <Link href="/products" className="text-xs uppercase tracking-widest hover:text-gray-600 transition-colors border-b border-black pb-1">View All</Link>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 md:gap-x-8 gap-y-8 md:gap-y-16">
          {products.map((product, idx) => (
            <Link 
              href={`/products/${product.id}`} 
              key={product.id} 
              className={`group block ${
                // Mobile: Show only first 6 items (3 rows * 2 cols = 6)
                // Desktop: Show all 8 items (2 rows * 4 cols = 8)
                idx >= 6 ? 'hidden lg:block' : ''
              }`}
            >
              <div className="aspect-[4/5] relative bg-gray-50 overflow-hidden mb-4 md:mb-6">
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
                {product.isNew && (
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-2 py-1 text-[10px] uppercase tracking-widest">New</div>
                )}
              </div>
              <h3 className="text-sm md:text-base font-medium tracking-wide uppercase text-gray-900 group-hover:text-gray-600 transition-colors line-clamp-1">{product.name}</h3>
              <p className="text-xs md:text-sm text-gray-500 mt-1 md:mt-2 font-serif">{product.price}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Editorial / Campaign Section */}
      <section className="relative w-full aspect-[4/5] md:h-[80vh] md:aspect-auto overflow-hidden mb-32">
        <Image 
          src={campaignBlock?.imageUrl || "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?q=80&w=2557&auto=format&fit=crop"}
          alt={campaignBlock?.title || "Campaign"}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute bottom-0 left-0 p-8 md:p-24 text-white max-w-2xl">
          <h2 className="text-4xl md:text-6xl font-serif mb-6 leading-tight whitespace-pre-wrap">
            {campaignBlock?.title || "The Summer \n Campaign"}
          </h2>
          <p className="text-lg font-light opacity-90 mb-8 max-w-md">
            {campaignBlock?.subtitle || "Discover the new shades of the season. A palette inspired by the mediterranean coast."}
          </p>
          <Link 
            href={campaignBlock?.link || "/products"} 
            className="inline-block border-b border-white pb-1 text-sm uppercase tracking-[0.2em] hover:opacity-70 transition-opacity"
          >
            {campaignBlock?.linkText || "Explore Campaign"}
          </Link>
        </div>
      </section>

      {/* Craftsmanship / Details */}
      <section className="max-w-7xl mx-auto px-4 pb-16 md:pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
          <div className="order-2 md:order-1 relative aspect-[16/9] md:aspect-[4/5] overflow-hidden bg-gray-100">
             <Image 
              src={craftBlock?.mobileImageUrl || craftBlock?.imageUrl || "https://images.unsplash.com/photo-1559563458-527698bf5295?q=80&w=2070&auto=format&fit=crop"}
              alt={craftBlock?.title || "Craftsmanship"}
              fill
              className="object-cover md:hidden"
            />
            <Image 
              src={craftBlock?.imageUrl || "https://images.unsplash.com/photo-1559563458-527698bf5295?q=80&w=2070&auto=format&fit=crop"}
              alt={craftBlock?.title || "Craftsmanship"}
              fill
              className="object-cover hidden md:block"
            />
          </div>
          <div className="order-1 md:order-2 space-y-4 md:space-y-8 md:pl-12">
            <span className="text-xs uppercase tracking-[0.2em] text-gray-400">{craftBlock?.subtitle || "Savoir-Faire"}</span>
            <h2 className="text-2xl md:text-4xl font-serif">{craftBlock?.title || "Exceptional Craftsmanship"}</h2>
            <div className="w-12 h-[1px] bg-black"></div>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed font-light">
              {craftBlock?.description || "Our leathers are selected from the best tanneries in Italy and Spain. Each bag is assembled by hand, respecting the traditional methods of leather goods. Attention to detail is our obsession, from the stitch to the painted edge."}
            </p>
            <Link 
              href={craftBlock?.link || "/about"} 
              className="inline-block pt-2 md:pt-4 text-xs uppercase tracking-widest border-b border-gray-300 pb-1 hover:border-black transition-colors"
            >
              {craftBlock?.linkText || "Read Our Story"}
            </Link>
          </div>
        </div>
      </section>

      {/* Distributor Recruitment */}
      <section className="bg-[#f9f9f9] py-24 px-4 text-center">
        <div className="max-w-md mx-auto space-y-6">
          <h2 className="text-2xl font-serif tracking-wide">Become Our Distributor</h2>
          <p className="text-gray-500 text-sm font-light">
            Do you want to become our distributor? Please contact us.
          </p>
          <div className="pt-4">
            <Link 
              href="/contact" 
              className="inline-block px-8 py-3 border border-black text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
