import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'

export const Prices: CollectionConfig = {
  slug: 'prices',
  labels: {
    singular: 'Tarif',
    plural: 'Tarifs',
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
      label: 'Nom du service',
      type: 'text',
      required: true,
      admin: {
        description: 'Nom de la prestation (ex : "Révision complète", "Réparation freins")',
      },
    },
    {
      name: 'price',
      label: 'Prix',
      type: 'number',
      required: true,
      min: 0,
      admin: {
        description: 'Prix en euros',
      },
    },
    {
      name: 'time',
      label: 'Durée estimée',
      type: 'text',
      required: true,
      admin: {
        description: 'Durée estimée de la prestation (ex : "30 min", "1h", "2-3h")',
      },
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
