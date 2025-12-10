import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { PricesClient } from './PricesClient'

export default async function PricesPage() {
  const payload = await getPayload({ config: configPromise })

  // Fetch Prices
  const pricesData = await payload.find({
    collection: 'prices',
    limit: 100,
    sort: 'order',
  })

  // Transform Prices data
  const prices = pricesData.docs.map((price) => ({
    label: price.label,
    price: price.price,
    time: price.time,
  }))

  return <PricesClient prices={prices} />
}

// Revalidate data every 60 seconds to pick up new content without redeploying
export const revalidate = 60

export const metadata = {
  title: 'Tarifs - Rust-in',
  description: 'Découvrez nos tarifs de réparation vélo à Toulouse',
}
