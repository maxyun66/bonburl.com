import { prisma } from '@/lib/prisma'
import { ContentBlockForm } from '@/components/admin/ContentBlockForm'

export default async function EditContentPage({ params }: { params: { id: string } }) {
  const { id } = await params
  const block = await prisma.contentBlock.findUnique({
    where: { id },
  })

  if (!block) {
    return <div>Content Block not found</div>
  }

  return <ContentBlockForm block={block} />
}
