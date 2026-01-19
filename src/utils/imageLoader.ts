// Helper para cargar imágenes dinámicamente desde src/assets/
import type { ImageMetadata } from 'astro';

// Importar todas las imágenes
const images = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/images/**/*.{jpeg,jpg,png,webp,avif}',
  { eager: true }
);

/**
 * Convierte una ruta de imagen del JSON a ImageMetadata
 * @param imagePath - Ruta desde JSON (ej: "/images/barril/estrella.webp")
 * @returns ImageMetadata para usar con <Picture> o <Image>
 */
export function getImageFromPath(imagePath: string): ImageMetadata | undefined {
  if (!imagePath) return undefined;

  // Normalizar la ruta: /images/barril/estrella.webp -> /src/assets/images/barril/estrella.webp
  const normalizedPath = imagePath.replace('/images/', '/src/assets/images/');

  const image = images[normalizedPath];
  return image?.default;
}

/**
 * Obtiene todas las imágenes cargadas (útil para debug)
 */
export function getAllLoadedImages() {
  return Object.keys(images);
}
