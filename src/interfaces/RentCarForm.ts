interface CustomerData {
    first_name: string;
    middle_name: string;
    last_name: string;
    phone_number: string;
    id_number: string;
    nationality: string;
    license_front_photo: File | null;
    license_back_photo: File | null;
    id_front_photo: File | null;
    id_back_photo: File | null;
}

export interface RentCarForm {
    customer_data: CustomerData;
    vehicle: string;
    start_date: string;
    end_date: string;
    acceptTerms: boolean,
    down_price: number;
    additional_details?: string;
}
