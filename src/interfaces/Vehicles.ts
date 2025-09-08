export interface Vehicles {
    "id": number,
    "brand": number,
    "brand_name": string,
    "type": string,
    "model": string,
    "year": number,
    "price": number,
    "current_price": number,
    "currency": string,
    "body_type": string,
    "color": string,
    "mileage": number,
    "available_units": number,
    "engine_type": string,
    "status": string,
    "transmission": string,
    "is_featured": boolean,
    "primary_image": string,
    "is_negotiable": boolean
    "is_available": boolean
}

export interface VehicleDetails {
    id: number
    brand_details: BrandDetails
    features_list: FeaturesList[]
    images: Image[]
    inquiry_data_details: number[]
    model: string
    year: number
    price: number
    current_price: number
    currency: string
    body_type: string
    type: string
    color: string
    mileage: number
    engine_type: string
    engine_capacity: number
    cylinders: number
    transmission: string
    seats: number
    insurance_expiry: string
    created_at: string
    updated_at: string
    is_featured: boolean
    is_active: boolean
    is_negotiable: boolean
    brand: number
    inquiry_data: number[]
    features: number[]
}

export interface BrandDetails {
    id: number
    name: string
    logo: string
    description: string
}

export interface FeaturesList {
    id: number
    name: string
}

export interface Image {
    id: number
    image: string
    is_primary: boolean
    caption: string
}