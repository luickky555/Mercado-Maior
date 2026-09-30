// Usuários e Perfis
export type Role = 'buyer' | 'seller' | 'delivery' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Buyer extends User {
  cpf: string;
  phone: string;
  defaultAddressId?: string;
}

export interface Seller extends User {
  storeId: string;
  cnpjOrCpf: string;
  phone: string;
}

export interface DeliveryPerson extends User {
  cpf: string;
  rg: string;
  phone: string;
  birthDate: string;
  cnh: string;
  vehicle: {
    type: 'car' | 'motorcycle' | 'bicycle';
    model: string;
    plate: string;
    color: string;
  };
  pixKey: string;
  isOnline: boolean;
  regions: string[];
  currentLocation?: {
    lat: number;
    lng: number;
  };
}

export interface Admin extends User {
  permissions: string[];
}

// Catálogo e Produtos
export interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string;
}

export interface ProductVariant {
  id: string;
  name: string; // ex: "Tamanho", "Cor"
  value: string; // ex: "M", "Vermelho"
  additionalPrice: number;
  stock: number;
}

export interface Product {
  id: string;
  storeId: string;
  categoryId: string;
  name: string;
  description: string;
  history?: string;
  origin?: string;
  ingredients?: string[];
  materials?: string[];
  cost: number;
  price: number;
  stock: number;
  weight?: number;
  dimensions?: { width: number; height: number; length: number };
  images: string[];
  variants?: ProductVariant[];
  tags: string[];
  isCampoMaiorMade: boolean;
  isActive: boolean;
  salesCount: number;
  viewsCount: number;
  sharesCount: number;
  createdAt: string;
}

export interface Store {
  id: string;
  sellerId: string;
  name: string;
  description: string;
  logoUrl?: string;
  coverUrl?: string;
  rating: number;
  address: Address;
  createdAt: string;
}

// Pedidos e Entregas
export type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'waiting_delivery' | 'in_transit' | 'delivered' | 'canceled';

export interface OrderItem {
  id: string;
  productId: string;
  variantId?: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Order {
  id: string;
  buyerId: string;
  storeId: string;
  deliveryPersonId?: string;
  items: OrderItem[];
  status: OrderStatus;
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  deliveryAddress: Address;
  paymentMethod: 'pix' | 'credit_card' | 'cash' | 'wallet';
  createdAt: string;
  updatedAt: string;
}

export type DeliveryStatus = 'accepted' | 'going_to_store' | 'at_store' | 'picked_up' | 'on_the_way' | 'arrived' | 'completed';

export interface Delivery {
  id: string;
  orderId: string;
  deliveryPersonId: string;
  status: DeliveryStatus;
  pickupAddress: Address;
  dropoffAddress: Address;
  distance: number;
  fee: number;
  createdAt: string;
  updatedAt: string;
}

// Auxiliares
export interface Address {
  id?: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  lat?: number;
  lng?: number;
}

export interface Vacancy {
  id: string;
  region: string;
  neighborhood: string;
  schedule: string;
  shift: 'morning' | 'afternoon' | 'night' | 'full';
  vehicleType: 'car' | 'motorcycle' | 'bicycle' | 'any';
  estimatedEarnings: number;
  quantity: number;
  deadline: string;
  requirements: string[];
  status: 'open' | 'few_left' | 'closed' | 'talent_pool';
}

export interface Application {
  id: string;
  vacancyId: string;
  deliveryPersonId: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedAt: string;
}

export interface Review {
  id: string;
  authorId: string;
  targetId: string; // Pode ser Product, Store ou DeliveryPerson
  targetType: 'product' | 'store' | 'delivery';
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'order' | 'sale' | 'delivery' | 'vacancy' | 'system' | 'review';
  read: boolean;
  createdAt: string;
}

export interface Coupon {
  id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minPurchaseValue?: number;
  expiresAt: string;
  isActive: boolean;
}

export interface Payment {
  id: string;
  orderId: string;
  status: 'pending' | 'paid' | 'failed' | 'refunded';
  method: 'pix' | 'credit_card' | 'cash' | 'wallet';
  amount: number;
  paidAt?: string;
}

export interface FinancialReport {
  period: string;
  revenue: number;
  costs: number;
  profit: number;
  margin: number;
  salesCount: number;
  averageTicket: number;
}

export interface ShareEvent {
  id: string;
  userId?: string;
  targetId: string;
  targetType: 'product' | 'store' | 'vacancy';
  channel: 'whatsapp' | 'facebook' | 'twitter' | 'link' | 'qrcode';
  sharedAt: string;
}