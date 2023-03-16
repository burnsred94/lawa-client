
export interface HeaderImg {
    name: string;
    url: string;
}

export interface Img {
    name: string;
    url: string;
}

export interface Service {
    id: number;
    title: string;
    slug: string;
    img: Img;
}

export interface ApproachImage {
    name: string;
    url: string;
}

export interface Img2 {
    name: string;
    url: string;
}

export interface ApproachList {
    id: number;
    title: string;
    description: string;
    img: Img2;
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

export interface Logo {
    name: string;
    url: string;
}

export interface Review {
    id: number;
    name: string;
    description: string;
    post: string;
    link: string;
    logo: Logo;
}

export interface TrustImage {
    id: number;
    name: string;
    url: string;
}

export interface MainPage {
    title: string;
    sub_title: string;
    time_work: string;
    header_img: HeaderImg;
    title_services: string;
    services: Service[];
    title_approach: string;
    approach_image: ApproachImage;
    approach_list: ApproachList[];
    slogan: string;
    title_form: string;
    description_form: string;
    title_cases: string;
    link_case: string;
    case: Case[];
    title_review: string;
    link_review: string;
    reviews: Review[];
    title_trust: string;
    trust_images: TrustImage[];
    title_questions: string;
    link_question: string;
}




