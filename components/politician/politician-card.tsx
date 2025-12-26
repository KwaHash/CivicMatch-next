import Link from 'next/link'
import Image from 'next/image'
import { MapPin } from 'lucide-react'
import { getCategoryLabel } from '@/lib/utils'
import { Politician } from '@/lib/types'

export default function PoliticianCard({ politician }: { politician: Politician }) {
  return (
    <Link href={`/politician/${politician.id}`}>
      <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden cursor-pointer h-full">
        <div className="relative h-48 bg-gradient-to-br from-indigo-400 to-purple-500">
          {politician.headerImage && (
            <div
              className="absolute inset-0 bg-cover bg-center z-10"
              style={{ backgroundImage: `url(${politician.headerImage})` }}
            />
          )}
          <div className="absolute left-4 bottom-4 w-24 h-24 md:w-32 md:h-32 rounded-full bg-white border-4 border-white overflow-hidden flex-shrink-0 z-20">
              {politician.profileImage ? (
                <Image src={politician.profileImage} alt={politician.name} className="w-full h-full object-cover" width={128} height={128} />
              ) : (
                <Image src="/avatar/user.png" alt={politician.name} className="w-full h-full object-cover" width={128} height={128} />
              )}
            </div>
        </div>
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">{politician.name}</h3>
              <p className="text-sm text-gray-600">{politician.party}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-indigo-600">{politician.activityScore}</div>
              <div className="text-xs text-gray-500">活動スコア</div>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <MapPin className="h-4 w-4 mr-1" />
              {politician.prefecture} {politician.city}
            </div>
            {politician.policies && (
              <div className="flex flex-wrap gap-2">
                {politician.policies.map((policy, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full"
                  >
                    {getCategoryLabel(policy.category)}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">応援者</span>
              <span className="font-semibold text-gray-900">{politician.supportCount}人</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
