import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/cvs/[id] - Récupérer un CV spécifique
export async function GET(request, { params }) {
  try {
    const cv = await prisma.cV.findUnique({
      where: {
        id: params.id,
      },
    });
    
    if (!cv) {
      return NextResponse.json({ error: 'CV not found' }, { status: 404 });
    }
    
    // Convertir les champs JSON en objets JavaScript
    const formattedCv = {
      ...cv,
      experiences: cv.experiencesJson ? JSON.parse(cv.experiencesJson) : [],
      education: cv.educationJson ? JSON.parse(cv.educationJson) : [],
      skills: cv.skillsJson ? JSON.parse(cv.skillsJson) : [],
      languages: cv.languagesJson ? JSON.parse(cv.languagesJson) : [],
      interests: cv.interestsJson ? JSON.parse(cv.interestsJson) : [],
      customSections: cv.customSectionsJson ? JSON.parse(cv.customSectionsJson) : {},
    };
    
    return NextResponse.json(formattedCv);
  } catch (error) {
    console.error(`Error fetching CV ${params.id}:`, error);
    return NextResponse.json({ error: 'Failed to fetch CV' }, { status: 500 });
  }
}

// PUT /api/cvs/[id] - Mettre à jour un CV
export async function PUT(request, { params }) {
  try {
    const data = await request.json();
    
    // Préparer les données pour la mise à jour
    const {
      experiences, education, skills, languages, interests, customSections,
      ...basicInfo
    } = data;
    
    // Mettre à jour le CV
    const cv = await prisma.cV.update({
      where: {
        id: params.id,
      },
      data: {
        ...basicInfo,
        experiencesJson: experiences ? JSON.stringify(experiences) : null,
        educationJson: education ? JSON.stringify(education) : null,
        skillsJson: skills ? JSON.stringify(skills) : null,
        languagesJson: languages ? JSON.stringify(languages) : null,
        interestsJson: interests ? JSON.stringify(interests) : null,
        customSectionsJson: customSections ? JSON.stringify(customSections) : null,
        updatedAt: new Date(),
      },
    });
    
    return NextResponse.json(cv);
  } catch (error) {
    console.error(`Error updating CV ${params.id}:`, error);
    return NextResponse.json({ error: 'Failed to update CV' }, { status: 500 });
  }
}

// DELETE /api/cvs/[id] - Supprimer un CV
export async function DELETE(request, { params }) {
  try {
    await prisma.cV.delete({
      where: {
        id: params.id,
      },
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(`Error deleting CV ${params.id}:`, error);
    return NextResponse.json({ error: 'Failed to delete CV' }, { status: 500 });
  }
}