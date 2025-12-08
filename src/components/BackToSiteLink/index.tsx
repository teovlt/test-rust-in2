'use client'

import Link from 'next/link'

export const BackToSiteLink = () => {
  return (
    <div className="back-to-site-container">
      <Link href="/" className="back-to-site-link">
        <span>←</span>
        Retour au site
      </Link>

      <style jsx>{`
        .back-to-site-container {
          padding: 16px 20px;
          border-top: 1px solid var(--theme-elevation-150);
        }

        .back-to-site-link {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 16px;
          background: linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%);
          border: 1px solid #fed7aa;
          border-radius: 8px;
          color: #c2410c;
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.2s;
        }

        .back-to-site-link:hover {
          background: #f97316;
          color: white;
          border-color: #f97316;
        }

        .back-to-site-link span {
          font-size: 16px;
        }
      `}</style>
    </div>
  )
}

export default BackToSiteLink
