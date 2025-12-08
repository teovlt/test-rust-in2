import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'

export const Reviews: CollectionConfig = {
  slug: 'reviews',
  labels: {
    singular: 'Avis',
    plural: 'Avis',
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
      label: 'Nom du client',
      type: 'text',
      required: true,
    },
    {
      name: 'image',
      label: 'Photo du client',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'rating',
      label: 'Note',
      type: 'number',
      required: true,
      min: 1,
      max: 5,
      defaultValue: 5,
      admin: {
        description: 'Note de 1 à 5 étoiles',
      },
    },
    {
      name: 'text',
      label: 'Commentaire',
      type: 'textarea',
      required: true,
    },
  ],
}

