import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'

export const Scooters: CollectionConfig = {
  slug: 'scooters',
  labels: {
    singular: 'Trottinette',
    plural: 'Trottinettes',
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
      label: 'Nom',
      type: 'text',
      required: true,
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
      name: 'scooterType',
      label: 'Type de trottinette',
      type: 'select',
      required: true,
      options: [
        { label: 'Urbaine', value: 'urban' },
        { label: 'Freestyle', value: 'freestyle' },
        { label: 'Tout-terrain', value: 'offroad' },
        { label: 'Enfant', value: 'kids' },
      ],
    },
    {
      name: 'isElectric',
      label: 'Électrique',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Est-ce une trottinette électrique ?',
      },
    },
    {
      name: 'maxSpeed',
      label: 'Vitesse max (km/h)',
      type: 'number',
      min: 0,
      admin: {
        description: 'Vitesse maximale en km/h (pour trottinettes électriques)',
        condition: (data) => data.isElectric,
      },
    },
    {
      name: 'range',
      label: 'Autonomie (km)',
      type: 'number',
      min: 0,
      admin: {
        description: 'Autonomie de la batterie en kilomètres (pour trottinettes électriques)',
        condition: (data) => data.isElectric,
      },
    },
    {
      name: 'maxWeight',
      label: 'Poids max (kg)',
      type: 'number',
      min: 0,
      admin: {
        description: 'Poids maximum supporté en kilogrammes',
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
        description: 'Description optionnelle de la trottinette',
      },
    },
  ],
}
