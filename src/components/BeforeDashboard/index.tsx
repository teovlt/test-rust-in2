import { Banner } from '@payloadcms/ui/elements/Banner'
import React from 'react'

import './index.scss'

const baseClass = 'before-dashboard'

const BeforeDashboard: React.FC = () => {
  return (
    <div className={baseClass}>
      <Banner className={`${baseClass}__banner`} type="success">
        <h4>Welcome to your Rust-in dashboard! 🚴</h4>
      </Banner>
      <p style={{ marginTop: '1rem' }}>
        From this space, you can manage:
      </p>
      <ul className={`${baseClass}__instructions`}>
        <li>
          <strong>Bikes</strong> - Add, edit or delete bikes for sale
        </li>
        <li>
          <strong>Reviews</strong> - Manage customer testimonials displayed on the site
        </li>
        <li>
          <strong>FAQ</strong> - Update frequently asked questions
        </li>
        <li>
          <strong>Team</strong> - Present your team members
        </li>
        <li>
          <strong>Opening Hours</strong> - Set your business hours
        </li>
        <li>
          <strong>Media</strong> - Manage all site images
        </li>
      </ul>
      <p style={{ marginTop: '1rem', color: 'var(--theme-elevation-500)' }}>
        💡 Tip: Use the left menu to navigate between sections.
      </p>
    </div>
  )
}

export default BeforeDashboard
