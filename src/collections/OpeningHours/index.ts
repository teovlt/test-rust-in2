import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'

export const OpeningHours: CollectionConfig = {
  slug: 'opening-hours',
  labels: {
    singular: 'Opening Hour',
    plural: 'Opening Hours',
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
      label: 'Day',
      type: 'select',
      required: true,
      options: [
        { label: 'Monday', value: 'lundi' },
        { label: 'Tuesday', value: 'mardi' },
        { label: 'Wednesday', value: 'mercredi' },
        { label: 'Thursday', value: 'jeudi' },
        { label: 'Friday', value: 'vendredi' },
        { label: 'Saturday', value: 'samedi' },
        { label: 'Sunday', value: 'dimanche' },
      ],
    },
    {
      name: 'isClosed',
      label: 'Closed',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Check if closed on this day',
      },
    },
    {
      name: 'openTime',
      label: 'Opening Time',
      type: 'text',
      admin: {
        description: 'E.g.: 9:00 AM',
        condition: (data) => !data.isClosed,
      },
    },
    {
      name: 'closeTime',
      label: 'Closing Time',
      type: 'text',
      admin: {
        description: 'E.g.: 6:00 PM',
        condition: (data) => !data.isClosed,
      },
    },
    {
      name: 'order',
      label: 'Display Order',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: '0 = Monday, 1 = Tuesday, etc.',
      },
    },
  ],
}
