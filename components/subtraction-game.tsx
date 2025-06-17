"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Star, Trophy, Minus } from "lucide-react"

interface SubtractionGameProps {
  onComplete: () => void
  onBack: () => void
}

export default function SubtractionGame({ onComplete, onBack }: SubtractionGameProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showFeedback, setShowFeedback] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [options, setOptions] = useState<number[]>([])

  const questions = [
    { num1: 5, num2: 2, visual: "🍎🍎🍎🍎🍎", crossed: 2 },
    { num1: 7, num2: 3, visual: "⭐⭐⭐⭐⭐⭐⭐", crossed: 3 },
    { num1: 6, num2: 4, visual: "🐱🐱🐱🐱🐱🐱", crossed: 4 },
    { num1: 8, num2: 3, visual: "🌸🌸🌸🌸🌸🌸🌸🌸", crossed: 3 },
    { num1: 9, num2: 4, visual: "🚗🚗🚗🚗🚗🚗🚗🚗🚗", crossed: 4 },
    { num1: 10, num2: 6, visual: "🦋🦋🦋🦋🦋🦋🦋🦋🦋🦋", crossed: 6 },
  ]

  const currentQ = questions[currentQuestion]
  const correctAnswer = currentQ.num1 - currentQ.num2
  const progress = ((currentQuestion + 1) / questions.length) * 100

  useEffect(() => {
    const generateOptions = () => {
      const correct = correctAnswer
      const options = [correct]

      while (options.length < 4) {
        const wrong = Math.floor(Math.random() * 10)
        if (!options.includes(wrong) && wrong >= 0) {
          options.push(wrong)
        }
      }

      return options.sort(() => Math.random() - 0.5)
    }

    setOptions(generateOptions())
  }, [currentQuestion])

  const handleAnswerSelect = (answer: number) => {
    setSelectedAnswer(answer)
    setShowFeedback(true)

    if (answer === correctAnswer) {
      setScore(score + 15)
      setTimeout(() => {
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(currentQuestion + 1)
          setShowFeedback(false)
          setSelectedAnswer(null)
        } else {
          onComplete()
        }
      }, 2000)
    } else {
      setTimeout(() => {
        setShowFeedback(false)
        setSelectedAnswer(null)
      }, 2000)
    }
  }

  const renderVisualSubtraction = () => {
    const emoji = currentQ.visual.charAt(0)
    const total = currentQ.num1
    const toRemove = currentQ.crossed

    return (
      <div className="flex flex-wrap justify-center gap-2">
        {Array.from({ length: total }, (_, i) => (
          <span key={i} className={`text-4xl ${i >= total - toRemove ? "opacity-30 line-through" : ""}`}>
            {emoji}
          </span>
        ))}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-400 via-pink-400 to-purple-400 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <Card className="mb-6 bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                Subtraction Safari
              </CardTitle>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Score: {score}</span>
                <Button onClick={onBack} variant="outline" size="sm">
                  Back
                </Button>
              </div>
            </div>
            <Progress value={progress} className="mt-2" />
            <p className="text-sm text-gray-600 mt-1">
              {currentQuestion + 1} of {questions.length} questions
            </p>
          </CardHeader>
        </Card>

        {/* Main Game Area */}
        <Card className="bg-white/90 backdrop-blur-sm">
          <CardContent className="p-8 text-center">
            {/* Question */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-6">Take away and count what's left!</h2>

              {/* Visual Subtraction */}
              <div className="bg-red-50 rounded-lg p-6 mb-6">
                <div className="mb-4">
                  <p className="text-lg mb-4">
                    Start with <span className="font-bold text-blue-600">{currentQ.num1}</span> items
                  </p>
                  {renderVisualSubtraction()}
                  <p className="text-lg mt-4">
                    Cross out <span className="font-bold text-red-600">{currentQ.num2}</span> items
                  </p>
                </div>

                <div className="flex items-center justify-center gap-4 text-2xl font-bold text-gray-700">
                  <span className="text-blue-600">{currentQ.num1}</span>
                  <Minus className="h-6 w-6 text-red-600" />
                  <span className="text-red-600">{currentQ.num2}</span>
                  <span>=</span>
                  <span className="text-purple-600">?</span>
                </div>
              </div>
            </div>

            {/* Answer Options */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => handleAnswerSelect(option)}
                  disabled={showFeedback}
                  variant={
                    showFeedback
                      ? option === correctAnswer
                        ? "default"
                        : selectedAnswer === option
                          ? "destructive"
                          : "outline"
                      : "outline"
                  }
                  className={`h-16 text-2xl font-bold ${
                    showFeedback && option === correctAnswer ? "bg-green-500 hover:bg-green-600" : ""
                  }`}
                >
                  {option}
                </Button>
              ))}
            </div>

            {/* Feedback */}
            {showFeedback && (
              <div
                className={`p-4 rounded-lg ${
                  selectedAnswer === correctAnswer ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                }`}
              >
                {selectedAnswer === correctAnswer ? (
                  <div>
                    <Trophy className="h-6 w-6 mx-auto mb-2" />
                    <p className="font-bold text-lg">Excellent!</p>
                    <p>
                      {currentQ.num1} - {currentQ.num2} = {correctAnswer}
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="font-bold text-lg">Try again!</p>
                    <p>
                      Correct answer: {currentQ.num1} - {currentQ.num2} = {correctAnswer}
                    </p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
