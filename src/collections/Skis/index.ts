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
      name: 'skiType',
      label: 'Type de ski',
      type: 'select',
      required: true,
      options: [
        { label: 'Alpin', value: 'alpine' },
        { label: 'Freestyle', value: 'freestyle' },
        { label: 'Freeride', value: 'freeride' },
        { label: 'Fond', value: 'cross-country' },
        { label: 'Randonnée', value: 'touring' },
      ],
    },
    {
      name: 'size',
      label: 'Taille (cm)',
      type: 'number',
      required: true,
      min: 100,
      max: 200,
      admin: {
        description: 'Longueur du ski en centimètres',
      },
    },
    {
      name: 'level',
      label: 'Niveau',
      type: 'select',
      required: true,
      options: [
        { label: 'Débutant', value: 'beginner' },
        { label: 'Intermédiaire', value: 'intermediate' },
        { label: 'Avancé', value: 'advanced' },
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
      label: 'Avec fixations',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Les fixations sont-elles incluses ?',
      },
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      admin: {
        description: 'Description optionnelle du ski',
      },
    },
  ],
}
