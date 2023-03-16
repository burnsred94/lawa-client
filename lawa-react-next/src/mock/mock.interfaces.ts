interface Research {
    description: string,
    image: string,
    link: string,
    title: string
}

export interface DataPage {
    all_research: Research[],
    data_bp: {
        first_list: string[],
        last_list: string[],
    },
    description: string,
    slug: string,
    title: string
}

export interface MenuPropsItems {
    link: string,
    name: string
}
export interface Menu {
    link: string,
    name: string,
    props?: MenuPropsItems[]
}