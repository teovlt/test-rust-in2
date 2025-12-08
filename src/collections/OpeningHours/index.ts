import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'

export const OpeningHours: CollectionConfig = {
  slug: 'opening-hours',
  labels: {
    singular: 'Horaire',
    plural: 'Horaires',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['day', 'openTime', 'closeTime', 'isClosed', 'order'],
    useAsTitle: 'day',
  },
  fields: [
    {
      name: 'day',
      label: 'Jour',
      type: 'select',
      required: true,
      options: [
        { label: 'Lundi', value: 'lundi' },
        { label: 'Mardi', value: 'mardi' },
        { label: 'Mercredi', value: 'mercredi' },
        { label: 'Jeudi', value: 'jeudi' },
        { label: 'Vendredi', value: 'vendredi' },
        { label: 'Samedi', value: 'samedi' },
        { label: 'Dimanche', value: 'dimanche' },
      ],
    },
    {
      name: 'isClosed',
      label: 'Fermé',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Cochez si fermé ce jour-là',
      },
    },
    {
      name: 'openTime',
      label: 'Heure d\'ouverture',
      type: 'text',
      admin: {
        description: 'Ex: 9h00',
        condition: (data) => !data.isClosed,
      },
    },
    {
      name: 'closeTime',
      label: 'Heure de fermeture',
      type: 'text',
      admin: {
        description: 'Ex: 18h00',
        condition: (data) => !data.isClosed,
      },
    },
    {
      name: 'order',
      label: 'Ordre d\'affichage',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: '0 = Lundi, 1 = Mardi, etc.',
      },
    },
  ],
}

