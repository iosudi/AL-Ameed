
export interface UserResult {
    count: number;
    next: string | null;
    previous: string | null;
    results: User[];
}

export interface User {
    date_joined: string;
    email: string;
    first_name: string;
    id: number;
    is_active: boolean;
    is_staff: boolean;
    is_superuser: boolean;
    last_login: string;
    last_name: string;
    phone: string;
    user_type: string;
    username: string;
    user_permissions: number[]
}

export interface Permissions {
    codename: string
    content_type: number
    id: number
    name: string
}