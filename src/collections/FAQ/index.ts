import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'

export const FAQ: CollectionConfig = {
  slug: 'faq',
  labels: {
    singular: 'Question FAQ',
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
      label: 'Réponse',
      type: 'textarea',
      required: true,
    },
    {
      name: 'order',
      label: "Ordre d'affichage",
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Les numéros les plus bas apparaissent en premier',
      },
    },
  ],
}
