export interface Image {
    data: ImageObject 
}

export interface DataImg {
    id: number
    data: ImageObject
}

export interface ImageObject {
    id: number,
    attributes: {
        name: string;
        alternativeText?: any;
        caption?: any;
        width: number;
        height: number;
        formats: Formats;
        hash: string;
        ext: string;
        mime: string;
        size: number;
        url: string;
        previewUrl?: any;
        provider: string;
        provider_metadata?: any;
        createdAt: Date;
        updatedAt: Date;
    }
}


export interface Formats {
    thumbnail: Thumbnail;
}

export interface Thumbnail {
    ext: string;
    url: string;
    hash: string;
    mime: string;
    name: string;
    path?: any;
    size: number;
    width: number;
    height: number;
}