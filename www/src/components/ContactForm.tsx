import React, { useState } from 'react';
import {
    TextField,
    Button,
    Box,
    Typography,
    Container,
    Alert,
    Snackbar,
    Grid,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    MenuItem,
    Chip,
    Stack,
    Checkbox,
    FormGroup
} from '@mui/material';
import ReCAPTCHA from "react-google-recaptcha";
import { ContactFormData, Availability } from '../types/contact';
import { styles } from '../styles/ContactForm.styles';

const ContactForm: React.FC = () => {
    const [formData, setFormData] = useState<ContactFormData>({
        civility: 'M',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        availabilities: [],
        messageType: 'visite',
        message: ''
    });

    const [availability, setAvailability] = useState<Availability>({
        day: '',
        hour: '09',
        minute: '00'
    });

    const [captchaValue, setCaptchaValue] = useState<string | null>(null);
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState(false);

    const days = ['Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];
    const hours = Array.from({ length: 10 }, (_, i) => (i + 9).toString().padStart(2, '0'));
    const minutes = ['00', '15', '30', '45'];

    const handleAddAvailability = () => {
        const newAvailability = `${availability.day} ${availability.hour}:${availability.minute}`;
        setFormData(prev => ({
            ...prev,
            availabilities: [...prev.availabilities, newAvailability]
        }));
    };

    const handleRemoveAvailability = (index: number) => {
        setFormData(prev => ({
            ...prev,
            availabilities: prev.availabilities.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!captchaValue) {
            setError('Please complete the captcha');
            return;
        }

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    civility: formData.civility,
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    phone: formData.phone,
                    availabilities: formData.availabilities,
                    messageType: formData.messageType,
                    message: formData.message,
                    captcha: captchaValue
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to submit form');
            }

            setSuccess(true);
            setFormData({
                civility: 'M',
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                availabilities: [],
                messageType: 'visite',
                message: ''
            });
            setCaptchaValue(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        }
    };

    return (
        <Container>
            <Box sx={styles.form}>
                <Typography variant="h4" sx={styles.title}>
                    CONTACTEZ L'AGENCE
                </Typography>
                
                <form onSubmit={handleSubmit}>
                    <Typography variant="h6" gutterBottom>
                        VOS COORDONNÉES
                    </Typography>

                    <FormControl component="fieldset" sx={{ mb: 2 }}>
                        <RadioGroup
                            row
                            value={formData.civility}
                            onChange={(e) => setFormData({ ...formData, civility: e.target.value as 'Mme' | 'M' })}
                        >
                            <FormControlLabel value="Mme" control={<Radio />} label="Mme" />
                            <FormControlLabel value="M" control={<Radio />} label="M" />
                        </RadioGroup>
                    </FormControl>

                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Nom"
                                value={formData.lastName}
                                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                required
                                sx={styles.formControl}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Prénom"
                                value={formData.firstName}
                                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                required
                                sx={styles.formControl}
                            />
                        </Grid>
                    </Grid>

                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                                sx={styles.formControl}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Téléphone"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                required
                                sx={styles.formControl}
                            />
                        </Grid>
                    </Grid>

                    <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                        DISPONIBILITÉ POUR UNE VISITE
                    </Typography>

                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} sm={4}>
                            <TextField
                                select
                                fullWidth
                                label="Jour"
                                value={availability.day}
                                onChange={(e) => setAvailability({ ...availability, day: e.target.value })}
                            >
                                {days.map((day) => (
                                    <MenuItem key={day} value={day}>{day}</MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <TextField
                                select
                                fullWidth
                                label="Heure"
                                value={availability.hour}
                                onChange={(e) => setAvailability({ ...availability, hour: e.target.value })}
                            >
                                {hours.map((hour) => (
                                    <MenuItem key={hour} value={hour}>{hour}</MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <TextField
                                select
                                fullWidth
                                label="Minute"
                                value={availability.minute}
                                onChange={(e) => setAvailability({ ...availability, minute: e.target.value })}
                            >
                                {minutes.map((minute) => (
                                    <MenuItem key={minute} value={minute}>{minute}</MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <Button
                                variant="contained"
                                onClick={handleAddAvailability}
                                fullWidth
                            >
                                Ajouter
                            </Button>
                        </Grid>
                    </Grid>

                    <Stack direction="row" spacing={1} sx={{ mt: 2, flexWrap: 'wrap', gap: 1 }}>
                        {formData.availabilities.map((dispo, index) => (
                            <Chip
                                key={index}
                                label={dispo}
                                onDelete={() => handleRemoveAvailability(index)}
                                color="primary"
                            />
                        ))}
                    </Stack>

                    <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                        VOTRE MESSAGE
                    </Typography>

                    <FormGroup row sx={{ mb: 2 }}>
                        <FormControlLabel
                            control={<Checkbox checked={formData.messageType === 'visite'} />}
                            label="Demande de visite"
                            onChange={() => setFormData({ ...formData, messageType: 'visite' })}
                        />
                        <FormControlLabel
                            control={<Checkbox checked={formData.messageType === 'rappel'} />}
                            label="Être rappelé(e)"
                            onChange={() => setFormData({ ...formData, messageType: 'rappel' })}
                        />
                        <FormControlLabel
                            control={<Checkbox checked={formData.messageType === 'photos'} />}
                            label="Plus de photos"
                            onChange={() => setFormData({ ...formData, messageType: 'photos' })}
                        />
                    </FormGroup>

                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        label="Votre message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                        sx={styles.formControl}
                    />

                    <Box sx={styles.recaptcha}>
                        <ReCAPTCHA
                            sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                            onChange={(value: string | null) => setCaptchaValue(value)}
                        />
                    </Box>

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        disabled={!captchaValue}
                        sx={styles.submitButton}
                    >
                        Envoyer
                    </Button>
                </form>
            </Box>

            <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError('')}>
                <Alert severity="error">{error}</Alert>
            </Snackbar>

            <Snackbar open={success} autoHideDuration={6000} onClose={() => setSuccess(false)}>
                <Alert severity="success">Message envoyé avec succès !</Alert>
            </Snackbar>
        </Container>
    );
};

export default ContactForm;