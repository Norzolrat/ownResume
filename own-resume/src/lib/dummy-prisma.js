// Ce fichier crée un client Prisma factice qui peut être utilisé comme solution de contournement
// quand le client Prisma réel ne peut pas être initialisé correctement
// Vous constaterez que les fonctions renvoient des données en dur pour éviter les erreurs

console.log("Utilisation du client Prisma factice - UNIQUEMENT À DES FINS DE DÉBOGAGE");

// Exemples de données factices pour les tests
const dummyCvs = [
  {
    id: "example-cv",
    firstName: "John",
    lastName: "Doe",
    title: "Développeur Web",
    email: "john.doe@example.com",
    phone: "+33 6 12 34 56 78",
    website: "https://johndoe.com",
    address: "Paris, France",
    experiencesJson: JSON.stringify([
      {
        id: "exp1",
        title: "Développeur Senior",
        company: "TechCorp",
        location: "Paris",
        startDate: "2020-01-01",
        current: true,
        description: "Développement d'applications web avec React et Node.js"
      }
    ]),
    educationJson: JSON.stringify([
      {
        id: "edu1",
        institution: "Université de Paris",
        degree: "Master",
        field: "Informatique",
        startDate: "2015-09-01",
        endDate: "2017-06-30",
        description: "Spécialisation en développement web"
      }
    ]),
    skillsJson: JSON.stringify([
      { id: "skill1", name: "React", level: 5 },
      { id: "skill2", name: "Node.js", level: 4 },
      { id: "skill3", name: "JavaScript", level: 5 }
    ]),
    languagesJson: JSON.stringify([
      { id: "lang1", name: "Français", level: "Natif" },
      { id: "lang2", name: "Anglais", level: "Courant" }
    ]),
    interestsJson: JSON.stringify([
      { id: "int1", name: "Randonnée" },
      { id: "int2", name: "Photographie" }
    ]),
    customSectionsJson: null,
    defaultTemplate: "modern",
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-02")
  }
];

// Client Prisma factice avec des méthodes simulées
const prisma = {
  // Méthodes générales
  $connect: () => Promise.resolve(),
  $disconnect: () => Promise.resolve(),
  
  // Méthodes pour le modèle CV
  cV: {
    findMany: () => {
      console.log("Simulation de findMany pour les CV");
      return Promise.resolve(dummyCvs);
    },
    
    findUnique: (params) => {
      console.log("Simulation de findUnique pour CV avec ID:", params?.where?.id);
      const cv = dummyCvs.find(cv => cv.id === params?.where?.id);
      return Promise.resolve(cv || null);
    },
    
    create: (params) => {
      console.log("Simulation de create pour CV:", params?.data);
      const newCv = {
        ...params?.data,
        id: `cv-${Date.now()}`,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      dummyCvs.push(newCv);
      return Promise.resolve(newCv);
    },
    
    update: (params) => {
      console.log("Simulation de update pour CV avec ID:", params?.where?.id);
      const index = dummyCvs.findIndex(cv => cv.id === params?.where?.id);
      if (index !== -1) {
        dummyCvs[index] = {
          ...dummyCvs[index],
          ...params?.data,
          updatedAt: new Date()
        };
        return Promise.resolve(dummyCvs[index]);
      }
      return Promise.reject(new Error("CV not found"));
    },
    
    delete: (params) => {
      console.log("Simulation de delete pour CV avec ID:", params?.where?.id);
      const index = dummyCvs.findIndex(cv => cv.id === params?.where?.id);
      if (index !== -1) {
        const deleted = dummyCvs.splice(index, 1)[0];
        return Promise.resolve(deleted);
      }
      return Promise.reject(new Error("CV not found"));
    },
    
    count: () => {
      return Promise.resolve(dummyCvs.length);
    }
  }
};

export default prisma;