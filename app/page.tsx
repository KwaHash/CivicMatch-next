"use client"

import { Heart, MapPin, Users, TrendingUp, Search, BarChart3, Sparkles, Star } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import FeatureCard from "@/components/card/feature-card";
import AuroraBG from "@/components/aurorabg";

export default function Home() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-white relative">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white py-16 md:py-24 shadow-2xl">
        <AuroraBG />
        <div className="container relative z-10 mx-auto px-4 md:px-8 flex flex-col items-center">
          <div className="w-full mx-auto text-center">
            <div className="mb-5 flex justify-center items-center gap-2">
              <Sparkles className="text-yellow-200 animate-spin-slow h-8 w-8 drop-shadow-lg" />
              <span className="bg-gradient-to-r from-yellow-200 to-pink-200 bg-clip-text text-transparent text-lg font-bold tracking-widest">
                新しい政治の魅力を体験しよう
              </span>
              <Sparkles className="text-yellow-200 animate-spin-slow h-8 w-8 drop-shadow-lg" />
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold !leading-tight mb-6 drop-shadow-xl">
              政治家と国民をつなぐ<br />
              <span className="bg-gradient-to-r from-yellow-200 to-pink-200 bg-clip-text text-transparent">
                推し活プラットフォーム
              </span>
            </h1>
            <p className="text-2xl md:text-2xl mb-10 text-gray-50 w-full mx-auto font-medium tracking-wider drop-shadow-sm">
              政治参加を「推し活」として再定義。あなたの考えに合う政治家を見つけて、
              <br className="hidden md:inline" />
              応援から投票まで、楽しく気軽に新しい参加体験を始めましょう。
            </p>
            <div className="flex flex-col items-center sm:flex-row gap-5 justify-center">
              <Link href="/matching" className="group">
                <Button
                  size="lg"
                  className="bg-white shadow-lg shadow-pink-100/20 text-indigo-600 hover:bg-indigo-50 text-lg px-10 py-7 rounded-full font-semibold transform hover:-translate-y-1 transition ease-out duration-300 flex items-center gap-2"
                >
                  <Search className="mr-2 h-6 w-6 text-pink-500" />
                  マッチングを始める
                  <span className="pl-2 text-pink-500 text-xl">→</span>
                </Button>
              </Link>
              <Link href="/search" className="group">
                <Button size="lg"
                  className="bg-white shadow-lg shadow-indigo-100/10 text-indigo-600 hover:bg-indigo-50 text-lg px-10 py-7 rounded-full font-semibold transform hover:-translate-y-1 transition ease-out duration-300 flex items-center gap-2"
                >
                  <MapPin className="mr-2 h-6 w-6 text-yellow-500" />
                  地域から探す
                  <span className="pl-2 text-yellow-500 text-xl">→</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-28 bg-gradient-to-bl from-gray-50 via-indigo-50 to-purple-50 relative">
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-indigo-900 drop-shadow">
              あなたの政治参加をサポート
            </h2>
            <p className="text-xl text-gray-600 w-full mx-auto font-medium">
              投票だけが政治参加じゃない！推し活から始まる新しい出会いを楽しもう。
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
            <FeatureCard
              icon={<Search className="h-9 w-9 text-indigo-500 animate-pulse-lazy" />}
              title="投票マッチング"
              description="あなたの考えに近い政治家が簡単に見つかる。クイズ形式で楽しくスタート！"
              href="/matching"
            />
            <FeatureCard
              icon={<MapPin className="h-9 w-9 text-pink-400 animate-pulse-lazy" />}
              title="地域検索"
              description="地域や選挙区で検索。身近な政治家が今すぐ見つかります。"
              href="/search"
            />
            <FeatureCard
              icon={<Heart className="h-9 w-9 text-red-400 animate-pulse-lazy" />}
              title="推し活機能"
              description="気になる議員を推し登録。応援やシェアで盛り上がろう！"
              href="/search"
            />
            <FeatureCard
              icon={<Users className="h-9 w-9 text-indigo-400 animate-pulse-lazy" />}
              title="若手議員発見"
              description="未来のリーダーと出会う。ストーリーや活動で知れるから応援がもっと楽しい。"
              href="/search?filter=youth"
            />
            <FeatureCard
              icon={<BarChart3 className="h-9 w-9 text-purple-500 animate-pulse-lazy" />}
              title="活動実績の可視化"
              description="グラフやデータで議員の実績が一目瞭然。比べて分かるから納得！"
              href="/search"
            />
            <FeatureCard
              icon={<TrendingUp className="h-9 w-9 text-blue-400 animate-pulse-lazy" />}
              title="SNS連携"
              description="SNS連携で日常や活動をリアルタイムでチェック。応援がもっと身近に。"
              href="/search"
            />
          </div>
        </div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[30vw] pointer-events-none z-0 blur-3xl bg-gradient-to-tr from-pink-200 via-yellow-100 to-indigo-200 opacity-30" />
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-white to-indigo-50 relative">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 shadow-xl rounded-3xl p-12 md:p-20 border border-indigo-100/10 relative overflow-hidden">
            <div className="absolute top-4 left-4 opacity-40">
              <Star className="h-12 w-12 text-yellow-300" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-indigo-900 drop-shadow">
              政治家の方へ
            </h2>
            <p className="text-xl mb-10 text-gray-700 font-medium">
              地盤・看板・鞄に頼らない現代型ファンベースを一緒に作りましょう。
              <br />
              SNSやデータで新しい支援者とつながるチャンス！
            </p>
            <Link href="/politician/register">
              <Button
                size="lg"
                className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-xl hover:from-indigo-700 hover:to-pink-700 text-white text-lg px-12 py-7 rounded-full font-semibold transition-all duration-300 group transform hover:-translate-y-1"
              >
                <span className="inline-flex items-center gap-2 transition-transform group-hover:scale-110">
                  <Sparkles className="h-6 w-6 text-yellow-200" />
                  政治家登録はこちら
                </span>
              </Button>
            </Link>
            <div className="absolute bottom-4 right-4 opacity-50">
              <Heart className="h-10 w-10 text-pink-400 animate-bounce" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}