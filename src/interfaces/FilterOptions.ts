export interface FilterOption {
    id: string;
    name: string;
    type: 'checkbox' | 'text' | 'api' | 'range';  // NEW
    options?: {
        id: string;
        label: string;
    }[];
}
