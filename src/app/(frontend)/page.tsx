import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { HomePageClient } from './HomePageClient'

export default async function HomePage() {
  const payload = await getPayload({ config: configPromise })

  // Fetch reviews
  const reviewsData = await payload.find({
    collection: 'reviews',
    limit: 20,
    sort: '-createdAt',
  })

  // Fetch FAQ
  const faqData = await payload.find({
    collection: 'faq',
    limit: 50,
    sort: 'order',
  })

  // Transform reviews data
  const reviews = reviewsData.docs.map((review) => ({
    name: review.name,
    image: typeof review.image === 'object' && review.image?.url ? review.image.url : null,
    rating: review.rating,
    text: review.text,
  }))

  // Transform FAQ data
  const faq = faqData.docs.map((item) => ({
    question: item.question,
    answer: item.answer,
  }))

  return <HomePageClient reviews={reviews} faq={faq} />
}
