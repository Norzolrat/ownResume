"use client";

import React from 'react';

const ModernCV = ({ cv }) => {
  // S'assurer que les sections existent
  const experiences = cv.experiences || [];
  const education = cv.education || [];
  const skills = cv.skills || [];
  const languages = cv.languages || [];
  const interests = cv.interests || [];
  
  // Déterminer les compétences pour les quatre quadrants
  const skillsCount = skills.length;
  const skillQuadrants = [
    { title: "Technologies", color: "blue", skills: skills.slice(0, Math.ceil(skillsCount / 4)) },
    { title: "Frameworks & Outils", color: "yellow", skills: skills.slice(Math.ceil(skillsCount / 4), Math.ceil(skillsCount / 2)) },
    { title: "Environnements", color: "yellow", skills: skills.slice(Math.ceil(skillsCount / 2), Math.ceil(skillsCount * 3 / 4)) },
    { title: "Méthodologies", color: "blue", skills: skills.slice(Math.ceil(skillsCount * 3 / 4)) }
  ];
  
  const formatDate = (dateString) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long' };
    return date.toLocaleDateString('fr-FR', options);
  };
  
  const formatDateRange = (startDate, endDate, current) => {
    if (current) {
      return `${formatDate(startDate)} (en cours)`;
    } else if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      
      // Si c'est la même année, n'afficher qu'une fois l'année
      if (start.getFullYear() === end.getFullYear()) {
        return `${start.getFullYear()}`;
      }
      
      return `${start.getFullYear()} - ${end.getFullYear()}`;
    } else if (startDate) {
      return formatDate(startDate);
    }
    
    return '';
  };
  
  return (
    <div style={{
      margin: '0 auto',
      padding: '20px',
      maxWidth: '1000px',
      backgroundColor: 'white',
    }}>
      <div style={{
        display: 'flex',
        position: 'relative',
        backgroundColor: 'white',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
      }}>
        {/* Panneau gauche (bleu) */}
        <div style={{
          backgroundColor: '#6d92c0',
          width: '30%',
          padding: '20px',
          marginLeft: '20px',
          color: 'white',
          zIndex: 2,
        }}>
          <div style={{
            width: '180px',
            height: '180px',
            borderRadius: '50%',
            backgroundColor: '#f7e989',
            margin: '0 auto 20px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
          }}>
            <img src="/api/placeholder/180/180" alt={`Photo de ${cv.firstName} ${cv.lastName}`} style={{ width: '100%', height: 'auto' }} />
          </div>
          
          <div>
            <div style={{
              fontSize: '1.6em',
              margin: '25px 0 15px 0',
              color: 'white',
              fontWeight: 'bold',
            }}>Contact</div>
            
            {cv.phone && (
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                <span style={{ marginRight: '10px', fontSize: '1.2em' }}>📞</span>
                <span>{cv.phone}</span>
              </div>
            )}
            
            {cv.email && (
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                <span style={{ marginRight: '10px', fontSize: '1.2em' }}>✉️</span>
                <span>{cv.email}</span>
              </div>
            )}
            
            {cv.address && (
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                <span style={{ marginRight: '10px', fontSize: '1.2em' }}>📍</span>
                <span>{cv.address}</span>
              </div>
            )}
            
            {cv.website && (
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                <span style={{ marginRight: '10px', fontSize: '1.2em' }}>👤</span>
                <span>{cv.website.replace('https://', '')}</span>
              </div>
            )}
          </div>
          
          {languages.length > 0 && (
            <div>
              <div style={{
                fontSize: '1.6em',
                margin: '25px 0 15px 0',
                color: 'white',
                fontWeight: 'bold',
              }}>Langues</div>
              
              {languages.map((language, index) => (
                <p key={language.id || index}>{language.name} {language.level}</p>
              ))}
            </div>
          )}
          
          {education.length > 0 && (
            <div>
              <div style={{
                fontSize: '1.6em',
                margin: '25px 0 15px 0',
                color: 'white',
                fontWeight: 'bold',
              }}>Etudes</div>
              
              {education.map((edu, index) => (
                <div key={edu.id || index} style={{ marginBottom: '15px' }}>
                  <p style={{ fontWeight: 'bold' }}>{formatDateRange(edu.startDate, edu.endDate)}</p>
                  <p>{edu.institution}</p>
                  <p>{edu.degree} {edu.field ? ` en ${edu.field}` : ''}</p>
                </div>
              ))}
            </div>
          )}
          
          {interests.length > 0 && (
            <div>
              <div style={{
                fontSize: '1.6em',
                margin: '25px 0 15px 0',
                color: 'white',
                fontWeight: 'bold',
              }}>Loisirs</div>
              
              {interests.map((interest, index) => (
                <p key={interest.id || index}>{interest.name}</p>
              ))}
            </div>
          )}
          
          <div>
            <div style={{
              fontSize: '1.6em',
              margin: '25px 0 15px 0',
              color: 'white',
              fontWeight: 'bold',
            }}>Soft Skills</div>
            
            <div>
              <p style={{ marginBottom: '5px' }}>Communication</p>
              <p style={{ marginBottom: '5px' }}>Travail d'équipe</p>
              <p style={{ marginBottom: '5px' }}>Résolution de problèmes</p>
              <p style={{ marginBottom: '5px' }}>Curiosité</p>
            </div>
          </div>
          
          <div style={{ marginTop: '25px' }}>
            <div style={{
              fontSize: '1.6em',
              margin: '25px 0 15px 0',
              color: 'white',
              fontWeight: 'bold',
            }}>Projet personnel</div>
            
            <p>Développement de l'application "ownResume" - Un éditeur de CV interactif permettant de créer, personnaliser et exporter des CV professionnels.</p>
          </div>
        </div>
        
        {/* Panneau droit */}
        <div style={{ width: '70%', display: 'flex', flexDirection: 'column' }}>
          {/* En-tête jaune */}
          <div style={{
            backgroundColor: '#f7e989',
            padding: '20px',
            marginTop: '20px',
            marginRight: '20px',
            width: '100%',
            position: 'relative',
            zIndex: 1,
          }}>
            <h1 style={{
              fontSize: '2.5em',
              marginBottom: '5px',
              fontWeight: 'bold',
            }}>{cv.firstName} {cv.lastName}</h1>
            
            <h2 style={{
              fontSize: '1.8em',
              marginBottom: '15px',
              fontWeight: 'normal',
            }}>{cv.title || 'Développeur Full Stack'}</h2>
          </div>
          
          {/* Contenu principal */}
          <div style={{ padding: '0 20px 20px 20px' }}>
            {experiences.length > 0 && (
              <section>
                <h3 style={{
                  fontSize: '1.6em',
                  margin: '30px 0 15px 0',
                  fontWeight: 'bold',
                }}>Expériences</h3>
                
                {experiences.map((exp, index) => (
                  <div key={exp.id || index} style={{ marginBottom: '20px' }}>
                    <p style={{ fontWeight: 'bold' }}>
                      {formatDateRange(exp.startDate, exp.endDate, exp.current)} {exp.company} {exp.location ? `à ${exp.location}` : ''}
                    </p>
                    
                    <p style={{ fontStyle: 'italic', marginBottom: '10px' }}>
                      {exp.title}
                    </p>
                    
                    {exp.description && (
                      <div style={{ marginLeft: '20px' }}>
                        {exp.description.split('\n').map((line, i) => (
                          <div key={i} style={{ marginBottom: '8px', display: 'flex', alignItems: 'baseline' }}>
                            <span style={{ marginRight: '8px' }}>•</span>
                            <span>{line}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </section>
            )}
            
            {skills.length > 0 && (
              <section>
                <h3 style={{
                  fontSize: '1.6em',
                  margin: '30px 0 15px 0',
                  fontWeight: 'bold',
                }}>Compétences</h3>
                
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '20px',
                  marginTop: '20px',
                }}>
                  {skillQuadrants.map((quadrant, index) => (
                    <div key={index} style={{ marginBottom: '20px' }}>
                      <div style={{
                        fontSize: '1.2em',
                        fontWeight: 'bold',
                        marginBottom: '10px',
                        textAlign: 'center',
                        padding: '8px',
                        borderRadius: '20px',
                        backgroundColor: quadrant.color === 'blue' ? '#6d92c0' : '#f7e989',
                        color: quadrant.color === 'blue' ? 'white' : 'black',
                        border: quadrant.color === 'yellow' ? '1px solid #ccc' : 'none',
                      }}>
                        {quadrant.title}
                      </div>
                      
                      <div style={{ padding: '0 10px' }}>
                        <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginBottom: '10px' }}>
                          {quadrant.skills.map((skill, i) => (
                            <li key={skill.id || i} style={{ marginBottom: '8px' }}>
                              {skill.name} {skill.level ? `(${Array(parseInt(skill.level)).fill('★').join('')})` : ''}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernCV;