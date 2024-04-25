import { clsx } from 'clsx' // Importing clsx for class name manipulation
import { customAlphabet, nanoid } from 'nanoid' // Importing nanoid for generating unique IDs
import { twMerge } from 'tailwind-merge' // Importing twMerge for merging Tailwind CSS classes

/**
 * Accepts variable number of inputs, merges the applicable class names, and returns the resulting class name string.
 * @param {...(string | null | undefined)[]} inputs - Variable number of class name strings, null, or undefined values.
 * @return {string} - The merged class name string.
 */
export function cn(...inputs: (string | null | undefined)[]): string {
  return twMerge(clsx(inputs.filter(Boolean)))
}

/**
 * Generates a custom alphabet-based nanoid of a specified length.
 * @type {(alphabet: string, size: number) => string}
 * @param {string} alphabet - The character set to generate the nanoid from.
 * @param {number} size - The length of the generated nanoid.
 * @return {string} - The generated nanoid.
 */
export const nanoidGenerator = customAlphabet(
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  7
)

/**
 * A generic fetch function that accepts an input and optional init object, and returns the parsed JSON response.
 * @template JSON - The expected JSON type of the response.
 * @param {RequestInfo} input - The request information (URL, init object, etc.).
 * @param {RequestInit} [init] - The optional init object for customizing the request.
 * @return {Promise<JSON>} - A Promise that resolves to the parsed JSON response.
 */
export async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, init)

  if (!res.ok) {
    if (res.status === 404) {
      throw new Error('Not Found')
    }

    const json = await res.json()
    throw new Error(json.message || 'An unexpected error occurred')
  }

  return res.json()
}

/**
 * Formats a date input into a localized string representation of the date.
 * @param {string | number | Date} input - The date input as a string, number, or Date object.
 * @return {string} - The localized date string.
 */
export function formatDate(input: string | number | Date): string {
  const date = new Date(input)
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })
}
