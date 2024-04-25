import { clsx } from 'clsx'
import { customAlphabet, nanoid } from 'nanoid'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: (string | null | undefined)[]): string {
  return twMerge(clsx(inputs.filter(Boolean)))
}

export const nanoidGenerator = customAlphabet(
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  7
)

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

export function formatDate(input: string | number | Date): string {
  const date = new Date(input)
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })
}
