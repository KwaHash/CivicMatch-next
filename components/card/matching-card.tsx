'use client'

import { useState } from 'react'
import { Heart, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { RadarChart } from '@/components/ui/radar-chart'
import  { type MatchingResult } from '@/lib/types'

export default function MatchingResultCard({ result, rank }: { result: MatchingResult; rank: number }) {
  const [showChart, setShowChart] = useState(false)

  return (
    <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-4 flex-1">
          <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
            <span className="text-indigo-600 font-bold text-lg">{rank}</span>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-xl font-bold text-gray-900">{result.politicianName}</h3>
              <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                {result.matchScore}% 一致
              </span>
            </div>
            <ul className="space-y-1 mb-4">
              {result.matchReasons.map((reason, index) => (
                <li key={index} className="text-sm text-gray-600 flex items-center">
                  <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-2"></span>
                  {reason}
                </li>
              ))}
            </ul>
            {/* Radar chart (collapsible) */}
            <div className="mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowChart(!showChart)}
                className="mb-2 rounded-sm"
              >
                {showChart ? 'グラフを隠す' : '詳細グラフを見る'}
              </Button>
              {showChart && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <RadarChart data={result.categoryMatches} />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Link href={`/politician/${result.politicianId}`}>
            <Button variant="outline" size="sm" className='w-full rounded-sm'>
              詳細
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Button variant="outline" size="sm" className='w-full rounded-sm'>
            <Heart className="h-4 w-4 mr-2" />
            推し登録
          </Button>
        </div>
      </div>
    </div>
  )
}