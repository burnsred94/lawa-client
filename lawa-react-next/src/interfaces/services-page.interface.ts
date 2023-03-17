export interface IServicesPage {
    title: string;
    title_services: string;
    title_sphere: string;
    link_sphere: string;
    title_results: string;
    title_images: string;
    title_question: string;
    link_question: string;
    services: Service[];
    spheres: [Sphere];
    images_result: ImagesResult[];
    list_result: ListResult[];
    table: Table;
    trust_images: [Img3];
}



export interface Img {
    url: string;
    alt: string;
}

export interface Service {
    title: string;
    slug: string;
    img: Img;
}

export interface ImagesResult {
    url: string;
    alt: string;
}

export interface Img2 {
    url: string;
    alt: string;
}

export interface ListResult {
    description: string;
    img: Img2;
}

export interface We {
    text: string;
}

export interface You {
    text: string;
}

export interface Img3 {
    id: number;
    name: string;
    alternativeText?: any;
    caption?: any;
    width: number;
    height: number;
    formats?: any;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl?: any;
    provider: string;
    provider_metadata?: any;
    folderPath: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Table {
    id: number;
    We: We[];
    You: You[];
    title_we: string;
    title_you: string;
    img: Img3;
}

export interface Sphere {
    title: string,
    img: {
        url: string,
        alt: string
    }
}



