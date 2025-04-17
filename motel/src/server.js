import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(join(__dirname, 'public')));

// Rota para registrar ponto
app.post('/api/registro', async (req, res) => {
  try {
    const { tipo, observacao } = req.body;
    const registro = await prisma.registroPonto.create({
      data: {
        tipo,
        observacao
      }
    });
    res.json(registro);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao registrar ponto' });
  }
});

// Rota para listar registros
app.get('/api/registros', async (req, res) => {
  try {
    const registros = await prisma.registroPonto.findMany({
      orderBy: {
        horario: 'desc'
      }
    });
    res.json(registros);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar registros' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
}); 