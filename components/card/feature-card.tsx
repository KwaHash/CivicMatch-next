import Link from "next/link"
import { ReactNode } from "react"

interface FeatureCardProps {
  icon: ReactNode,
  title: string;
  description: string;
  href: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  href,
}) => {
  return (
    <Link href={href} className="block transition-all duration-300 group transform hover:-translate-y-1">
      <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300 h-full">
        <div className="flex items-center gap-3 text-indigo-600 mb-4">
          {icon}
          <h3 className="text-xl font-semibold">{title}</h3>
        </div>
        <p className="leading-relaxed">{description}</p>
      </div>
    </Link>
  )
}

export default FeatureCard;