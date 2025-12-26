'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import  { type ActivityStatistics, type PolicyCategory } from '@/lib/types'

interface ActivityStatisticsProps {
  statistics: ActivityStatistics
  className?: string
}

const categoryLabels: Record<PolicyCategory, string> = {
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

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#ef4444', '#06b6d4']

export function ActivityStatisticsChart({ statistics, className = '' }: ActivityStatisticsProps) {
  // カテゴリ別の活動実績をグラフ用データに変換
  const categoryData = Object.entries(statistics.categoryBreakdown)
    .filter(([category]) => category !== 'other')
    .map(([category, value]) => ({
      name: categoryLabels[category as PolicyCategory],
      value,
    }))

  // 月次データを棒グラフ用に変換
  const monthlyData = statistics.monthlyData.map((item) => ({
    month: item.month,
    発言: item.speechCount,
    質問: item.questionCount,
  }))

  return (
    <div className={className}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* 統計サマリー */}
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">活動サマリー</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-3xl font-bold text-indigo-600">{statistics.speechCount}</div>
              <div className="text-sm text-gray-600">発言回数</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600">{statistics.questionCount}</div>
              <div className="text-sm text-gray-600">質問回数</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-pink-600">{statistics.mediaAppearanceCount}</div>
              <div className="text-sm text-gray-600">メディア露出</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">
                {statistics.sentimentAnalysis.positive + statistics.sentimentAnalysis.neutral}
              </div>
              <div className="text-sm text-gray-600">ポジティブ評価</div>
            </div>
          </div>
        </div>

        {/* センチメント分析 */}
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">センチメント分析</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={[
                  { name: 'ポジティブ', value: statistics.sentimentAnalysis.positive },
                  { name: '中立', value: statistics.sentimentAnalysis.neutral },
                  { name: 'ネガティブ', value: statistics.sentimentAnalysis.negative },
                ]}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {[statistics.sentimentAnalysis.positive, statistics.sentimentAnalysis.neutral, statistics.sentimentAnalysis.negative].map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={['#10b981', '#6b7280', '#ef4444'][index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 月次活動グラフ */}
      <div className="bg-white rounded-lg p-6 shadow-md mb-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">月次活動推移</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="発言" fill="#6366f1" />
            <Bar dataKey="質問" fill="#8b5cf6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 政策領域別活動 */}
      <div className="bg-white rounded-lg p-6 shadow-md">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">政策領域別活動</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={categoryData} layout="horizontal">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" width={100} />
            <Tooltip />
            <Bar dataKey="value" fill="#6366f1">
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}


