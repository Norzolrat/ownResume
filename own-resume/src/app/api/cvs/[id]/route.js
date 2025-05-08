import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/cvs/[id] - Récupérer un CV spécifique
export async function GET(request, context) {
  try {
    // Accéder à l'ID à partir du contexte
    const id = context.params.id;
    console.log(`Requête GET /api/cvs/${id} reçue`);
    
    if (!id) {
      console.log("ID manquant dans la requête");
      return NextResponse.json({ error: 'ID not provided' }, { status: 400 });
    }
    
    const cv = await prisma.cV.findUnique({
      where: {
        id: id,
      },
    });
    
    if (!cv) {
      console.log(`CV avec ID ${id} introuvable`);
      return NextResponse.json({ error: 'CV not found' }, { status: 404 });
    }
    
    console.log(`CV avec ID ${id} trouvé`);
    
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
    console.error(`Error fetching CV:`, error);
    return NextResponse.json({ error: 'Failed to fetch CV', details: error.message }, { status: 500 });
  }
}

// PUT /api/cvs/[id] - Mettre à jour un CV
export async function PUT(request, context) {
  try {
    const id = context.params.id;
    console.log(`Requête PUT /api/cvs/${id} reçue`);
    
    if (!id) {
      console.log("ID manquant dans la requête");
      return NextResponse.json({ error: 'ID not provided' }, { status: 400 });
    }
    
    const data = await request.json();
    console.log("Données reçues pour mise à jour:", data);
    
    // Préparer les données pour la mise à jour
    const {
      experiences, education, skills, languages, interests, customSections,
      ...basicInfo
    } = data;
    
    // Mettre à jour le CV
    const cv = await prisma.cV.update({
      where: {
        id: id,
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
    
    console.log(`CV avec ID ${id} mis à jour`);
    return NextResponse.json(cv);
  } catch (error) {
    console.error(`Error updating CV:`, error);
    return NextResponse.json({ error: 'Failed to update CV', details: error.message }, { status: 500 });
  }
}

// DELETE /api/cvs/[id] - Supprimer un CV
export async function DELETE(request, context) {
  try {
    const id = context.params.id;
    console.log(`Requête DELETE /api/cvs/${id} reçue`);
    
    if (!id) {
      console.log("ID manquant dans la requête");
      return NextResponse.json({ error: 'ID not provided' }, { status: 400 });
    }
    
    await prisma.cV.delete({
      where: {
        id: id,
      },
    });
    
    console.log(`CV avec ID ${id} supprimé`);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(`Error deleting CV:`, error);
    return NextResponse.json({ error: 'Failed to delete CV', details: error.message }, { status: 500 });
  }
}