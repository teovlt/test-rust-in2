import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'

export const Prices: CollectionConfig = {
  slug: 'prices',
  labels: {
    singular: 'Price',
    plural: 'Prices',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['label', 'price', 'time', 'order'],
    useAsTitle: 'label',
  },
  fields: [
    {
      name: 'label',
      label: 'Service Label',
      type: 'text',
      required: true,
      admin: {
        description: 'Name of the service (e.g., "Révision complète", "Réparation freins")',
      },
    },
    {
      name: 'price',
      label: 'Price',
      type: 'number',
      required: true,
      min: 0,
      admin: {
        description: 'Price in euros',
      },
    },
    {
      name: 'time',
      label: 'Estimated Time',
      type: 'text',
      required: true,
      admin: {
        description: 'Estimated time for the service (e.g., "30 min", "1h", "2-3h")',
      },
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

