/**
 * Ce fichier tente d'utiliser le client Prisma réel,
 * mais utilise un client factice si cela échoue
 */

// Importation du client factice
import dummyPrisma from './dummy-prisma';

// Variable pour stocker l'instance de Prisma
let prisma;

try {
  // Tenter d'importer le vrai client Prisma
  const { PrismaClient } = require('@prisma/client');
  
  // Tentative de création d'une instance réelle
  prisma = new PrismaClient({
    log: ['query', 'error', 'warn'],
  });
  
  console.log('Client Prisma réel initialisé avec succès');
} catch (error) {
  console.warn('Erreur lors de l\'initialisation du client Prisma réel:', error.message);
  console.warn('Utilisation du client Prisma factice à la place');
  
  // Utiliser le client factice en cas d'erreur
  prisma = dummyPrisma;
}

export default prisma;