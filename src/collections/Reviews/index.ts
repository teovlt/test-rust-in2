import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'

export const Reviews: CollectionConfig = {
  slug: 'reviews',
  labels: {
    singular: 'Review',
    plural: 'Reviews',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'rating', 'createdAt'],
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      label: 'Customer Name',
      type: 'text',
      required: true,
    },
    {
      name: 'image',
      label: 'Customer Photo',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'rating',
      label: 'Rating',
      type: 'number',
      required: true,
      min: 1,
      max: 5,
      defaultValue: 5,
      admin: {
        description: 'Rating from 1 to 5 stars',
      },
    },
    {
      name: 'text',
      label: 'Comment',
      type: 'textarea',
      required: true,
    },
  ],
}
