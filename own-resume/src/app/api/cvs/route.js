import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/cvs - Récupérer tous les CV
export async function GET() {
  try {
    console.log("Requête GET /api/cvs reçue");
    const cvs = await prisma.cV.findMany({
      orderBy: {
        updatedAt: 'desc',
      },
    });
    
    // Convertir les champs JSON en objets JavaScript
    const formattedCvs = cvs.map(cv => ({
      ...cv,
      experiences: cv.experiencesJson ? JSON.parse(cv.experiencesJson) : [],
      education: cv.educationJson ? JSON.parse(cv.educationJson) : [],
      skills: cv.skillsJson ? JSON.parse(cv.skillsJson) : [],
      languages: cv.languagesJson ? JSON.parse(cv.languagesJson) : [],
      interests: cv.interestsJson ? JSON.parse(cv.interestsJson) : [],
      customSections: cv.customSectionsJson ? JSON.parse(cv.customSectionsJson) : {},
    }));
    
    console.log(`${cvs.length} CV(s) trouvé(s)`);
    return NextResponse.json(formattedCvs);
  } catch (error) {
    console.error('Error fetching CVs:', error);
    return NextResponse.json({ error: 'Failed to fetch CVs' }, { status: 500 });
  }
}

// POST /api/cvs - Créer un nouveau CV
export async function POST(request) {
  try {
    console.log("Requête POST /api/cvs reçue");
    const data = await request.json();
    console.log("Données reçues:", data);
    
    // Préparer les données pour l'insertion dans la base de données
    const {
      experiences, education, skills, languages, interests, customSections,
      ...basicInfo
    } = data;
    
    // Créer le CV avec les champs JSON sérialisés
    const cv = await prisma.cV.create({
      data: {
        ...basicInfo,
        experiencesJson: experiences ? JSON.stringify(experiences) : null,
        educationJson: education ? JSON.stringify(education) : null,
        skillsJson: skills ? JSON.stringify(skills) : null,
        languagesJson: languages ? JSON.stringify(languages) : null,
        interestsJson: interests ? JSON.stringify(interests) : null,
        customSectionsJson: customSections ? JSON.stringify(customSections) : null,
      },
    });
    
    console.log("CV créé avec l'ID:", cv.id);
    return NextResponse.json(cv, { status: 201 });
  } catch (error) {
    console.error('Error creating CV:', error);
    return NextResponse.json({ error: 'Failed to create CV', details: error.message }, { status: 500 });
  }
}