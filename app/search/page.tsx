'use client'

import { useState } from 'react'
import { Search, MapPin } from 'lucide-react'
import PoliticianCard from '@/components/politician/politician-card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { PREFECTURES } from '@/lib/constants/prefectures'
import { type Politician } from '@/lib/types'

export const MOCK_POLITICIANS: Politician[] = [
  {
    id: '1',
    name: '山田 太郎',
    party: '自由民主党',
    prefecture: '東京都',
    city: '渋谷区',
    profileImage: '/avatar/01.jpg',
    headerImage: '/img/header_01.jpg',
    activityScore: 85,
    supportCount: 1200,
    policies: [
      { id: 'p1', category: 'economy', title: '経済成長戦略', description: '持続可能な経済成長を目指します', priority: 1 },
      { id: 'p2', category: 'education', title: '教育制度改革', description: '子どもたちの未来を創る教育を', priority: 2 },
      { id: 'p3', category: 'welfare', title: '子育て支援', description: '安心して子育てできる社会を', priority: 3 },
    ],
  },
  {
    id: '2',
    name: '佐藤 花子',
    party: '立憲民主党',
    prefecture: '東京都',
    city: '新宿区',
    profileImage: '/avatar/user.png',
    headerImage: '/img/post_1.jpg',
    activityScore: 92,
    supportCount: 850,
    policies: [
      { id: 'p1', category: 'economy', title: '経済成長戦略', description: '持続可能な経済成長を目指します', priority: 1 },
      { id: 'p2', category: 'education', title: '教育制度改革', description: '子どもたちの未来を創る教育を', priority: 2 },
      { id: 'p3', category: 'welfare', title: '子育て支援', description: '安心して子育てできる社会を', priority: 3 },
    ],
  },
  {
    id: '3',
    name: '鈴木 一郎',
    party: '公明党',
    prefecture: '大阪府',
    city: '大阪市',
    profileImage: '/avatar/02.jpg',
    headerImage: '/img/post_2.jpg',
    activityScore: 78,
    supportCount: 650,
    policies: [
      { id: 'p1', category: 'economy', title: '経済成長戦略', description: '持続可能な経済成長を目指します', priority: 1 },
      { id: 'p2', category: 'education', title: '教育制度改革', description: '子どもたちの未来を創る教育を', priority: 2 },
      { id: 'p3', category: 'welfare', title: '子育て支援', description: '安心して子育てできる社会を', priority: 3 },
    ],
  },
]

export default function SearchPage() {
  const [selectedPrefecture, setSelectedPrefecture] = useState<string>('すべて')
  const [selectedCity, setSelectedCity] = useState<string>('')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [filteredPoliticians, setFilteredPoliticians] = useState(MOCK_POLITICIANS)

  const handleSearch = () => {
    let results = MOCK_POLITICIANS

    if (selectedPrefecture !== 'すべて') {
      results = results.filter((p) => p.prefecture === selectedPrefecture)
    }

    if (selectedCity) {
      results = results.filter((p) => p.city === selectedCity)
    }

    if (searchQuery) {
      results = results.filter(
        (p) => p.name.includes(searchQuery)
      )
    }

    setFilteredPoliticians(results)
  }

  return (
    <div className="flex flex-col w-full min-h-[60vh] py-8 px-4">
      <div className="max-w-7xl mx-auto w-full">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">地域から探す</h1>
          <p className="text-gray-600">都道府県や市区町村から、あなたの地域の政治家を検索できます。</p>
        </div>

        {/* Search Filters */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className='flex flex-col gap-3'>
              <Label htmlFor="prefecture">都道府県</Label>
              <Select value={selectedPrefecture} onValueChange={setSelectedPrefecture}>
                <SelectTrigger id="prefecture">
                  <SelectValue placeholder="都道府県を選択" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="すべて">すべて</SelectItem>
                  {PREFECTURES.map((pref) => (
                    <SelectItem key={pref.code} value={pref.name}>
                      {pref.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className='flex flex-col gap-3'>
              <Label htmlFor="city">市区町村</Label>
              <Input
                id="city"
                placeholder="市区町村を入力"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
              />
            </div>

            <div className='flex flex-col gap-3'>
              <Label htmlFor="search">キーワード検索</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="search"
                  placeholder="名前・政党・政策で検索"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex items-end">
              <Button onClick={handleSearch} className="w-full bg-indigo-600 hover:bg-indigo-700 rounded-sm">
                <Search className="mr-2 h-5 w-5" />
                <span>検索</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <p className="text-gray-600">
              検索結果: <span className="font-semibold text-gray-900">{filteredPoliticians.length}名</span>
            </p>
            <Select defaultValue="popular">
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">人気順</SelectItem>
                <SelectItem value="activity">活動量順</SelectItem>
                <SelectItem value="new">新着順</SelectItem>
                <SelectItem value="match">政策一致度順</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Politician Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPoliticians.map((politician) => (
            <PoliticianCard key={politician.id} politician={politician} />
          ))}
        </div>

        {filteredPoliticians.length === 0 && (
          <div className="text-center py-12">
            <MapPin className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">該当する政治家が見つかりませんでした</p>
          </div>
        )}
      </div>
    </div>
  )
}
