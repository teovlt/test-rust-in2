import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'

export const ContactInfo: CollectionConfig = {
  slug: 'contact-info',
  labels: {
    singular: 'Contact Information',
    plural: 'Contact Information',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['address', 'email', 'phone'],
    useAsTitle: 'address',
  },
  fields: [
    {
      name: 'address',
      label: 'Address',
      type: 'text',
      required: true,
      admin: {
        description: 'Full address of the business',
      },
    },
    {
      name: 'city',
      label: 'City',
      type: 'text',
      required: true,
    },
    {
      name: 'postalCode',
      label: 'Postal Code',
      type: 'text',
      required: true,
    },
    {
      name: 'country',
      label: 'Country',
      type: 'text',
      required: true,
      defaultValue: 'France',
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      required: true,
    },
    {
      name: 'phone',
      label: 'Phone',
      type: 'text',
      required: true,
      admin: {
        description: 'Phone number with format (e.g., (555) 123-4567)',
      },
    },
    {
      name: 'socialLinks',
      label: 'Social Media Links',
      type: 'group',
      fields: [
        {
          name: 'facebook',
          label: 'Facebook URL',
          type: 'text',
          admin: {
            description: 'Optional Facebook page URL',
          },
        },
        {
          name: 'instagram',
          label: 'Instagram URL',
          type: 'text',
          admin: {
            description: 'Optional Instagram profile URL',
          },
        },
        {
          name: 'twitter',
          label: 'Twitter/X URL',
          type: 'text',
          admin: {
            description: 'Optional Twitter/X profile URL',
          },
        },
        {
          name: 'linkedin',
          label: 'LinkedIn URL',
          type: 'text',
          admin: {
            description: 'Optional LinkedIn page URL',
          },
        },
      ],
    },
  ],
}

