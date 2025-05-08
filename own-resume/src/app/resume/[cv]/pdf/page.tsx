"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function ResumePDFPage({ params }: { params: { cv: string } }) {
  const cvId = params.cv;
  const [generating, setGenerating] = useState(false);
  
  const handleDownload = () => {
    setGenerating(true);
    
    // Simuler un délai de génération PDF
    setTimeout(() => {
      setGenerating(false);
      alert("Fonctionnalité d'export PDF à implémenter");
    }, 1500);
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Exporter en PDF</h1>
        <div className="flex space-x-3">
          <Link
            href={`/resume/${cvId}`}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md font-medium hover:bg-gray-300 transition-colors"
          >
            Retour à l'aperçu
          </Link>
          <button
            onClick={handleDownload}
            disabled={generating}
            className="px-4 py-2 bg-primary text-white rounded-md font-medium hover:bg-primary/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {generating ? 'Génération en cours...' : 'Télécharger PDF'}
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400">
          <p className="text-yellow-800">
            Cliquez sur le bouton "Télécharger PDF" pour générer et télécharger votre CV au format PDF.
          </p>
        </div>
      </div>
      
      {/* Aperçu du CV (même contenu que dans la page d'aperçu) */}
      <div className="bg-gray-100 p-8 rounded-lg">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-md overflow-hidden">
          {/* En-tête du CV */}
          <div className="bg-primary text-white p-6 text-center">
            <h2 className="text-2xl font-bold">Sophie Dubois</h2>
            <p className="text-lg">Développeuse Full Stack</p>
            <div className="mt-2 text-sm">
              <span className="mx-2">sophie.dubois@example.com</span>
              <span className="mx-2">+33 6 12 34 56 78</span>
              <span className="mx-2">Lyon, France</span>
            </div>
          </div>
          
          {/* Corps du CV */}
          <div className="p-6">
            {/* Identique au contenu de la page d'aperçu */}
            {/* ... */}
          </div>
        </div>
      </div>
    </div>
  );
}