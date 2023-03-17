import { ImageLoaderProps } from "next/image";

export const loaderImage =(src: string): string =>{
  console.log(src);
    return `${process.env.NEXT_PUBLIC_DOMAIN}${src}`;
  }