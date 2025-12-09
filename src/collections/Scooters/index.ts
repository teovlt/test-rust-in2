import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'

export const Scooters: CollectionConfig = {
  slug: 'scooters',
  labels: {
    singular: 'Scooter',
    plural: 'Scooters',
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
    defaultColumns: ['name', 'price', 'scooterType', 'isElectric', 'updatedAt'],
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
      name: 'scooterType',
      label: 'Scooter Type',
      type: 'select',
      required: true,
      options: [
        { label: 'Urban', value: 'urban' },
        { label: 'Freestyle', value: 'freestyle' },
        { label: 'Off-road', value: 'offroad' },
        { label: 'Kids', value: 'kids' },
      ],
    },
    {
      name: 'isElectric',
      label: 'Electric',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Is this an electric scooter?',
      },
    },
    {
      name: 'maxSpeed',
      label: 'Max Speed (km/h)',
      type: 'number',
      min: 0,
      admin: {
        description: 'Maximum speed in km/h (for electric scooters)',
        condition: (data) => data.isElectric,
      },
    },
    {
      name: 'range',
      label: 'Range (km)',
      type: 'number',
      min: 0,
      admin: {
        description: 'Battery range in kilometers (for electric scooters)',
        condition: (data) => data.isElectric,
      },
    },
    {
      name: 'maxWeight',
      label: 'Max Weight (kg)',
      type: 'number',
      min: 0,
      admin: {
        description: 'Maximum supported weight in kilograms',
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
      name: 'description',
      label: 'Description',
      type: 'textarea',
      admin: {
        description: 'Optional scooter description',
      },
    },
  ],
}

