"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
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

export default function ResumePage() {
  // Utiliser useParams pour récupérer les paramètres de l'URL
  const params = useParams();
  const cvId = params?.cv;
  
  const [cv, setCv] = useState(null);
  const [loading, setLoading] = useState(true);
  
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
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-gray-600">Chargement...</div>
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
    <div className="flex flex-col">
      {/* Bouton d'export PDF flottant en haut à droite */}
      <div className="fixed top-4 right-4 z-10">
        <Link
          href={`/resume/${cvId}/pdf`}
          className="px-4 py-2 bg-blue-500 text-white rounded-md font-medium hover:bg-blue-600 transition-colors shadow-lg"
        >
          Exporter PDF
        </Link>
      </div>

      {/* Affichage du CV uniquement */}
      <ModernCV cv={cv} />
    </div>
  );
}