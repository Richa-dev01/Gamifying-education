"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Star, Trophy, Plus } from "lucide-react"
import React from "react"

interface AdditionGameProps {
  onComplete: () => void
  onBack: () => void
}

export default function AdditionGame({ onComplete, onBack }: AdditionGameProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showFeedback, setShowFeedback] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)

  const questions = [
    { num1: 2, num2: 3, visual1: "🍎🍎", visual2: "🍎🍎🍎" },
    { num1: 1, num2: 4, visual1: "⭐", visual2: "⭐⭐⭐⭐" },
    { num1: 3, num2: 2, visual1: "🐱🐱🐱", visual2: "🐱🐱" },
    { num1: 4, num2: 1, visual1: "🌸🌸🌸🌸", visual2: "🌸" },
    { num1: 2, num2: 2, visual1: "🚗🚗", visual2: "🚗🚗" },
    { num1: 3, num2: 3, visual1: "🦋🦋🦋", visual2: "🦋🦋🦋" },
  ]

  const currentQ = questions[currentQuestion]
  const correctAnswer = currentQ.num1 + currentQ.num2
  const progress = ((currentQuestion + 1) / questions.length) * 100

  const [options, setOptions] = useState<number[]>([])

  React.useEffect(() => {
    const generateOptions = () => {
      const correct = currentQ.num1 + currentQ.num2
      const options = [correct]

      while (options.length < 4) {
        const wrong = Math.floor(Math.random() * 15) + 1
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-400 via-blue-400 to-purple-400 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <Card className="mb-6 bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                Addition Adventure
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
              <h2 className="text-2xl font-bold mb-6">Add these together!</h2>

              {/* Visual Addition */}
              <div className="bg-blue-50 rounded-lg p-6 mb-6">
                <div className="flex items-center justify-center gap-8 mb-4">
                  <div className="text-center">
                    <div className="text-4xl mb-2">{currentQ.visual1}</div>
                    <div className="text-2xl font-bold text-blue-600">{currentQ.num1}</div>
                  </div>

                  <div className="text-4xl text-green-600">
                    <Plus className="h-8 w-8" />
                  </div>

                  <div className="text-center">
                    <div className="text-4xl mb-2">{currentQ.visual2}</div>
                    <div className="text-2xl font-bold text-blue-600">{currentQ.num2}</div>
                  </div>

                  <div className="text-4xl text-purple-600">=</div>

                  <div className="text-center">
                    <div className="w-16 h-16 border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center bg-white">
                      <span className="text-2xl">?</span>
                    </div>
                  </div>
                </div>

                <div className="text-lg font-bold text-gray-700">
                  {currentQ.num1} + {currentQ.num2} = ?
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
                    <p className="font-bold text-lg">Amazing!</p>
                    <p>
                      {currentQ.num1} + {currentQ.num2} = {correctAnswer}
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="font-bold text-lg">Try again!</p>
                    <p>
                      Correct answer: {currentQ.num1} + {currentQ.num2} = {correctAnswer}
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
