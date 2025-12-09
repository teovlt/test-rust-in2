import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'

export const Bikes: CollectionConfig = {
  slug: 'bikes',
  labels: {
    singular: 'Bike',
    plural: 'Bikes',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    name: true,
    price: true,
  },
  admin: {
    defaultColumns: ['name', 'price', 'kilometers', 'humanSize', 'updatedAt'],
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
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
      name: 'kilometers',
      label: 'Kilometers',
      type: 'number',
      required: true,
      min: 0,
      defaultValue: 0,
      admin: {
        description: 'Number of kilometers already ridden',
      },
    },
    {
      name: 'photo',
      label: 'Photo',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'humanSize',
      label: 'Human Size',
      type: 'select',
      required: true,
      options: [
        { label: 'XS (< 1m55)', value: 'xs' },
        { label: 'S (1m55 - 1m65)', value: 's' },
        { label: 'M (1m65 - 1m75)', value: 'm' },
        { label: 'L (1m75 - 1m85)', value: 'l' },
        { label: 'XL (> 1m85)', value: 'xl' },
      ],
      admin: {
        description: 'Size of person this bike is suitable for',
      },
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      admin: {
        description: 'Optional bike description',
      },
    },
  ],
}
