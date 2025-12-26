'use client'

import {
  Radar,
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts'
import  { type PolicyCategory } from '@/lib/types'

interface RadarChartProps {
  data: Record<PolicyCategory, number>
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

export function RadarChart({ data, className = '' }: RadarChartProps) {
  const chartData = Object.entries(data)
    .filter(([category]) => category !== 'other')
    .map(([category, value]) => ({
      category: categoryLabels[category as PolicyCategory],
      value: value,
      fullMark: 100,
    }))

  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={300}>
        <RechartsRadarChart data={chartData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="category" className="text-xs" />
          <PolarRadiusAxis angle={90} domain={[0, 100]} />
          <Radar
            name="一致度"
            dataKey="value"
            stroke="#6366f1"
            fill="#6366f1"
            fillOpacity={0.6}
          />
        </RechartsRadarChart>
      </ResponsiveContainer>
    </div>
  )
}


