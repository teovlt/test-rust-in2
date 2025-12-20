'use client'

import { ArrowLeft } from 'lucide-react'

export const BackToSiteLink = () => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    // Force a full page reload to reset viewport/zoom
    window.location.href = '/'
  }

  return (
    <div className="back-to-site-container">
      <a href="/" onClick={handleClick} className="back-to-site-link">
        <span>
          <ArrowLeft className="w-4 h-4" />
        </span>
        Retour au site
      </a>

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
          cursor: pointer;
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
