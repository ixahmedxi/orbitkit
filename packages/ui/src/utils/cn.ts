import type { ClassValue } from 'clsx'

import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * This function merges tailwind class names using a combination of clsx and tailwind-merge.
 * @param inputs the class names to merge
 * @returns the merged class names as a string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
