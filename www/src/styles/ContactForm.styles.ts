import { Theme } from '@mui/material';

export const styles = {
  form: {
    maxWidth: 800,
    mx: 'auto',
    p: { xs: 3, sm: 4 },
    borderRadius: 2,
    boxShadow: 3,
    bgcolor: 'background.paper',
  },
  title: {
    mb: 4,
    textAlign: 'center',
    color: 'primary.main',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  formControl: {
    mb: 2,
  },
  recaptcha: {
    my: 3,
    display: 'flex',
    justifyContent: 'center',
  },
  submitButton: {
    py: 1.5,
    mt: 2,
    float: 'right',
    width: 'auto',
    px: 4,
  },
  contactInfo: {
    display: 'flex',
    alignItems: 'center',
    mb: 2,
    transition: 'transform 0.2s ease',
    '&:hover': {
      transform: 'translateX(10px)',
    },
  },
  infoIcon: {
    mr: 2,
    fontSize: '2rem',
    color: 'primary.main',
  },
  map: {
    borderRadius: 2,
    overflow: 'hidden',
    boxShadow: 1,
  },
};