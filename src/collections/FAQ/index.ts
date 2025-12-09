import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'

export const FAQ: CollectionConfig = {
  slug: 'faq',
  labels: {
    singular: 'FAQ Question',
    plural: 'FAQ',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['question', 'order', 'createdAt'],
    useAsTitle: 'question',
  },
  fields: [
    {
      name: 'question',
      label: 'Question',
      type: 'text',
      required: true,
    },
    {
      name: 'answer',
      label: 'Answer',
      type: 'textarea',
      required: true,
    },
    {
      name: 'order',
      label: 'Display Order',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Lower numbers appear first',
      },
    },
  ],
}
