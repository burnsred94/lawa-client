
export interface PreviewImg {
    name: string;
    url: string;
}

export interface Img {
    name: string;
    url: string;
}

export interface SubService {
    id: number;
    title: string;
    description: string;
    slug: string;
    img: Img;
}

export interface Img2 {
    name: string;
    url: string;
}

export interface TableWeAndYou {
    we: string[];
    img: Img2;
    you: string[];
}

export interface Img3 {
    name: string;
    url: string;
}

export interface Case {
    id: number;
    description: string;
    link: string;
    img: Img3;
}

export interface Img4 {
    name: string;
    url: string;
}

export interface Review {
    id: number;
    description: string;
    name: string;
    link: string;
    post: string;
    img: Img4;
}

export interface ServicePage {
    title: string;
    title_service?: any;
    description: string;
    link_service: string;
    preview_img: PreviewImg;
    sub_services: SubService[];
    table_we_and_you: TableWeAndYou;
    title_cases: string;
    cases_link: string;
    cases: Case[];
    title_review: string;
    link_review: string;
    reviews: Review[];
}



