const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding...')

  // 0. Seed Admin User
  const existingAdmin = await prisma.adminUser.findUnique({
    where: { username: 'admin' }
  })

  if (!existingAdmin) {
    await prisma.adminUser.create({
      data: {
        username: 'admin',
        password: 'admin123', // In a real app, use bcrypt to hash this!
      }
    })
    console.log('Admin user created: admin / admin123')
  } else {
    console.log('Admin user already exists.')
  }

  // 1. Clear existing data
  await prisma.productImage.deleteMany()
  await prisma.product.deleteMany()
  await prisma.banner.deleteMany()
  await prisma.contentBlock.deleteMany()
  await prisma.siteSettings.deleteMany()

  // 2. Seed Site Settings
  await prisma.siteSettings.create({
    data: {
      siteName: 'BONBURL',
      email: 'contact@bonburl.com',
      phone: '+62 812 3456 7890',
      whatsapp: '6281234567890',
      instagram: 'https://instagram.com/bonburl',
      tiktok: 'https://tiktok.com/@bonburl',
      shopee: 'https://shopee.co.id/bonburl',
      address: 'Jakarta, Indonesia',
    }
  })

  // 3. Seed Banners (Carousel)
  await prisma.banner.create({
    data: {
      title: 'Timeless Collection',
      subtitle: 'Timeless Elegance & Modern Craft',
      imageUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=2535&auto=format&fit=crop',
      mobileImageUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop',
      link: '/products',
      linkText: 'Discover Collection',
      order: 1,
      active: true,
    }
  })

  await prisma.banner.create({
    data: {
      title: 'New Season',
      subtitle: 'Discover the new shades of the season',
      imageUrl: 'https://images.unsplash.com/photo-1445633629932-0029acc44e88?q=80&w=1887&auto=format&fit=crop',
      mobileImageUrl: 'https://images.unsplash.com/photo-1445633629932-0029acc44e88?q=80&w=800&auto=format&fit=crop',
      link: '/products?new=true',
      linkText: 'Shop New Arrivals',
      order: 2,
      active: true,
    }
  })
  
  await prisma.banner.create({
    data: {
      title: 'Signature Style',
      subtitle: 'Minimalist luxury for the modern woman',
      imageUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=2069&auto=format&fit=crop',
      mobileImageUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop',
      link: '/products?category=Handbag',
      linkText: 'Explore Handbags',
      order: 3,
      active: true,
    }
  })

  // 4. Seed Content Blocks
  // Campaign
  await prisma.contentBlock.create({
    data: {
      slug: 'home-campaign',
      name: 'Homepage Campaign Section',
      title: 'The Summer Campaign',
      subtitle: 'Discover the new shades of the season. A palette inspired by the mediterranean coast.',
      imageUrl: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?q=80&w=2557&auto=format&fit=crop',
      link: '/products',
      linkText: 'Explore Campaign',
    }
  })

  // Craftsmanship
  await prisma.contentBlock.create({
    data: {
      slug: 'home-craftsmanship',
      name: 'Homepage Craftsmanship Section',
      title: 'Exceptional Craftsmanship',
      subtitle: 'Savoir-Faire',
      description: 'Our factory combines traditional techniques with modern precision. Every stitch is placed with intention, ensuring durability and elegance that lasts a lifetime.',
      imageUrl: 'https://images.unsplash.com/photo-1559563458-527698bf5295?q=80&w=2070&auto=format&fit=crop',
      link: '/about',
      linkText: 'Read Our Story',
    }
  })
  
  // Category Showcase Images
  await prisma.contentBlock.create({
    data: {
      slug: 'home-cat-handbag',
      name: 'Homepage Category: Handbags',
      title: 'Handbags',
      imageUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=2069&auto=format&fit=crop',
      link: '/products?category=Handbag',
      linkText: 'Explore',
    }
  })
  
  await prisma.contentBlock.create({
    data: {
      slug: 'home-cat-wallet',
      name: 'Homepage Category: Wallets',
      title: 'Small Leather Goods',
      imageUrl: 'https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=1887&auto=format&fit=crop',
      link: '/products?category=Wallet',
      linkText: 'Shop Now',
    }
  })
  
  await prisma.contentBlock.create({
    data: {
      slug: 'home-cat-accessories',
      name: 'Homepage Category: Accessories',
      title: 'Accessories',
      imageUrl: 'https://images.unsplash.com/photo-1445633629932-0029acc44e88?q=80&w=1887&auto=format&fit=crop',
      link: '/products',
      linkText: 'Discover',
    }
  })

  // 5. Seed Products
  const products = [
    {
      name: 'Numéro Un - Camel',
      description: 'Undoubtedly the brand’s signature model. A bag with curves and rounded lines, representing a confident and feminine style.',
      price: 'Rp 5.800.000',
      category: 'Handbag',
      images: [
        'https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=1974&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?q=80&w=2071&auto=format&fit=crop'
      ]
    },
    {
      name: 'Mini Plissé - Black',
      description: 'The Mini Plissé is a nod to the art of folding. Its sculptural leather drapes like a fabric, creating a unique and sophisticated silhouette.',
      price: 'Rp 4.200.000',
      category: 'Handbag',
      images: [
        'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=2069&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1585916420730-d7f95e942d43?q=80&w=1974&auto=format&fit=crop'
      ]
    },
    {
      name: 'Canvas Tote',
      description: 'Designed for the modern traveler. Spacious, durable, and effortlessly chic. The perfect companion for your daily adventures.',
      price: 'Rp 3.500.000',
      category: 'Handbag',
      images: [
        'https://images.unsplash.com/photo-1590874102987-fdaef75c37c2?q=80&w=1972&auto=format&fit=crop'
      ]
    },
    {
      name: 'Classic Wallet',
      description: 'Minimalist design meets maximum functionality. Crafted from full-grain textured calf leather.',
      price: 'Rp 1.200.000',
      category: 'Wallet',
      images: [
        'https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=1887&auto=format&fit=crop'
      ]
    },
  ]

  for (const p of products) {
    await prisma.product.create({
      data: {
        name: p.name,
        description: p.description,
        price: p.price,
        category: p.category,
        purchaseLink: 'https://shopee.co.id',
        images: {
          create: p.images.map((url, idx) => ({
            url,
            isMain: idx === 0
          }))
        }
      }
    })
  }

  console.log('Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
