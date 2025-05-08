// Ce script teste la connexion à la base de données et vérifie si Prisma est correctement configuré
// Utilise le chemin spécifique vers le client généré
const { PrismaClient } = require('./src/generated/prisma');

async function main() {
  console.log('Initialisation du client Prisma...');
  const prisma = new PrismaClient();

  try {
    console.log('Tentative de connexion à la base de données...');
    // Test de connexion
    await prisma.$connect();
    console.log('Connexion établie avec succès !');

    // Afficher le chemin de la base de données
    console.log('Base de données SQLite utilisée:', process.env.DATABASE_URL || 'Non définie dans les variables d\'environnement');

    // Essayons de compter les CV dans la base de données
    try {
      const count = await prisma.cV.count();
      console.log(`Nombre de CV dans la base de données: ${count}`);
    } catch (error) {
      console.error('Erreur lors du comptage des CV:', error);
      console.log('Le modèle "CV" existe-t-il dans votre schéma ? Vérifiez votre fichier schema.prisma.');
    }

    // Afficher le schéma
    console.log('\nVérification des modèles définis dans le schéma:');
    console.log('Modèles disponibles:', Object.keys(prisma).filter(key => !key.startsWith('$') && !key.startsWith('_')));

  } catch (error) {
    console.error('Erreur lors de la connexion à la base de données:', error);
  } finally {
    await prisma.$disconnect();
    console.log('Déconnexion du client Prisma.');
  }
}

main()
  .then(() => console.log('Test terminé.'))
  .catch(e => {
    console.error('Erreur fatale:', e);
    process.exit(1);
  });