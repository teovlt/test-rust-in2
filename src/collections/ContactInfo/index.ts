import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'

export const ContactInfo: CollectionConfig = {
  slug: 'contact-info',
  labels: {
    singular: 'Coordonnées',
    plural: 'Coordonnées',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['address', 'email', 'phone'],
    useAsTitle: 'address',
  },
  fields: [
    {
      name: 'address',
      label: 'Adresse',
      type: 'text',
      required: true,
      admin: {
        description: "Adresse complète de l'entreprise",
      },
    },
    {
      name: 'city',
      label: 'Ville',
      type: 'text',
      required: true,
    },
    {
      name: 'postalCode',
      label: 'Code postal',
      type: 'text',
      required: true,
    },
    {
      name: 'country',
      label: 'Pays',
      type: 'text',
      required: true,
      defaultValue: 'France',
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      required: true,
    },
    {
      name: 'phone',
      label: 'Téléphone',
      type: 'text',
      required: true,
      admin: {
        description: 'Numéro de téléphone (ex : 05 61 23 45 67)',
      },
    },
    {
      name: 'socialLinks',
      label: 'Réseaux sociaux',
      type: 'group',
      fields: [
        {
          name: 'facebook',
          label: 'URL Facebook',
          type: 'text',
          admin: {
            description: 'URL de la page Facebook (optionnel)',
          },
        },
        {
          name: 'instagram',
          label: 'URL Instagram',
          type: 'text',
          admin: {
            description: 'URL du profil Instagram (optionnel)',
          },
        },
        {
          name: 'twitter',
          label: 'URL Twitter/X',
          type: 'text',
          admin: {
            description: 'URL du profil Twitter/X (optionnel)',
          },
        },
        {
          name: 'linkedin',
          label: 'URL LinkedIn',
          type: 'text',
          admin: {
            description: 'URL de la page LinkedIn (optionnel)',
          },
        },
      ],
    },
  ],
}
