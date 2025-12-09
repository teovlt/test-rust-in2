import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'

export const Skis: CollectionConfig = {
  slug: 'skis',
  labels: {
    singular: 'Ski',
    plural: 'Skis',
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
    defaultColumns: ['name', 'price', 'skiType', 'size', 'updatedAt'],
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
      name: 'skiType',
      label: 'Ski Type',
      type: 'select',
      required: true,
      options: [
        { label: 'Alpine', value: 'alpine' },
        { label: 'Freestyle', value: 'freestyle' },
        { label: 'Freeride', value: 'freeride' },
        { label: 'Cross-country', value: 'cross-country' },
        { label: 'Touring', value: 'touring' },
      ],
    },
    {
      name: 'size',
      label: 'Size (cm)',
      type: 'number',
      required: true,
      min: 100,
      max: 200,
      admin: {
        description: 'Ski length in centimeters',
      },
    },
    {
      name: 'level',
      label: 'Skill Level',
      type: 'select',
      required: true,
      options: [
        { label: 'Beginner', value: 'beginner' },
        { label: 'Intermediate', value: 'intermediate' },
        { label: 'Advanced', value: 'advanced' },
        { label: 'Expert', value: 'expert' },
      ],
    },
    {
      name: 'photo',
      label: 'Photo',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'withBindings',
      label: 'With Bindings',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Are bindings included?',
      },
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      admin: {
        description: 'Optional ski description',
      },
    },
  ],
}

