'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { BASIC_MATCHING_QUESTIONS } from '@/lib/constants/matching-questions'
import { getCategoryLabel } from '@/lib/utils'
import  { type Answer } from '@/lib/types'

export default function MatchingPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, Answer>>({})
  const [isCompleted, setIsCompleted] = useState(false)

  const currentQuestion = BASIC_MATCHING_QUESTIONS[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / BASIC_MATCHING_QUESTIONS.length) * 100
  const isLastQuestion = currentQuestionIndex === BASIC_MATCHING_QUESTIONS.length - 1

  const handleAnswer = (value: string | number) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: {
        questionId: currentQuestion.id,
        value,
      },
    })
  }

  const handleNext = () => {
    if (isLastQuestion) {
      setIsCompleted(true)
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const currentAnswer = answers[currentQuestion.id]?.value

  if (isCompleted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 py-12">
        <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4 text-gray-900">回答完了しました！</h2>
          <p className="text-gray-600 mb-8">
            あなたの回答に基づいて、相性の良い政治家を探しています。
            <br />
            結果はすぐに表示されます。
          </p>
          <Link href="/matching/results">
            <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 rounded-sm w-auto h-auto px-6 py-3">
              <span className='text-lg'>結果を見る</span>
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col w-full min-h-[60vh] py-12 px-4">
      <div className="max-w-6xl mx-auto w-full">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">
              質問 {currentQuestionIndex + 1} / {BASIC_MATCHING_QUESTIONS.length}
            </span>
            <span className="text-sm font-medium text-indigo-600">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="mb-6">
            <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 text-sm font-medium rounded-full mb-4">
              {getCategoryLabel(currentQuestion.category)}
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              {currentQuestion.text}
            </h2>
            {currentQuestion.description && (
              <p className="text-gray-600">{currentQuestion.description}</p>
            )}
          </div>

          {/* Answer Options */}
          {currentQuestion.type === 'choice' && currentQuestion.options && (
            <RadioGroup
              value={currentAnswer?.toString() || ''}
              onValueChange={handleAnswer}
              className="space-y-4"
            >
              {currentQuestion.options.map((option, index) => {
                const isSelected = currentAnswer === option;
                return (
                  <Label
                    key={index}
                    htmlFor={`option-${index}`}
                    className={`
                      flex items-center space-x-3 border-2 rounded-sm transition-colors p-3 flex-1 cursor-pointer text-lg
                      ${isSelected ? "border-pink-400 bg-pink-50 text-pink-700 font-bold" : "border-gray-200 hover:border-indigo-300 hover:bg-indigo-50"}
                    `}
                  >
                    <RadioGroupItem value={option} id={`option-${index}`} className="hidden" />
                    {option}
                  </Label>
                );
              })}
            </RadioGroup>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="w-auto h-auto px-6 py-3 rounded-sm"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            前へ
          </Button>
          <Button
            onClick={handleNext}
            disabled={!currentAnswer}
            className="w-auto h-auto bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-sm"
          >
            {isLastQuestion ? '完了' : '次へ'}
            {!isLastQuestion && <ArrowRight className="ml-2 h-5 w-5" />}
          </Button>
        </div>
      </div>
    </div>
  )
}
