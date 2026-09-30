import { User, Buyer, Seller, DeliveryPerson, Admin } from '../types';

export const mockAdmin: Admin = {
  id: 'admin-1',
  name: 'Administrador Mercado Maior',
  email: 'admin@mercadomaior.dev',
  role: 'admin',
  permissions: ['all'],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export const mockBuyer: Buyer = {
  id: 'buyer-1',
  name: 'João Comprador',
  email: 'comprador@mercadomaior.dev',
  role: 'buyer',
  cpf: '111.111.111-11',
  phone: '(86) 99999-1111',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export const mockSeller: Seller = {
  id: 'seller-1',
  name: 'Maria Vendedora',
  email: 'vendedor@mercadomaior.dev',
  role: 'seller',
  storeId: 'store-1',
  cnpjOrCpf: '222.222.222-22',
  phone: '(86) 99999-2222',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export const mockDeliveryPerson: DeliveryPerson = {
  id: 'delivery-1',
  name: 'Pedro Entregador',
  email: 'entregador@mercadomaior.dev',
  role: 'delivery',
  cpf: '333.333.333-33',
  rg: '3333333-PI',
  phone: '(86) 99999-3333',
  birthDate: '1995-05-15',
  cnh: '12345678901',
  vehicle: { type: 'motorcycle', model: 'Honda CG 160', plate: 'PIX-1234', color: 'Vermelha' },
  pixKey: '86999993333',
  isOnline: true,
  regions: ['Centro', 'Fátima', 'São Luís'],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export const allMockUsers: User[] = [mockAdmin, mockBuyer, mockSeller, mockDeliveryPerson];