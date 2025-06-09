import React from 'react'
import { Container, Box, Grid, Typography, Paper, Fade } from '@mui/material'
import { LocationOn, Phone, AccessTime } from '@mui/icons-material'
import ContactForm from '../components/ContactForm'
import { styles } from '../styles/ContactForm.styles'

const Contact: React.FC = () => {
  const horaires = [
    { jour: 'Lundi', heures: 'Fermé' },
    { jour: 'Mardi', heures: '09:30-12:00, 14:00-18:30' },
    { jour: 'Mercredi', heures: '09:30-12:00, 14:00-18:30' },
    { jour: 'Jeudi', heures: '09:30-12:00, 14:00-18:30' },
    { jour: 'Vendredi', heures: '09:30-12:00, 14:00-18:30' },
    { jour: 'Samedi', heures: 'Fermé' },
    { jour: 'Dimanche', heures: 'Fermé' },
  ];

  return (
    <Box 
      sx={{ 
        position: 'relative',
        minHeight: 'calc(100vh - 64px)',
        backgroundImage: 'url(/majordhom.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        py: { xs: 4, md: 8 },
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
      />
      <Container maxWidth="lg" sx={{ position: 'relative' }}>
        <Fade in timeout={1000}>
          <Box>
            <Typography variant="h3" component="h1" align="center" 
              sx={{ mb: 6, color: 'white', fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
              Majordhom : une agence immobilière performante
            </Typography>
            
            <Grid container spacing={4}>
              <Grid item xs={12} md={5}>
                <Paper elevation={3} sx={{ p: 4, height: '100%', backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
                  <Typography variant="h5" gutterBottom sx={{ mb: 4, color: 'primary.main' }}>
                    Nos Coordonnées
                  </Typography>
                  
                  <Box sx={{ mb: 4 }}>
                    <Box sx={styles.contactInfo}>
                      <LocationOn sx={styles.infoIcon} />
                      <Box>
                        <Typography variant="subtitle1" fontWeight="bold">Adresse</Typography>
                        <Typography>12 Rue de Madagascar, 13006 Marseille</Typography>
                      </Box>
                    </Box>
                    
                    <Box sx={styles.contactInfo}>
                      <Phone sx={styles.infoIcon} />
                      <Box>
                        <Typography variant="subtitle1" fontWeight="bold">Téléphone</Typography>
                        <Typography>04 91 41 13 13</Typography>
                      </Box>
                    </Box>

                    <Box sx={styles.contactInfo}>
                      <AccessTime sx={styles.infoIcon} />
                      <Box>
                        <Typography variant="subtitle1" fontWeight="bold">Horaires</Typography>
                        {horaires.map((h) => (
                          <Typography key={h.jour}>
                            {h.jour}: {h.heures}
                          </Typography>
                        ))}
                      </Box>
                    </Box>
                  </Box>

                  <Box sx={styles.map}>
                    <iframe
                      title="Google Maps"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2904.065611188454!2d5.377847776926391!3d43.28961037913451!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12c9c0b84d30eabb%3A0x7c3b4079f4d4dbc0!2s12%20Rue%20de%20Madagascar%2C%2013006%20Marseille!5e0!3m2!1sfr!2sfr!4v1707929436044!5m2!1sfr!2sfr"
                      width="100%"
                      height="300"
                      style={{ border: 0 }}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </Box>
                </Paper>
              </Grid>

              <Grid item xs={12} md={7}>
                <Paper elevation={3} sx={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
                  <ContactForm />
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Fade>
      </Container>
    </Box>
  )
}

export default Contact
