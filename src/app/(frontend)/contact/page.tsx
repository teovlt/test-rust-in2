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

  // Fetch Contact Info
  const contactInfoData = await payload.find({
    collection: 'contact-info',
    limit: 1,
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

  // Transform Contact Info data
  const contactInfo =
    contactInfoData.docs.length > 0
      ? {
          address: contactInfoData.docs[0].address || '',
          city: contactInfoData.docs[0].city || '',
          postalCode: contactInfoData.docs[0].postalCode || '',
          country: contactInfoData.docs[0].country || '',
          email: contactInfoData.docs[0].email || '',
          phone: contactInfoData.docs[0].phone || '',
          socialLinks: contactInfoData.docs[0].socialLinks
            ? {
                ...(contactInfoData.docs[0].socialLinks.facebook && {
                  facebook: contactInfoData.docs[0].socialLinks.facebook,
                }),
                ...(contactInfoData.docs[0].socialLinks.instagram && {
                  instagram: contactInfoData.docs[0].socialLinks.instagram,
                }),
                ...(contactInfoData.docs[0].socialLinks.twitter && {
                  twitter: contactInfoData.docs[0].socialLinks.twitter,
                }),
                ...(contactInfoData.docs[0].socialLinks.linkedin && {
                  linkedin: contactInfoData.docs[0].socialLinks.linkedin,
                }),
              }
            : {},
        }
      : null

  return <ContactClient openingHours={openingHours} contactInfo={contactInfo} />
}

// Revalidate data every 60 seconds to pick up new content without redeploying
export const revalidate = 60
