'use client'

import { useState } from 'react'
import { Info, AlertTriangle } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import  { type DonationRequest } from '@/lib/types'

interface DonationFormProps {
  politicianId: string
  politicianName: string
  onSuccess?: (donationId: string) => void
  className?: string
}

// 寄付額のプリセット
const DONATION_AMOUNTS = [1000, 3000, 5000, 10000, 50000, 100000]

// 政治資金規正法に基づく制限
const MAX_DONATION_INDIVIDUAL = 1500000 // 個人: 150万円/年
const MAX_DONATION_CORPORATION = 7500000 // 法人: 750万円/年
const MAX_ANONYMOUS_DONATION = 1000 // 匿名寄付: 1,000円まで

export function DonationForm({ politicianId, politicianName, onSuccess, className = '' }: DonationFormProps) {
  const [amount, setAmount] = useState<number>(1000)
  const [customAmount, setCustomAmount] = useState('')
  const [donorType, setDonorType] = useState<'individual' | 'corporation'>('individual')
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [donorName, setDonorName] = useState('')
  const [donorNameKana, setDonorNameKana] = useState('')
  const [donorAddress, setDonorAddress] = useState('')
  const [donorPostalCode, setDonorPostalCode] = useState('')
  const [donorPhoneNumber, setDonorPhoneNumber] = useState('')
  const [donorEmail, setDonorEmail] = useState('')
  const [donorDateOfBirth, setDonorDateOfBirth] = useState('')
  const [isJapanese, setIsJapanese] = useState(true)
  const [receiptRequested, setReceiptRequested] = useState(true)
  const [paymentMethod, setPaymentMethod] = useState<'credit_card' | 'paypay'>('credit_card')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleAmountSelect = (selectedAmount: number) => {
    setAmount(selectedAmount)
    setCustomAmount('')
  }

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value)
    const numValue = parseInt(value)
    if (!isNaN(numValue) && numValue > 0) {
      setAmount(numValue)
    }
  }

  const validateForm = (): boolean => {
    if (amount <= 0) {
      setError('寄付額を入力してください')
      return false
    }

    // 匿名寄付の上限チェック
    if (isAnonymous && amount > MAX_ANONYMOUS_DONATION) {
      setError(`匿名寄付は${MAX_ANONYMOUS_DONATION.toLocaleString()}円までです`)
      return false
    }

    // 年額上限チェック（簡易版 - 実際は年間累計を確認する必要がある）
    const maxDonation = donorType === 'individual' ? MAX_DONATION_INDIVIDUAL : MAX_DONATION_CORPORATION
    if (amount > maxDonation) {
      setError(
        `寄付額の上限を超えています（${donorType === 'individual' ? '個人' : '法人'}: ${maxDonation.toLocaleString()}円/年）`
      )
      return false
    }

    // 外国人チェック
    if (!isJapanese) {
      setError('外国人・外国法人からの寄付は法律により禁止されています')
      return false
    }

    // 必須項目チェック
    if (!isAnonymous) {
      if (!donorName || !donorAddress || !donorPostalCode || !donorEmail) {
        setError('必須項目を入力してください')
        return false
      }
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // TODO: 実際のAPI呼び出しを実装
      const donationRequest: DonationRequest = {
        politicianId,
        amount,
        donorName: isAnonymous ? '匿名' : donorName,
        donorNameKana: donorNameKana || undefined,
        donorAddress: isAnonymous ? '' : donorAddress,
        donorPostalCode: isAnonymous ? '' : donorPostalCode,
        donorPhoneNumber: donorPhoneNumber || '',
        donorEmail,
        donorDateOfBirth: donorDateOfBirth || undefined,
        isJapanese,
        isAnonymous,
        paymentMethod,
        receiptRequested,
      }

      // モック実装
      console.log('Donation request:', donationRequest)
      
      // Stripe決済処理など
      await new Promise((resolve) => setTimeout(resolve, 2000))

      if (onSuccess) {
        onSuccess('mock-donation-id')
      }
    } catch (err) {
      setError('寄付の処理中にエラーが発生しました。もう一度お試しください。')
      console.error('Donation error:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="space-y-6">
        {/* 寄付対象 */}
        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
          <p className="text-sm text-indigo-900">
            <strong>{politicianName}</strong> への寄付
          </p>
        </div>

        {/* 寄付額選択 */}
        <div>
          <Label htmlFor="amount">寄付額（必須）</Label>
          <div className="grid grid-cols-3 gap-2 mt-2 mb-3">
            {DONATION_AMOUNTS.map((amt) => (
              <Button
                key={amt}
                type="button"
                variant={amount === amt && !customAmount ? 'default' : 'outline'}
                onClick={() => handleAmountSelect(amt)}
                className="w-full"
              >
                ¥{amt.toLocaleString()}
              </Button>
            ))}
          </div>
          <Input
            id="custom-amount"
            type="number"
            placeholder="任意の金額を入力"
            value={customAmount}
            onChange={(e) => handleCustomAmountChange(e.target.value)}
            min={1000}
          />
          {amount > 0 && (
            <p className="text-sm text-gray-600 mt-2">
              寄付額: <strong className="text-lg">¥{amount.toLocaleString()}</strong>
            </p>
          )}
        </div>

        {/* 寄付者種別 */}
        <div>
          <Label htmlFor="donor-type">寄付者種別（必須）</Label>
          <Select value={donorType} onValueChange={(value: 'individual' | 'corporation') => setDonorType(value)}>
            <SelectTrigger id="donor-type">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="individual">個人</SelectItem>
              <SelectItem value="corporation">法人</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* 匿名寄付チェック */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="anonymous"
            checked={isAnonymous}
            onCheckedChange={(checked) => setIsAnonymous(checked === true)}
          />
          <Label htmlFor="anonymous" className="cursor-pointer">
            匿名で寄付する（1,000円まで）
          </Label>
        </div>

        {/* 寄付者情報（匿名でない場合） */}
        {!isAnonymous && (
          <div className="space-y-4 border-t pt-4">
            <h3 className="font-semibold text-gray-900">寄付者情報</h3>

            <div>
              <Label htmlFor="donor-name">
                氏名・法人名（必須）
              </Label>
              <Input
                id="donor-name"
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
                required={!isAnonymous}
              />
            </div>

            <div>
              <Label htmlFor="donor-name-kana">氏名・法人名（カナ）</Label>
              <Input
                id="donor-name-kana"
                value={donorNameKana}
                onChange={(e) => setDonorNameKana(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="donor-postal-code">
                郵便番号（必須）
              </Label>
              <Input
                id="donor-postal-code"
                value={donorPostalCode}
                onChange={(e) => setDonorPostalCode(e.target.value)}
                placeholder="123-4567"
                required={!isAnonymous}
              />
            </div>

            <div>
              <Label htmlFor="donor-address">
                住所（必須）
              </Label>
              <Input
                id="donor-address"
                value={donorAddress}
                onChange={(e) => setDonorAddress(e.target.value)}
                placeholder="都道府県 市区町村 番地"
                required={!isAnonymous}
              />
            </div>

            <div>
              <Label htmlFor="donor-email">
                メールアドレス（必須）
              </Label>
              <Input
                id="donor-email"
                type="email"
                value={donorEmail}
                onChange={(e) => setDonorEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="donor-phone">電話番号</Label>
              <Input
                id="donor-phone"
                type="tel"
                value={donorPhoneNumber}
                onChange={(e) => setDonorPhoneNumber(e.target.value)}
                placeholder="090-1234-5678"
              />
            </div>

            {donorType === 'individual' && (
              <div>
                <Label htmlFor="donor-birth-date">生年月日（年齢確認用）</Label>
                <Input
                  id="donor-birth-date"
                  type="date"
                  value={donorDateOfBirth}
                  onChange={(e) => setDonorDateOfBirth(e.target.value)}
                />
              </div>
            )}

            <div className="flex items-center space-x-2">
              <Checkbox
                id="is-japanese"
                checked={isJapanese}
                onCheckedChange={(checked) => setIsJapanese(checked === true)}
              />
              <Label htmlFor="is-japanese" className="cursor-pointer">
                日本国籍・日本法人であることを確認します（必須）
              </Label>
            </div>
          </div>
        )}

        {/* 決済方法 */}
        <div>
          <Label htmlFor="payment-method">決済方法</Label>
          <Select
            value={paymentMethod}
            onValueChange={(value: 'credit_card' | 'paypay') => setPaymentMethod(value)}
          >
            <SelectTrigger id="payment-method">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="credit_card">クレジットカード</SelectItem>
              <SelectItem value="paypay">PayPay</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* 領収書 */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="receipt"
            checked={receiptRequested}
            onCheckedChange={(checked) => setReceiptRequested(checked === true)}
          />
          <Label htmlFor="receipt" className="cursor-pointer">
            領収書を発行する（税額控除に使用できます）
          </Label>
        </div>

        {/* 注意事項 */}
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            <p className="font-semibold mb-2">政治資金規正法に基づく注意事項</p>
            <ul className="list-disc list-inside text-sm space-y-1">
              <li>個人の年間寄付上限: {MAX_DONATION_INDIVIDUAL.toLocaleString()}円</li>
              <li>法人の年間寄付上限: {MAX_DONATION_CORPORATION.toLocaleString()}円</li>
              <li>匿名寄付は{MAX_ANONYMOUS_DONATION.toLocaleString()}円まで</li>
              <li>外国人・外国法人からの寄付は法律により禁止されています</li>
              <li>選挙期間中は寄付機能を停止する場合があります</li>
            </ul>
          </AlertDescription>
        </Alert>

        {/* エラー表示 */}
        {error && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* 送信ボタン */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-indigo-600 hover:bg-indigo-700"
          size="lg"
        >
          {isSubmitting ? '処理中...' : `¥${amount.toLocaleString()}を寄付する`}
        </Button>
      </div>
    </form>
  )
}

