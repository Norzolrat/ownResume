"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import ModernCV from '@/components/templates/ModernCV';

// CV exemple à utiliser en cas d'erreur ou pour l'ID "example-cv"
const EXAMPLE_CV = {
  id: "example-cv",
  firstName: "John",
  lastName: "DOE",
  title: "Lorem Ipsum Tech",
  email: "john.doe@example.com",
  phone: "01 23 45 67 89",
  address: "Lorem Ipsum City",
  website: "https://linkedin.com/in/john-doe",
  experiences: [
    {
      id: "exp1",
      title: "Alternant Lorem Ipsum",
      company: "Lorem Corp",
      location: "Ipsum City",
      startDate: "2023-01-01",
      current: true,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit\nSed do eiusmod tempor incididunt ut labore et dolore magna aliqua\nUt enim ad minim veniam, quis nostrud exercitation ullamco\nDuis aute irure dolor in reprehenderit in voluptate\nExcepteur sint occaecat cupidatat non proident"
    },
    {
      id: "exp2",
      title: "Alternant Amet / Consectetur",
      company: "Dolor Inc",
      location: "Sit City",
      startDate: "2022-01-01",
      endDate: "2023-01-01",
      description: "Neque porro quisquam est qui dolorem ipsum\nNam libero tempore, cum soluta nobis est eligendi\nEt harum quidem rerum facilis est et expedita distinctio"
    }
  ],
  education: [
    {
      id: "edu1",
      institution: "Lorem University",
      degree: "Master",
      field: "Dolor Sit",
      startDate: "2023-01-01",
      current: true
    },
    {
      id: "edu2",
      institution: "Ipsum Academy",
      degree: "Bachelor",
      field: "Consectetur",
      startDate: "2022-01-01",
      endDate: "2023-01-01"
    },
    {
      id: "edu3",
      institution: "Amet Institute",
      degree: "DUT",
      field: "Adipiscing",
      startDate: "2019-01-01",
      endDate: "2022-01-01"
    }
  ],
  skills: [
    { id: "skill1", name: "Lorem", level: 5 },
    { id: "skill2", name: "Ipsum", level: 4 },
    { id: "skill3", name: "Dolor", level: 5 },
    { id: "skill4", name: "Sit", level: 3 },
    { id: "skill5", name: "Amet", level: 4 },
    { id: "skill6", name: "Consectetur", level: 3 },
    { id: "skill7", name: "Adipiscing", level: 5 },
    { id: "skill8", name: "Elit", level: 4 },
    { id: "skill9", name: "Eiusmod", level: 3 },
    { id: "skill10", name: "Tempor", level: 4 },
    { id: "skill11", name: "Incididunt", level: 5 },
    { id: "skill12", name: "Labore", level: 3 }
  ],
  languages: [
    { id: "lang1", name: "Lorem ipsum", level: "natif" },
    { id: "lang2", name: "Dolor sit", level: "courant" }
  ],
  interests: [
    { id: "int1", name: "Lorem Ipsum" },
    { id: "int2", name: "Dolor Sit" },
    { id: "int3", name: "Consectetur" }
  ],
  defaultTemplate: "modern"
};

export default function ResumePDFPage() {
  const params = useParams();
  const cvId = params?.cv;
  
  const [cv, setCv] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  
  // Chargement des données du CV depuis l'API
  useEffect(() => {
    const fetchCV = async () => {
      // Si l'ID est "example-cv", utiliser directement le CV exemple
      if (cvId === "example-cv") {
        setCv(EXAMPLE_CV);
        setLoading(false);
        return;
      }
      
      try {
        const response = await fetch(`/api/cvs/${cvId}`);
        
        if (!response.ok) {
          // En cas d'erreur, utiliser le CV exemple
          setCv(EXAMPLE_CV);
        } else {
          const data = await response.json();
          setCv(data);
        }
      } catch (error) {
        // En cas d'erreur, utiliser le CV exemple
        setCv(EXAMPLE_CV);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCV();
  }, [cvId]);
  
  // Simuler la génération du PDF après le chargement du CV
  useEffect(() => {
    if (!loading && cv) {
      // Simuler une génération de PDF
      setGenerating(true);
      
      const timer = setTimeout(() => {
        setGenerating(false);
        
        // Déclencher l'impression du navigateur
        window.print();
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [loading, cv]);
  
  if (loading || generating) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-700 text-lg font-medium">
            {generating ? 'Préparation du PDF...' : 'Chargement des données...'}
          </p>
        </div>
      </div>
    );
  }

  if (!cv) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-gray-600">CV introuvable, veuillez réessayer.</div>
      </div>
    );
  }

  return (
    <div className="print:p-0">
      {/* Affichage du CV uniquement (optimisé pour l'impression) */}
      <ModernCV cv={cv} />
      
      {/* Instructions visibles uniquement à l'écran, pas à l'impression */}
      <div className="fixed bottom-4 right-4 z-10 print:hidden bg-white p-4 rounded-lg shadow-lg">
        <p className="text-gray-700">
          La fenêtre d'impression devrait s'ouvrir automatiquement.
          <br />
          Si ce n'est pas le cas, utilisez <strong>Ctrl+P</strong> (ou <strong>Cmd+P</strong> sur Mac)
          <br />
          pour imprimer ce CV ou l'enregistrer en PDF.
        </p>
      </div>
    </div>
  );
}