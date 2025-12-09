import { mongooseAdapter } from '@payloadcms/db-mongodb'
import sharp from 'sharp'
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'

import { Bikes } from './collections/Bikes'
import { FAQ } from './collections/FAQ'
import { Media } from './collections/Media'
import { OpeningHours } from './collections/OpeningHours'
import { Reviews } from './collections/Reviews'
import { Scooters } from './collections/Scooters'
import { Skis } from './collections/Skis'
import { Team } from './collections/Team'
import { Users } from './collections/Users'
import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    components: {
      // The `BeforeLogin` component renders a message on the login page
      beforeLogin: ['@/components/BeforeLogin'],
      // The `BeforeDashboard` component renders the welcome block after login
      beforeDashboard: ['@/components/BeforeDashboard'],
      // Back to site button in the nav
      afterNavLinks: ['@/components/BackToSiteLink'],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
    meta: {
      title: 'Rust-in - Admin',
      description: 'Rust-in site administration panel',
    },
  },
  // Rich text editor configuration
  editor: defaultLexical,
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  collections: [Users, Bikes, Skis, Scooters, Media, Reviews, FAQ, Team, OpeningHours],
  cors: [getServerSideURL()].filter(Boolean),
  globals: [],
  plugins: [
    vercelBlobStorage({
      enabled: true, // Optional, defaults to true
      // Specify which collections should use Vercel Blob
      collections: {
        media: true,
      },
      // Token provided by Vercel once Blob storage is added to your Vercel project
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  ],
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        // Allow logged in users to execute this endpoint
        if (req.user) return true

        // If no logged in user, check for Vercel Cron secret
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${process.env.CRON_SECRET}`
      },
    },
    tasks: [],
  },
})
