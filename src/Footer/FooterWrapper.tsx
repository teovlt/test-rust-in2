import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Footer } from './Component'

export async function FooterWrapper() {
  const payload = await getPayload({ config: configPromise })

  // Fetch Contact Info
  const contactInfoData = await payload.find({
    collection: 'contact-info',
    limit: 1,
  })

  // Transform Contact Info data
  const contactInfo = contactInfoData.docs.length > 0
    ? {
        address: contactInfoData.docs[0].address || '',
        city: contactInfoData.docs[0].city || '',
        postalCode: contactInfoData.docs[0].postalCode || '',
        country: contactInfoData.docs[0].country || '',
        email: contactInfoData.docs[0].email || '',
        phone: contactInfoData.docs[0].phone || '',
        socialLinks: contactInfoData.docs[0].socialLinks || {},
      }
    : null

  return <Footer contactInfo={contactInfo} />
}

