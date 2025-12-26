'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Instagram, Youtube, Twitter, Facebook, ExternalLink, Heart, MessageCircle, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import  { type SNSPost } from '@/lib/types'

interface SNSPostsProps {
  posts: SNSPost[]
  className?: string
}

const platformIcons = {
  instagram: Instagram,
  youtube: Youtube,
  twitter: Twitter,
  facebook: Facebook,
  tiktok: Youtube, // TikTok用のアイコンがない場合はYouTubeを使用
}

const platformColors = {
  instagram: 'text-pink-600',
  youtube: 'text-red-600',
  twitter: 'text-blue-400',
  facebook: 'text-blue-600',
  tiktok: 'text-black',
}

export function SNSPosts({ posts, className = '' }: SNSPostsProps) {
  const [visiblePosts, setVisiblePosts] = useState(6)
  const [filterPlatform, setFilterPlatform] = useState<SNSPost['platform'] | 'all'>('all')

  const filteredPosts = posts
    .filter((post) => post.visible)
    .filter((post) => filterPlatform === 'all' || post.platform === filterPlatform)
    .slice(0, visiblePosts)

  const platforms = Array.from(new Set(posts.map((p) => p.platform)))

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">SNS投稿</h2>
        {/* プラットフォームフィルター */}
        <div className="flex gap-2">
          <Button
            variant={filterPlatform === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterPlatform('all')}
          >
            すべて
          </Button>
          {platforms.map((platform) => {
            const Icon = platformIcons[platform]
            return (
              <Button
                key={platform}
                variant={filterPlatform === platform ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterPlatform(platform)}
                className="gap-2"
              >
                <Icon className={`h-4 w-4 ${platformColors[platform]}`} />
                {platform.charAt(0).toUpperCase() + platform.slice(1)}
              </Button>
            )
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPosts.map((post) => {
          const Icon = platformIcons[post.platform]
          return (
            <SNSPostCard key={post.id} post={post} Icon={Icon} />
          )
        })}
      </div>

      {visiblePosts < filteredPosts.length && (
        <div className="text-center mt-6">
          <Button
            variant="outline"
            onClick={() => setVisiblePosts(visiblePosts + 6)}
          >
            もっと見る
          </Button>
        </div>
      )}

      {filteredPosts.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p>SNS投稿がありません</p>
        </div>
      )}
    </div>
  )
}

function SNSPostCard({ post, Icon }: { post: SNSPost; Icon: React.ComponentType<{ className?: string }> }) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {/* 画像/動画プレビュー */}
      {post.imageUrl && (
        <div className="relative aspect-square bg-gray-100">
          <img
            src={post.imageUrl}
            alt={post.content?.substring(0, 50) || 'SNS投稿'}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 right-2">
            <div className="bg-black/50 rounded-full p-2">
              <Icon className="h-4 w-4 text-white" />
            </div>
          </div>
        </div>
      )}

      {/* コンテンツ */}
      <div className="p-4">
        {post.content && (
          <p className="text-sm text-gray-700 mb-3 line-clamp-3">{post.content}</p>
        )}

        {/* 統計情報 */}
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
          {post.likes !== undefined && (
            <div className="flex items-center gap-1">
              <Heart className="h-4 w-4" />
              <span>{post.likes.toLocaleString()}</span>
            </div>
          )}
          {post.comments !== undefined && (
            <div className="flex items-center gap-1">
              <MessageCircle className="h-4 w-4" />
              <span>{post.comments.toLocaleString()}</span>
            </div>
          )}
          {post.shares !== undefined && (
            <div className="flex items-center gap-1">
              <Share2 className="h-4 w-4" />
              <span>{post.shares.toLocaleString()}</span>
            </div>
          )}
        </div>

        {/* Dates and Links */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400">{formatDate(post.postedAt)}</span>
          <Link
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
          >
            元の投稿を見る
            <ExternalLink className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </div>
  )
}

