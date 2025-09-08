import { VehicleDetails } from "./Vehicles";

export interface RentalRequest {
  count: number;
  next: null | string;
  previous: null | string;
  results: RentalResults[];
}

export interface RentalResults {
  id: number;
  customer_data: CustomerData;
  vehicle: VehicleDetails;
  user: User;
  start_date: string;
  end_date: string;
  status: string;
  total_price: number;
  created_at: string;
  updated_at: string;
  inspection_form: string;
  down_price?: string
  installments: Installment[];
}

export interface Installment {
  amount: number;
  due_date: string;
  id: number;
  is_paid: boolean;
}

export interface CustomerData {
  id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  phone_number: string;
  id_number: string;
  nationality: string;
  license_front_photo: string;
  license_back_photo: string;
  id_front_photo: string;
  id_back_photo: string;
  created_at: string;
  updated_at: string;
}

interface User {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
}
