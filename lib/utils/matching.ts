import  { type Answer, type MatchingResult, type PolicyCategory, type Politician } from '@/lib/types'

/**
 * マッチングアルゴリズム
 * ユーザーの回答と政治家の回答を比較して一致度を計算
 */
export function calculateMatchScore(
  userAnswers: Answer[],
  politicianAnswers: Record<string, Answer>,
  questions: { id: string; category: PolicyCategory; weight?: number }[]
): number {
  if (questions.length === 0) return 0

  let totalWeight = 0
  let matchedWeight = 0

  for (const question of questions) {
    const userAnswer = userAnswers.find((a) => a.questionId === question.id)
    const politicianAnswer = politicianAnswers[question.id]

    if (!userAnswer || !politicianAnswer) continue

    const weight = question.weight || userAnswer.weight || 1
    totalWeight += weight

    // 回答値の一致度を計算（0-1の範囲）
    const similarity = calculateAnswerSimilarity(userAnswer.value, politicianAnswer.value)
    matchedWeight += similarity * weight
  }

  return totalWeight > 0 ? Math.round((matchedWeight / totalWeight) * 100) : 0
}

/**
 * 2つの回答値の類似度を計算（0-1の範囲）
 */
function calculateAnswerSimilarity(
  userValue: number | string,
  politicianValue: number | string
): number {
  // 数値の場合（5段階評価など）
  if (typeof userValue === 'number' && typeof politicianValue === 'number') {
    const diff = Math.abs(userValue - politicianValue)
    const maxDiff = 4 // 5段階評価の場合
    return 1 - diff / maxDiff
  }

  // 文字列の場合（完全一致のみ）
  if (typeof userValue === 'string' && typeof politicianValue === 'string') {
    return userValue === politicianValue ? 1 : 0
  }

  return 0
}

/**
 * カテゴリー別の一致度を計算
 */
export function calculateCategoryMatches(
  userAnswers: Answer[],
  politicianAnswers: Record<string, Answer>,
  questions: { id: string; category: PolicyCategory }[]
): Record<PolicyCategory, number> {
  const categoryScores: Record<string, { total: number; matched: number }> = {}

  // 初期化
  const categories: PolicyCategory[] = [
    'economy',
    'welfare',
    'education',
    'environment',
    'diplomacy',
    'constitution',
    'disaster',
    'local',
    'other',
  ]

  categories.forEach((cat) => {
    categoryScores[cat] = { total: 0, matched: 0 }
  })

  // カテゴリーごとに集計
  for (const question of questions) {
    const userAnswer = userAnswers.find((a) => a.questionId === question.id)
    const politicianAnswer = politicianAnswers[question.id]

    if (!userAnswer || !politicianAnswer) continue

    const category = question.category
    categoryScores[category].total += 1

    const similarity = calculateAnswerSimilarity(userAnswer.value, politicianAnswer.value)
    categoryScores[category].matched += similarity
  }

  // パーセンテージに変換
  const result: Record<PolicyCategory, number> = {} as Record<PolicyCategory, number>
  categories.forEach((cat) => {
    const score = categoryScores[cat]
    result[cat] = score.total > 0 ? Math.round((score.matched / score.total) * 100) : 0
  })

  return result
}

/**
 * 一致理由を生成
 */
export function generateMatchReasons(
  categoryMatches: Record<PolicyCategory, number>,
  threshold: number = 75
): string[] {
  const categoryLabels: Record<PolicyCategory, string> = {
    economy: '経済政策',
    welfare: '社会保障',
    education: '教育',
    environment: '環境',
    diplomacy: '外交',
    constitution: '憲法',
    disaster: '防災',
    local: '地域',
    other: 'その他',
  }

  const reasons: string[] = []

  Object.entries(categoryMatches).forEach(([category, score]) => {
    if (score >= threshold && category !== 'other') {
      reasons.push(`${categoryLabels[category as PolicyCategory]}で${score}%一致`)
    }
  })

  // 上位3つまで返す
  return reasons.slice(0, 3).sort((a, b) => {
    const scoreA = parseInt(a.match(/\d+/)?.[0] || '0')
    const scoreB = parseInt(b.match(/\d+/)?.[0] || '0')
    return scoreB - scoreA
  })
}

/**
 * 複数の政治家とのマッチング結果を計算
 */
export function calculateMatchingResults(
  userAnswers: Answer[],
  politicians: Politician[],
  politicianAnswersMap: Record<string, Record<string, Answer>>,
  questions: { id: string; category: PolicyCategory; weight?: number }[]
): MatchingResult[] {
  const results: MatchingResult[] = []

  for (const politician of politicians) {
    const politicianAnswers = politicianAnswersMap[politician.id] || {}
    const matchScore = calculateMatchScore(userAnswers, politicianAnswers, questions)
    const categoryMatches = calculateCategoryMatches(userAnswers, politicianAnswers, questions)
    const matchReasons = generateMatchReasons(categoryMatches)

    results.push({
      politicianId: politician.id,
      politicianName: politician.name,
      matchScore,
      matchReasons,
      categoryMatches,
      politician,
    })
  }

  // 一致度の高い順にソート
  return results.sort((a, b) => b.matchScore - a.matchScore)
}



