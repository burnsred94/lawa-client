import { ImageLoaderProps } from "next/image";

export const loaderImage =(src: string): string =>{
    return `${process.env.NEXT_PUBLIC_DOMAIN}${src}`;
  }