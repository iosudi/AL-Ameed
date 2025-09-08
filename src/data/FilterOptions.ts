import { FilterOption } from "@/interfaces/FilterOptions";

export const filterOptions: FilterOption[] = [
    { id: 'brand', name: 'Brand', type: 'api' },
    {
        id: 'year', name: 'Year', type: 'text',
        options: [
            { id: '2019', label: '2019' },
            { id: '2020', label: '2020' },
            { id: '2021', label: '2021' },
            { id: '2022', label: '2022' },
            { id: '2023', label: '2023' },
            { id: '2024', label: '2024' },
            { id: '2025', label: '2025' },
        ]
    },
    {
        id: 'body_type', name: 'Body type', type: 'checkbox', options:
            [
                {
                    id: "sedan",
                    label: "Sedan",
                },
                {
                    id: "suv",
                    label: "SUV",
                },
                {
                    id: "hatchback",
                    label: "Hatchback",
                },
                {
                    id: "crossover",
                    label: "Crossover",
                },
                {
                    id: "pickup",
                    label: "Pickup Truck",
                },
                {
                    id: "minivan",
                    label: "Minivan / MPV",
                },
                {
                    id: "coupe",
                    label: "Coupe",
                },
                {
                    id: "convertible",
                    label: "Convertible",
                },
                {
                    id: "wagon",
                    label: "Station Wagon",
                },
                {
                    id: "limousine",
                    label: "Limousine",
                },
                {
                    id: "classic",
                    label: "Classic & Trucks",
                },
            ]
    },
    {
        id: 'engine_type',
        name: 'Engine Type',
        type: 'text',
        options: [
            { id: 'gasoline', label: 'Gasoline' },
            { id: 'diesel', label: 'Diesel' },
            { id: 'electric', label: 'Electric' },
            { id: 'hybrid', label: 'Hybrid' }
        ]
    },
    {
        id: 'transmission',
        name: 'Transmission',
        type: 'text',
        options: [
            { id: 'automatic', label: 'Automatic' },
            { id: 'manual', label: 'Manual' },
            { id: 'cvt', label: 'CVT' },
            { id: 'dual_clutch', label: 'Dual Clutch' }
        ]
    },
    // {
    //     id: 'condition',
    //     name: 'Condition',
    //     type: 'text',
    //     options: [
    //         { id: 'new', label: 'New' },
    //         { id: 'used', label: 'Used' },
    //         { id: 'certified', label: 'Certified Pre-owned' }
    //     ]
    // },
    // {
    //     id: 'is_featured',
    //     name: 'Featured',
    //     type: 'text',
    //     options: [
    //         { id: 'true', label: 'Yes' },
    //         { id: 'false', label: 'No' }
    //     ]
    // },
    {
        id: 'price',
        name: 'Price',
        type: 'range'  // ➕ 2 number fields (min-max)
    }
];

