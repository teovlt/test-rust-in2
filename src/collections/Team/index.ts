import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'

export const Team: CollectionConfig = {
  slug: 'team',
  labels: {
    singular: 'Membre de l\'équipe',
    plural: 'Équipe',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'role', 'order', 'createdAt'],
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
      name: 'photo',
      label: 'Photo',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'role',
      label: 'Rôle / Poste',
      type: 'text',
      required: true,
      admin: {
        description: 'Ex: Mécanicien, Fondateur, Responsable atelier...',
      },
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Courte biographie ou présentation du membre',
      },
    },
    {
      name: 'order',
      label: 'Ordre d\'affichage',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Plus le nombre est petit, plus le membre apparaît en premier',
      },
    },
  ],
}

