'use client'

import { useState } from 'react'
import { Heart, HeartOff } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface SupportButtonProps {
  politicianId: string
  isSupported: boolean
  supportCount: number
  onSupportToggle?: (politicianId: string, isSupported: boolean) => void
  className?: string
}

export function SupportButton({
  politicianId,
  isSupported: initialIsSupported,
  supportCount: initialSupportCount,
  onSupportToggle,
  className = '',
}: SupportButtonProps) {
  const [isSupported, setIsSupported] = useState(initialIsSupported)
  const [supportCount, setSupportCount] = useState(initialSupportCount)
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = () => {
    setIsLoading(true)
    const newIsSupported = !isSupported
    setIsSupported(newIsSupported)
    setSupportCount((prev) => (newIsSupported ? prev + 1 : prev - 1))

    if (onSupportToggle) {
      onSupportToggle(politicianId, newIsSupported)
    }
    setIsLoading(false)
  }

  return (
    <Button
      onClick={handleClick}
      disabled={isLoading}
      variant={isSupported ? 'default' : 'outline'}
      className={`${isSupported ? 'bg-pink-600 hover:bg-pink-700' : ''} ${className}`}
    >
      {isSupported ? (
        <>
          <Heart className="mr-2 h-5 w-5 fill-current" />
          <span>推し登録済み</span>
        </>
      ) : (
        <>
          <HeartOff className="mr-2 h-5 w-5" />
          <span>推し登録</span>
        </>
      )}
      <span className="ml-2">({supportCount.toLocaleString()})</span>
    </Button>
  )
}

