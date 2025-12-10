import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { ContactClient } from './ContactClient'

export default async function ContactPage() {
  const payload = await getPayload({ config: configPromise })

  // Fetch Opening Hours
  const openingHoursData = await payload.find({
    collection: 'opening-hours',
    limit: 10,
    sort: 'order',
  })

  // Transform Opening Hours data
  const dayLabels: Record<string, string> = {
    lundi: 'Lundi',
    mardi: 'Mardi',
    mercredi: 'Mercredi',
    jeudi: 'Jeudi',
    vendredi: 'Vendredi',
    samedi: 'Samedi',
    dimanche: 'Dimanche',
  }

  const openingHours = openingHoursData.docs.map((hour) => ({
    day: dayLabels[hour.day] || hour.day,
    hours: hour.isClosed ? 'Fermé' : `${hour.openTime || ''} - ${hour.closeTime || ''}`,
    isClosed: hour.isClosed ?? false,
  }))

  return <ContactClient openingHours={openingHours} />
}

// Revalidate data every 60 seconds to pick up new content without redeploying
export const revalidate = 60
