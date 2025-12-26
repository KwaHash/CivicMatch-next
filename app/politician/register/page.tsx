'use client'

import { useState } from 'react'
import { ArrowRight, Upload, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { PREFECTURES } from '@/lib/constants/prefectures'
import { toLocaleDateString } from '@/lib/utils'

export default function PoliticianRegisterPage() {
  const totalSteps = 3

  const [step, setStep] = useState(1)
  const [openCalendar, setOpenCalendar] = useState(false)
  const [agree, setAgree] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    nameKana: '',
    birthDate: '',
    party: '',
    prefecture: '',
    city: '',
    constituency: '',
    biography: '',
    email: '',
    phone: '',
    officialWebsite: '',
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    }
  }

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleSubmit = () => {
    console.log('Form submitted:', formData)
    alert('登録申請が完了しました。審査後、メールでご連絡いたします。')
  }

  return (
    <div className="flex flex-col w-full min-h-[60vh] py-12 px-4">
      <div className="max-w-3xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">政治家登録</h1>
          <p className="font-medium">
            政治家として登録して、新しい支援者とのつながりを作りましょう
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">
              ステップ {step} / {totalSteps}
            </span>
            <span className="text-sm font-medium text-indigo-600">
              {Math.round((step / totalSteps) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Form Steps */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">基本情報</h2>
              
              <div className='flex flex-col gap-3'>
                <Label htmlFor="name">氏名（必須）</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="山田 太郎"
                />
              </div>

              <div className='flex flex-col gap-3'>
                <Label htmlFor="nameKana">氏名（カナ）</Label>
                <Input
                  id="nameKana"
                  value={formData.nameKana}
                  onChange={(e) => handleInputChange('nameKana', e.target.value)}
                  placeholder="ヤマダ タロウ"
                />
              </div>

              <div className='flex flex-col gap-3'>
                <Label htmlFor="birthDate">生年月日</Label>
                <Popover open={openCalendar} onOpenChange={setOpenCalendar}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      id="date"
                      className="w-full justify-between font-normal rounded-none"
                    >
                      {formData.birthDate ? formData.birthDate : '生年月日を選択'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={new Date(formData.birthDate)}
                      captionLayout="dropdown"
                      onSelect={(date) => {
                        handleInputChange('birthDate', toLocaleDateString(date))
                        setOpenCalendar(false)
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className='flex flex-col gap-3'>
                <Label htmlFor="party">所属政党</Label>
                <Input
                  id="party"
                  value={formData.party}
                  onChange={(e) => handleInputChange('party', e.target.value)}
                  placeholder="自由民主党"
                />
              </div>

              <div className='flex flex-col gap-3'>
                <Label htmlFor="prefecture">都道府県（必須）</Label>
                <Select value={formData.prefecture} onValueChange={(value) => handleInputChange('prefecture', value)}>
                  <SelectTrigger id="prefecture">
                    <SelectValue placeholder="都道府県を選択" />
                  </SelectTrigger>
                  <SelectContent>
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
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  placeholder="渋谷区"
                />
              </div>

              <div className='flex flex-col gap-3'>
                <Label htmlFor="constituency">選挙区</Label>
                <Input
                  id="constituency"
                  value={formData.constituency}
                  onChange={(e) => handleInputChange('constituency', e.target.value)}
                  placeholder="東京都第1区"
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">プロフィール・連絡先</h2>
              
              <div className='flex flex-col gap-3'>
                <Label htmlFor="biography">自己紹介・経歴</Label>
                <Textarea
                  id="biography"
                  value={formData.biography}
                  onChange={(e) => handleInputChange('biography', e.target.value)}
                  placeholder="あなたの経歴や政治への想いを記入してください"
                  rows={6}
                />
              </div>

              <div className='flex flex-col gap-3'>
                <Label htmlFor="email">メールアドレス（必須）</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="example@email.com"
                />
              </div>

              <div className='flex flex-col gap-3'>
                <Label htmlFor="phone">電話番号</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="070-1234-5678"
                />
              </div>

              <div className='flex flex-col gap-3'>
                <Label htmlFor="officialWebsite">公式ウェブサイト</Label>
                <Input
                  id="officialWebsite"
                  type="url"
                  value={formData.officialWebsite}
                  onChange={(e) => handleInputChange('officialWebsite', e.target.value)}
                  placeholder="https://example.com"
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">本人確認（KYC）</h2>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded p-4 mb-6">
                <p className="text-sm text-yellow-800">
                  本人確認のために、身分証明書のアップロードが必要です。<br />
                  運転免許証またはマイナンバーカードの画像をアップロードしてください。
                </p>
              </div>

              <div className='flex flex-col gap-3'>
                <Label>身分証明書（必須）</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-indigo-400 transition-colors cursor-pointer">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-sm text-gray-600 mb-2">
                    クリックしてファイルを選択
                  </p>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, PDF形式（最大5MB）
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <FileText className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div className="text-sm text-blue-800">
                    <p className="font-semibold mb-1">審査について</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>身分証明書の確認後、1〜3営業日で審査を行います</li>
                      <li>審査完了後、登録時のメールアドレスにご連絡いたします</li>
                      <li>審査が承認されると、アカウントが有効化されます</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Checkbox 
                  id="terms"
                  checked={agree}
                  onClick={() => setAgree(!agree)}
                />
                <Label htmlFor="terms" className="text-sm cursor-pointer">
                  利用規約およびプライバシーポリシーに同意します
                </Label>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t">
            <Button
              variant="outline"
              onClick={handlePrevious}
              className="rounded"
              disabled={step === 1}
            >
              <span>前へ</span>
            </Button>
            {step < totalSteps ? (
              <Button
                onClick={handleNext}
                className="bg-indigo-600 hover:bg-indigo-700 rounded"
                disabled={(step === 1 && (!formData.name || !formData.prefecture)) || (step === 2 && !formData.email)}
              >
                <span>次へ</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                className="bg-indigo-600 hover:bg-indigo-700 rounded"
                disabled={!agree}
              >
                登録申請を送信
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

