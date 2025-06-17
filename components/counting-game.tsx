"use client"

import { useState } from "react"
import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Star, Trophy } from "lucide-react"

interface CountingGameProps {
  onComplete: () => void
  onBack: () => void
}

export default function CountingGame({ onComplete, onBack }: CountingGameProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showFeedback, setShowFeedback] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)

  const questions = [
    { objects: "🍎", count: 3, question: "How many apples are there?" },
    { objects: "⭐", count: 5, question: "How many stars can you count?" },
    { objects: "🐱", count: 2, question: "How many cats do you see?" },
    { objects: "🌸", count: 4, question: "How many flowers are here?" },
    { objects: "🚗", count: 6, question: "How many cars are there?" },
    { objects: "🦋", count: 7, question: "How many butterflies?" },
    { objects: "🎈", count: 8, question: "How many balloons?" },
    { objects: "🐸", count: 1, question: "How many frogs?" },
  ]

  const currentQ = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100

  const [options, setOptions] = useState<number[]>([])

  React.useEffect(() => {
    const generateOptions = () => {
      const correct = currentQ.count
      const options = [correct]

      while (options.length < 4) {
        const wrong = Math.floor(Math.random() * 10) + 1
        if (!options.includes(wrong)) {
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

    if (answer === currentQ.count) {
      setScore(score + 10)
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-400 to-purple-400 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <Card className="mb-6 bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                Counting Fun
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
              <h2 className="text-2xl font-bold mb-6">{currentQ.question}</h2>

              {/* Objects to count */}
              <div className="bg-blue-50 rounded-lg p-6 mb-6">
                <div className="flex flex-wrap justify-center gap-4">
                  {Array.from({ length: currentQ.count }, (_, i) => (
                    <span key={i} className="text-6xl animate-bounce" style={{ animationDelay: `${i * 0.1}s` }}>
                      {currentQ.objects}
                    </span>
                  ))}
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
                      ? option === currentQ.count
                        ? "default"
                        : selectedAnswer === option
                          ? "destructive"
                          : "outline"
                      : "outline"
                  }
                  className={`h-16 text-2xl font-bold ${
                    showFeedback && option === currentQ.count ? "bg-green-500 hover:bg-green-600" : ""
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
                  selectedAnswer === currentQ.count ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                }`}
              >
                {selectedAnswer === currentQ.count ? (
                  <div>
                    <Trophy className="h-6 w-6 mx-auto mb-2" />
                    <p className="font-bold text-lg">Well done!</p>
                    <p>Correct answer: {currentQ.count}</p>
                  </div>
                ) : (
                  <div>
                    <p className="font-bold text-lg">Try again!</p>
                    <p>Correct answer: {currentQ.count}</p>
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
