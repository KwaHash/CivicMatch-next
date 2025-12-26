'use client'

import { useState, useEffect } from 'react'
import { Share2, MapPin, Building2, Instagram, Youtube, Twitter } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import LoadingIndicator from '@/components/loading-indicator'
import { ActivityStatisticsChart } from '@/components/politician/activity-statistics'
import { SNSPosts } from '@/components/politician/sns-posts'
import { SupportButton } from '@/components/politician/support-button'
import { Button } from '@/components/ui/button'
import  { type Politician, type SNSPost, type ActivityStatistics } from '@/lib/types'
import { getCategoryLabel } from '@/lib/utils'

const MOCK_POLITICIAN: Politician = {
  id: '1',
  name: '山田 太郎',
  nameKana: 'ヤマダ タロウ',
  birthDate: '1980-01-15',
  party: '自由民主党',
  constituency: '東京都第1区',
  prefecture: '東京都',
  city: '渋谷区',
  profileImage: '/avatar/01.jpg',
  headerImage: '/img/header_01.jpg',
  biography: '地方出身の政治家として、地域の声を国政に届けることを目指しています。',
  education: ['○○大学法学部卒業'],
  career: ['○○市議会議員（2期）', '現在：衆議院議員（1期）'],
  policies: [
    { id: 'p1', category: 'economy', title: '経済成長戦略', description: '持続可能な経済成長を目指します', priority: 1 },
    { id: 'p2', category: 'education', title: '教育制度改革', description: '子どもたちの未来を創る教育を', priority: 2 },
    { id: 'p3', category: 'welfare', title: '子育て支援', description: '安心して子育てできる社会を', priority: 3 },
  ],
  snsLinks: {
    instagram: 'https://instagram.com/example',
    youtube: 'https://youtube.com/example',
    twitter: 'https://twitter.com/example',
    officialWebsite: 'https://example.com',
  },
  activityScore: 85,
  supportCount: 1200,
  electionCount: 105,
  verified: true,
  kycStatus: 'approved',
}

const MOCK_SNS_POSTS: SNSPost[] = [
  {
    id: '1',
    politicianId: '1',
    platform: 'instagram',
    postId: '123',
    content: '今日は地元のイベントに参加しました。多くの方々とお話しできて嬉しかったです！',
    imageUrl: '/img/post_1.jpg',
    url: 'https://instagram.com/p/123',
    likes: 245,
    comments: 12,
    shares: 8,
    postedAt: new Date(Date.now() - 86400000).toISOString(),
    fetchedAt: new Date().toISOString(),
    visible: true,
  },
  {
    id: '2',
    politicianId: '1',
    platform: 'twitter',
    postId: '456',
    content: '議会での質疑応答の様子です。教育政策について質問しました。',
    imageUrl: '/img/post_2.jpg',
    url: 'https://twitter.com/status/456',
    likes: 189,
    comments: 23,
    shares: 45,
    postedAt: new Date(Date.now() - 172800000).toISOString(),
    fetchedAt: new Date().toISOString(),
    visible: true,
  },
]

const MOCK_ACTIVITY_STATISTICS: ActivityStatistics = {
  politicianId: '1',
  period: 'year',
  speechCount: 45,
  questionCount: 28,
  mediaAppearanceCount: 12,
  categoryBreakdown: {
    economy: 25,
    welfare: 20,
    education: 15,
    environment: 10,
    diplomacy: 8,
    constitution: 5,
    disaster: 12,
    local: 5,
    other: 0,
  },
  sentimentAnalysis: {
    positive: 65,
    neutral: 25,
    negative: 10,
  },
  monthlyData: [
    { month: '2024-01', speechCount: 3, questionCount: 2 },
    { month: '2024-02', speechCount: 4, questionCount: 3 },
    { month: '2024-03', speechCount: 5, questionCount: 4 },
    { month: '2024-04', speechCount: 4, questionCount: 2 },
    { month: '2024-05', speechCount: 6, questionCount: 3 },
    { month: '2024-06', speechCount: 5, questionCount: 4 },
  ],
}

export default function PoliticianDetailPage({ params }: { params: { id: string } }) {
  const { id } = params
  const [politician, setPolitician] = useState<Politician | null>(null)
  const [isSupporting, setIsSupporting] = useState(false)
  const [snsPosts, setSnsPosts] = useState<SNSPost[]>(MOCK_SNS_POSTS)
  const [activityStatistics, setActivityStatistics] = useState<ActivityStatistics>(MOCK_ACTIVITY_STATISTICS)

  useEffect(() => {
    setPolitician(MOCK_POLITICIAN)
  }, [id])

  if (!politician) {
    return <LoadingIndicator />
  }

  return (
    <div className="flex flex-col w-full min-h-[60vh]">
      {/* Header Section */}
      <div className="relative h-64 md:h-96 bg-gradient-to-br from-indigo-500 to-purple-600">
        {politician.headerImage && (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${politician.headerImage})` }}
          />
        )}
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 md:px-8 h-full flex items-end pb-8">
          <div className="flex items-end gap-6">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-white border-4 border-white overflow-hidden flex-shrink-0">
              {politician.profileImage ? (
                <Image src={politician.profileImage} alt={politician.name} className="w-full h-full object-cover" width={128} height={128} />
              ) : (
                <Image src="/avatar/user.png" alt={politician.name} className="w-full h-full object-cover" width={128} height={128} />
              )}
            </div>
            <div className="text-white pb-2">
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-3xl md:text-4xl font-bold">{politician.name}</h1>
                {politician.verified && (
                  <span className="px-2 py-1 bg-blue-500 text-xs rounded-full">認証済み</span>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm md:text-base">
                {politician.party && (
                  <span className="flex items-center gap-1">
                    <Building2 className="h-4 w-4" />
                    {politician.party}
                  </span>
                )}
                {politician.prefecture && (
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {politician.prefecture} {politician.city}
                  </span>
                )}
                {politician.constituency && (
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {politician.constituency}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <SupportButton
                politicianId={politician.id}
                isSupported={isSupporting}
                supportCount={politician.supportCount || 0}
                onSupportToggle={(id, supported) => setIsSupporting(supported)}
              />
              <Button variant="outline">
                <Share2 className="mr-2 h-5 w-5" />
                <span>シェア</span>
              </Button>
              {politician.snsLinks?.instagram && (
                <Button variant="outline" asChild>
                  <Link href={politician.snsLinks.instagram} target="_blank" rel="noopener noreferrer">
                    <Instagram className="mr-2 h-5 w-5" />
                    <span>Instagram</span>
                  </Link>
                </Button>
              )}
              {politician.snsLinks?.youtube && (
                <Button variant="outline" asChild>
                  <Link href={politician.snsLinks.youtube} target="_blank" rel="noopener noreferrer">
                    <Youtube className="mr-2 h-5 w-5" />
                    <span>YouTube</span>
                  </Link>
                </Button>
              )}
              {politician.snsLinks?.twitter && (
                <Button variant="outline" asChild>
                  <Link href={politician.snsLinks.twitter} target="_blank" rel="noopener noreferrer">
                    <Twitter className="mr-2 h-5 w-5" />
                    <span>Twitter</span>
                  </Link>
                </Button>
              )}
            </div>

            {/* Biography */}
            {politician.biography && (
              <section className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">プロフィール</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{politician.biography}</p>
              </section>
            )}

            {/* Policies */}
            {politician.policies && politician.policies.length > 0 && (
              <section className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">政策</h2>
                <div className="space-y-4">
                  {politician.policies.map((policy) => (
                    <div key={policy.id} className="border-l-4 border-indigo-500 pl-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full">
                          {getCategoryLabel(policy.category)}
                        </span>
                        {policy.priority && (
                          <span className="text-xs text-gray-500">優先度: {policy.priority}</span>
                        )}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{policy.title}</h3>
                      <p className="text-gray-600">{policy.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Career & Education */}
            {(politician.career || politician.education) && (
              <section className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">経歴</h2>
                {politician.education && politician.education.length > 0 && (
                  <div className="mb-4">
                    <h3 className="font-semibold text-gray-700 mb-2">学歴</h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                      {politician.education.map((edu, index) => (
                        <li key={index}>{edu}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {politician.career && politician.career.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-2">職歴・政治歴</h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                      {politician.career.map((car, index) => (
                        <li key={index}>{car}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </section>
            )}

            {/* Activity Statistics */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">活動実績</h2>
              <ActivityStatisticsChart statistics={activityStatistics} />
            </section>

            {/* SNS Posts */}
            {snsPosts.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <SNSPosts posts={snsPosts} />
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-semibold text-gray-900 mb-4">統計</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">応援者数</span>
                  <span className="text-xl font-bold text-gray-900">
                    {politician.supportCount?.toLocaleString() || 0}人
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">活動スコア</span>
                  <span className="text-xl font-bold text-indigo-600">{politician.activityScore || 0}</span>
                </div>
                {politician.electionCount && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">当選回数</span>
                    <span className="text-xl font-bold text-gray-900">{politician.electionCount}回</span>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-semibold text-gray-900 mb-4">アクション</h3>
              <div className="space-y-3">
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700" asChild>
                  <Link href={`/politician/${politician.id}/donate`}>寄付する</Link>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link href={`/politician/${politician.id}/fanclub`}>ファンクラブ</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

