import { Vacancy } from '../types';

export const mockVacancies: Vacancy[] = [
  {
    id: 'vac-1',
    region: 'Centro e Adjacências',
    neighborhood: 'Centro',
    schedule: '08:00 às 18:00',
    shift: 'full',
    vehicleType: 'motorcycle',
    estimatedEarnings: 2500.00,
    quantity: 5,
    deadline: '2024-12-31',
    requirements: ['CNH Categoria A', 'Moto própria', 'Conhecimento da região central'],
    status: 'open'
  },
  {
    id: 'vac-2',
    region: 'Bairro de Fátima',
    neighborhood: 'Fátima',
    schedule: '18:00 às 23:00',
    shift: 'night',
    vehicleType: 'bicycle',
    estimatedEarnings: 1200.00,
    quantity: 2,
    deadline: '2024-10-15',
    requirements: ['Disposição', 'Bicicleta própria'],
    status: 'few_left'
  }
];