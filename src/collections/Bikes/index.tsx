import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'

export const Bikes: CollectionConfig = {
  slug: 'bikes',
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
      name: 'kilometers',
      label: 'Kilomètres parcourus',
      type: 'number',
              required: true,
      min: 0,
      defaultValue: 0,
              admin: {
        description: 'Nombre de kilomètres déjà parcourus',
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
      label: 'Taille humain associée',
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
        description: 'Taille de la personne pour laquelle ce vélo est adapté',
      },
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      admin: {
        description: 'Description optionnelle du vélo',
    },
    },
  ],
}
