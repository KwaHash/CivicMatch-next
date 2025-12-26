import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function toLocaleDateString(date: string | Date | undefined) {
  if (!date) return ''
  return new Date(date).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).replaceAll('/', '.')
}

export function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    economy: '経済',
    welfare: '社会保障',
    education: '教育',
    environment: '環境',
    diplomacy: '外交',
    constitution: '憲法',
    disaster: '防災',
    local: '地域',
    other: 'その他',
  }
  return labels[category] || 'その他'
}