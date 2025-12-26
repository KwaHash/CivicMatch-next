export interface Politician {
  id: string
  name: string
  nameKana?: string
  birthDate?: string
  party?: string
  constituency?: string
  prefecture?: string
  city?: string
  district?: string
  electionCount?: number
  profileImage?: string
  headerImage?: string
  introductionVideo?: string
  biography?: string
  education?: string[]
  career?: string[]
  policies?: Policy[]
  snsLinks?: SNSLinks
  activityScore?: number
  supportCount?: number
  verified?: boolean
  kycStatus?: 'pending' | 'approved' | 'rejected'
  createdAt?: string
  updatedAt?: string
}

export interface Policy {
  id: string
  category: PolicyCategory
  title: string
  description: string
  priority: number
}

export type PolicyCategory =
  | 'economy'
  | 'welfare'
  | 'education'
  | 'environment'
  | 'diplomacy'
  | 'constitution'
  | 'disaster'
  | 'local'
  | 'other'

export interface SNSLinks {
  instagram?: string
  youtube?: string
  twitter?: string
  facebook?: string
  tiktok?: string
  officialWebsite?: string
}

export interface User {
  id: string
  email?: string
  name?: string
  prefecture?: string
  city?: string
  postalCode?: string
  supportedPoliticians?: string[]
  matchingResults?: MatchingResult[]
  createdAt?: string
}

export interface Question {
  id: string
  category: PolicyCategory
  text: string
  description?: string
  type: 'scale' | 'choice' | 'text'
  options?: string[]
  weight?: number
  order: number
}

export interface Answer {
  questionId: string
  value: number | string
  weight?: number
}

export interface MatchingResult {
  politicianId: string
  politicianName: string
  matchScore: number // 0-100
  matchReasons: string[]
  categoryMatches: Record<PolicyCategory, number>
  politician?: Politician
}

export interface Prefecture {
  code: string
  name: string
  nameKana: string
}

export interface City {
  code: string
  prefectureCode: string
  name: string
  nameKana: string
}

export interface Constituency {
  id: string
  prefecture: string
  name: string
  type: 'national' | 'prefectural' | 'city'
}

export interface MatchingQuestion extends Question {
  importance?: number
}

export interface SubscriptionPlan {
  id: string
  name: string
  price: number
  features: string[]
  politicianId: string
}

export interface Subscription {
  id: string
  userId: string
  politicianId: string
  planId: string
  status: 'active' | 'cancelled' | 'expired'
  startDate: string
  endDate?: string
}

export interface Donation {
  id: string
  userId: string
  politicianId: string
  amount: number
  donorName: string
  donorAddress: string
  status: 'pending' | 'completed' | 'failed'
  createdAt: string
}

export interface ActivityRecord {
  id: string
  politicianId: string
  date: string
  type: 'speech' | 'question' | 'media' | 'other'
  title: string
  description?: string
  source?: string
  category?: PolicyCategory
}

export interface SNSPost {
  id: string
  politicianId: string
  platform: 'instagram' | 'youtube' | 'twitter' | 'facebook' | 'tiktok'
  postId: string // プラットフォーム側のID
  content?: string
  imageUrl?: string
  videoUrl?: string
  url: string
  likes?: number
  comments?: number
  shares?: number
  postedAt: string
  fetchedAt: string
  visible: boolean // 政治家が表示可否を設定
}

export interface ActivityStatistics {
  politicianId: string
  period: 'month' | 'year' | 'all'
  speechCount: number
  questionCount: number
  mediaAppearanceCount: number
  categoryBreakdown: Record<PolicyCategory, number>
  sentimentAnalysis: {
    positive: number
    neutral: number
    negative: number
  }
  monthlyData: {
    month: string
    speechCount: number
    questionCount: number
  }[]
}

// ファンクラブ関連
export interface SupportComment {
  id: string
  userId: string
  politicianId: string
  content: string
  isPublic: boolean
  createdAt: string
  user?: {
    name: string
    profileImage?: string
  }
}

export interface SupportAction {
  id: string
  userId: string
  politicianId: string
  type: 'like' | 'share' | 'comment' | 'subscribe'
  createdAt: string
}

// 寄付関連（拡張版 - 政治資金規正法準拠）
export interface DonationRequest {
  politicianId: string
  amount: number
  donorName: string
  donorNameKana?: string
  donorAddress: string
  donorPostalCode: string
  donorPhoneNumber: string
  donorEmail: string
  donorDateOfBirth?: string // 年齢確認用
  isJapanese: boolean // 外国人チェック
  isAnonymous: boolean // 匿名寄付の場合（1,000円以下）
  paymentMethod: 'credit_card' | 'paypay'
  receiptRequested: boolean
}

export interface DonationResponse {
  id: string
  userId?: string
  politicianId: string
  amount: number
  donorName: string
  donorAddress: string
  status: 'pending' | 'completed' | 'failed'
  paymentIntentId?: string // Stripe決済ID
  receiptUrl?: string // 領収書PDF
  createdAt: string
  completedAt?: string
}

// サブスクリプションプラン（詳細版）
export interface SubscriptionPlanDetails extends SubscriptionPlan {
  stripePriceId?: string
  stripeProductId?: string
  interval: 'month' | 'year'
  benefits: {
    label: string
    description?: string
  }[]
  active: boolean
}

// 専門家マッチング
export interface Expert {
  id: string
  name: string
  category: 'sns_strategy' | 'fund_management' | 'election_planning' | 'video_creator' | 'lawyer' | 'pr_consultant'
  title: string
  description: string
  profileImage?: string
  experience: string[]
  rating?: number
  reviewCount?: number
  basePrice?: number
  availability: 'available' | 'busy' | 'unavailable'
  verified: boolean
}

export interface ExpertConsultation {
  id: string
  politicianId: string
  expertId: string
  title: string
  description: string
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled'
  proposedPrice?: number
  finalPrice?: number
  proposalDate: string
  startDate?: string
  endDate?: string
  expert?: Expert
}

// 政治学習コンテンツ
export interface LearningContent {
  id: string
  title: string
  description: string
  category: 'basic' | 'advanced' | 'practice' | 'case_study'
  contentType: 'video' | 'article' | 'webinar' | 'course'
  duration?: number // 分
  thumbnail?: string
  videoUrl?: string
  articleUrl?: string
  content?: string // 記事本文
  price: number // 0 = 無料
  level: 'beginner' | 'intermediate' | 'advanced'
  tags: string[]
  viewCount?: number
  rating?: number
  publishedAt: string
}

export interface LearningProgress {
  userId: string
  contentId: string
  completed: boolean
  progress: number // 0-100
  lastAccessedAt: string
  completedAt?: string
}

// クラウドファンディング連携
export interface CrowdfundingProject {
  id: string
  politicianId: string
  platform: 'campfire' | 'readyfor' | 'internal'
  platformProjectId?: string
  title: string
  description: string
  targetAmount: number
  currentAmount: number
  backerCount: number
  endDate: string
  status: 'active' | 'completed' | 'cancelled'
  thumbnail?: string
  projectUrl: string
  updatedAt: string
}

// 推し活・応援機能
export interface OshiRegistration {
  userId: string
  politicianId: string
  registeredAt: string
  notificationsEnabled: boolean
  lastInteractedAt?: string
}

// 地域課題
export interface RegionalIssue {
  id: string
  prefecture: string
  city?: string
  title: string
  description: string
  category: PolicyCategory
  userSubmitted: boolean
  submissionCount: number
  trendingScore: number
  createdAt: string
  updatedAt: string
}

// APIレスポンス型
export interface ApiResponse<T> {
  data: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  hasMore: boolean
}

