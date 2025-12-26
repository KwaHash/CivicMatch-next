'use client'

import { useEffect, useState } from 'react'
import { Heart, TrendingUp, ArrowRight, Share2 } from 'lucide-react'
import Link from 'next/link'
import MatchingResultCard from '@/components/card/matching-card'
import LoadingIndicator from '@/components/loading-indicator'
import { Button } from '@/components/ui/button'
import { RadarChart } from '@/components/ui/radar-chart'
import  { type MatchingResult } from '@/lib/types'

const MOCK_RESULTS: MatchingResult[] = [
  {
    politicianId: '1',
    politicianName: '山田 太郎',
    matchScore: 85,
    matchReasons: ['子育て政策で80%一致', '経済政策で90%一致', '地域課題への取り組みで75%一致'],
    categoryMatches: {
      economy: 90,
      welfare: 80,
      education: 85,
      environment: 70,
      diplomacy: 60,
      constitution: 50,
      disaster: 75,
      local: 80,
      other: 0,
    },
  },
  {
    politicianId: '2',
    politicianName: '佐藤 花子',
    matchScore: 78,
    matchReasons: ['社会保障政策で85%一致', '医療政策で90%一致'],
    categoryMatches: {
      economy: 65,
      welfare: 90,
      education: 70,
      environment: 75,
      diplomacy: 55,
      constitution: 60,
      disaster: 70,
      local: 75,
      other: 0,
    },
  },
  {
    politicianId: '3',
    politicianName: '鈴木 一郎',
    matchScore: 72,
    matchReasons: ['防災政策で95%一致', '地域活性化政策で80%一致'],
    categoryMatches: {
      economy: 70,
      welfare: 65,
      education: 60,
      environment: 75,
      diplomacy: 55,
      constitution: 50,
      disaster: 95,
      local: 85,
      other: 0,
    },
  },
]

export default function MatchingResultsPage() {
  const [results, setResults] = useState<MatchingResult[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setResults(MOCK_RESULTS)
      setIsLoading(false)
    }, 1000)
  }, [])

  if (isLoading) {
    return <LoadingIndicator />
  }

  const topResult = results[0]

  return (
    <div className="flex flex-col w-full min-h-[60vh] py-8 px-4">
      <div className="max-w-6xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">マッチング結果</h1>
          <p className="text-gray-600">あなたの考えに近い政治家が見つかりました</p>
        </div>

        {/* Top Result */}
        {topResult && (
          <div className="mb-12">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-8 text-white mb-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="inline-block px-4 py-2 bg-white/20 rounded-full text-sm font-medium mb-4">
                    最も一致度が高い
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold mb-2">{topResult.politicianName}</h2>
                  <div className="flex items-center gap-2 text-xl">
                    <TrendingUp className="h-6 w-6" />
                    <span className="font-bold">一致度 {topResult.matchScore}%</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-6xl font-bold mb-2">{topResult.matchScore}%</div>
                  <p className="text-indigo-100">マッチスコア</p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold mb-3">一致した理由</h3>
                <ul className="space-y-2 mb-6">
                  {topResult.matchReasons.map((reason, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                      {reason}
                    </li>
                  ))}
                </ul>
                <div className="bg-white/10 rounded-lg p-4">
                  <RadarChart data={topResult.categoryMatches} />
                </div>
              </div>

              <div className="flex gap-4">
                <Link href={`/politician/${topResult.politicianId}`} className="flex-1">
                  <Button className="bg-white text-indigo-600 hover:bg-gray-100 rounded-sm">
                    <span className='text-base'>詳細を見る</span>
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button className="bg-white text-indigo-600 hover:bg-gray-100 rounded-sm">
                  <Heart className="mr-2 h-5 w-5" />
                  <span>推し登録</span>
                </Button>
                <Button className="bg-white text-indigo-600 hover:bg-gray-100 rounded-sm">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* All Results */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">すべての結果</h2>
          <div className="space-y-6">
            {results.map((result, index) => (
              <MatchingResultCard key={result.politicianId} result={result} rank={index + 1} />
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-6 items-center justify-center mb-10">
          <Link href="/matching">
            <Button
              variant="outline"
              className="flex items-center px-8 py-7 gap-2 border-2 border-blue-600 text-blue-600 hover:bg-gray-50 hover:text-blue-700"
            >
              <span className="text-lg">もう一度マッチングする</span>
            </Button>
          </Link>
          <Link href="/search">
            <Button
              variant="outline"
              className="border-2 border-blue-600 bg-blue-600 hover:bg-blue-700 px-12 py-7 text-white flex items-center gap-2 hover:text-white"
            >
              <span className='text-lg'>地域から探す</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

