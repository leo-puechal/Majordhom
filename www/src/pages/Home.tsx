import React from 'react'
import { Container, Typography, Box, Grid, Paper, Button } from '@mui/material'
import { Home as HomeIcon, LocationOn, Search, Assignment } from '@mui/icons-material'
import { Link as RouterLink } from 'react-router-dom'

const Home: React.FC = () => {
  const services = [
    {
      icon: <HomeIcon sx={{ fontSize: 40 }} />,
      title: "Vente immobilière",
      description: "Accompagnement personnalisé dans votre projet d'achat ou de vente"
    },
    {
      icon: <LocationOn sx={{ fontSize: 40 }} />,
      title: "Estimation gratuite",
      description: "Évaluation professionnelle de votre bien immobilier"
    },
    {
      icon: <Search sx={{ fontSize: 40 }} />,
      title: "Recherche personnalisée",
      description: "Trouvez le bien qui correspond à vos critères"
    }
  ];

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 64px)',
        backgroundImage: 'url(/majordhom.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <Box
        sx={{
          background: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.4))',
          minHeight: 'calc(100vh - 64px)',
          pt: 8,
          pb: 6
        }}
      >
        <Container>
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography
              variant="h2"
              component="h1"
              sx={{
                color: 'white',
                fontWeight: 'bold',
                mb: 3,
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
              }}
            >
              Bienvenue chez Majordhom
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: 'white',
                mb: 4,
                textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
              }}
            >
              Votre partenaire immobilier de confiance à Marseille
            </Typography>
            <Button
              component={RouterLink}
              to="/contact"
              variant="contained"
              size="large"
              startIcon={<Assignment />}
              sx={{
                py: 2,
                px: 4,
                fontSize: '1.1rem'
              }}
            >
              Nous contacter
            </Button>
          </Box>

          <Grid container spacing={4}>
            {services.map((service, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Paper
                  elevation={3}
                  sx={{
                    p: 4,
                    height: '100%',
                    textAlign: 'center',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-10px)'
                    }
                  }}
                >
                  <Box sx={{ color: 'primary.main', mb: 2 }}>
                    {service.icon}
                  </Box>
                  <Typography variant="h5" component="h3" gutterBottom>
                    {service.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {service.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
