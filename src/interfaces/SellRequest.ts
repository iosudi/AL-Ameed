export interface SellRequest {
    count: number
    next: string | null
    previous: string | null
    results: SellRequestResult[]
}

export interface SellRequestResult {
    id: number
    brand_model: string
    year: number
    mileage: number
    fuel_type: string
    transmission: string
    color: string
    previous_accidents: boolean
    previous_owners_count: number
    body_condition: string
    accessories: string
    accessories_list: string[]
    price: number
    seller_name: string
    seller_phone: string
    seller_email: string
    status: string
    created_at: string
    updated_at: string
    images: Image[]
    price_negotiable: boolean
}

export interface Image {
    id: number
    image: string
    car_listing: number
}
