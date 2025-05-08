"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CVsPage() {
  const [cvs, setCvs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCVs = async () => {
      try {
        const response = await fetch('/api/cvs');
        
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des CV');
        }
        
        const data = await response.json();
        console.log("CVs récupérés:", data); // Pour déboguer
        setCvs(data);
      } catch (error) {
        console.error('Erreur:', error);
        setError('Impossible de charger vos CV. Veuillez réessayer plus tard.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchCVs();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-600">Chargement de vos CV...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
        <p className="text-red-700">{error}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Mes CV</h1>
        <Link
          href="/cvs/new"
          className="px-4 py-2 bg-blue-500 text-white rounded-md font-medium hover:bg-blue-600 transition-colors"
        >
          Nouveau CV
        </Link>
      </div>

      {cvs.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <p className="text-gray-600 mb-6">Vous n'avez pas encore créé de CV.</p>
          <Link 
            href="/cvs/new" 
            className="px-4 py-2 bg-blue-500 text-white rounded-md font-medium hover:bg-blue-600 transition-colors"
          >
            Créer mon premier CV
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cvs.map((cv) => (
            <div key={cv.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">
                  {cv.firstName} {cv.lastName}
                </h2>
                {cv.title && <p className="text-gray-600 mb-4">{cv.title}</p>}
                <p className="text-sm text-gray-500 mb-4">
                  Mis à jour le {new Date(cv.updatedAt).toLocaleDateString('fr-FR')}
                </p>
                <div className="flex justify-end space-x-2">
                  <Link
                    href={`/cvs/edit/${cv.id}`}
                    className="px-3 py-1 bg-gray-200 text-gray-800 rounded-md text-sm hover:bg-gray-300 transition-colors"
                  >
                    Éditer
                  </Link>
                  <Link
                    href={`/resume/${cv.id}`}
                    className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600 transition-colors"
                  >
                    Aperçu
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}