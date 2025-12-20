import { Banner } from '@payloadcms/ui/elements/Banner'
import React from 'react'

import './index.scss'

const baseClass = 'before-dashboard'

const BeforeDashboard: React.FC = () => {
  return (
    <div className={baseClass}>
      <Banner className={`${baseClass}__banner`} type="success">
        <h4>Bienvenue sur votre tableau de bord Rust-in ! 🚴⛷️🛴</h4>
      </Banner>
      <p style={{ marginTop: '1rem' }}>Depuis cet espace, vous pouvez gérer :</p>
      <ul className={`${baseClass}__instructions`}>
        <li>
          <strong>Vélos</strong> - Ajouter, modifier ou supprimer les vélos en vente
        </li>
        <li>
          <strong>Skis</strong> - Gérer les skis disponibles
        </li>
        <li>
          <strong>Trottinettes</strong> - Gérer les trottinettes en stock
        </li>
        <li>
          <strong>Avis clients</strong> - Gérer les témoignages affichés sur le site
        </li>
        <li>
          <strong>FAQ</strong> - Mettre à jour les questions fréquentes
        </li>
        <li>
          <strong>Équipe</strong> - Présenter les membres de votre équipe
        </li>
        <li>
          <strong>Horaires</strong> - Définir vos horaires d'ouverture
        </li>
        <li>
          <strong>Tarifs</strong> - Gérer les tarifs des prestations
        </li>
        <li>
          <strong>Médias</strong> - Gérer toutes les images du site
        </li>
      </ul>
      <p style={{ marginTop: '1rem', color: 'var(--theme-elevation-500)' }}>
        💡 Astuce : Utilisez le menu de gauche pour naviguer entre les sections.
      </p>
    </div>
  )
}

export default BeforeDashboard
