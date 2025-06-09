import express from 'express'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import axios from 'axios'

const prisma = new PrismaClient()
const app = express()
const port = process.env.PORT || 3001

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5
})

const contactSchema = z.object({
  civility: z.string(),
  firstName: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  lastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  phone: z.string().min(8, "Le numéro de téléphone doit contenir au moins 8 caractères"),
  availabilities: z.array(z.string()),
  messageType: z.enum(['visite', 'rappel', 'photos']),
  message: z.string().min(3, "Le message doit contenir au moins 3 caractères"),
  captcha: z.string()
})

app.use(cors())
app.use(express.json())
app.use('/api/contact', limiter)

async function verifyRecaptcha(token: string): Promise<boolean> {
  try {
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.HCAPTCHA_SECRET}&response=${token}`
    );
    return response.data.success;
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return false;
  }
}

app.get('/', (_req, res) => {
  res.json({
    message: 'API Majordhom is running',
    endpoints: {
      contact: '/api/contact',
    }
  })
})

app.get('/api/test', (_req, res) => {
  res.json({ status: 'ok', message: 'API is working!' })
})

app.post('/api/contact', async (req, res) => {
  try {
    const data = contactSchema.parse(req.body)
    
    const captchaValid = await verifyRecaptcha(data.captcha);
    if (!captchaValid) {
      return res.status(400).json({ error: 'Captcha invalide' })
    }

    const { captcha, ...requestData } = data;
    const contact = await prisma.contact.create({
      data: {
        name: `${requestData.civility} ${requestData.firstName} ${requestData.lastName}`,
        ...requestData
      }
    })

    return res.json(contact)
  } catch (error) {
    console.error('Form submission error:', error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        error: 'Validation error',
        details: error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message
        }))
      });
    }
    return res.status(400).json({ 
      error: 'Erreur lors de la soumission',
      details: error instanceof Error ? error.message : 'Erreur inconnue'
    })
  }
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
