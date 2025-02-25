export interface Category {
    title: string;
    slug: string;
    description: string;
    resources: Resource[];
}

export interface Resource {
    title: string;
    description?: string;
    phone?: string;
    other?: ResourceLink[];
}

export interface ResourceLink {
    url: string;
    label: string;
    newTab?: boolean;
}

export interface HIVCenter {
    city: string;
    address: string;
    phoneNumbers: string[];
}

export interface Env {
    BOT_INFO: string;
    BOT_TOKEN: string;
    API_BASE_URL: string;
}
