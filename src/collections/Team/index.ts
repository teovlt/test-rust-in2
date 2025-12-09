import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'

export const Team: CollectionConfig = {
  slug: 'team',
  labels: {
    singular: 'Team Member',
    plural: 'Team',
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
      label: 'Name',
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
      label: 'Role / Position',
      type: 'text',
      required: true,
      admin: {
        description: 'E.g.: Mechanic, Founder, Workshop Manager...',
      },
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Short bio or presentation of the team member',
      },
    },
    {
      name: 'order',
      label: 'Display Order',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Lower numbers appear first',
      },
    },
  ],
}
