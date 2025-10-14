import { getImageProps } from "next/image";

export function getOptimizedImage(src: string, alt: string, width: number, height: number) {
  return getImageProps({
    src,
    alt,
    width,
    height,
    priority: true,
  });
}