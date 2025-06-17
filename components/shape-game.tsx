"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Star, Trophy } from "lucide-react"

interface ShapeGameProps {
  onComplete: () => void
  onBack: () => void
}

export default function ShapeGame({ onComplete, onBack }: ShapeGameProps) {
  const [currentShape, setCurrentShape] = useState(0)
  const [score, setScore] = useState(0)
  const [showFeedback, setShowFeedback] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [options, setOptions] = useState<string[]>([])

  const shapes = [
    {
      name: "Circle",
      svg: <circle cx="50" cy="50" r="40" fill="#FF6B6B" stroke="#333" strokeWidth="3" />,
      description: "Round like a ball",
    },
    {
      name: "Square",
      svg: <rect x="10" y="10" width="80" height="80" fill="#4ECDC4" stroke="#333" strokeWidth="3" />,
      description: "Four equal sides",
    },
    {
      name: "Triangle",
      svg: <polygon points="50,10 10,90 90,90" fill="#45B7D1" stroke="#333" strokeWidth="3" />,
      description: "Three sides and three corners",
    },
    {
      name: "Rectangle",
      svg: <rect x="10" y="25" width="80" height="50" fill="#96CEB4" stroke="#333" strokeWidth="3" />,
      description: "Four sides, longer than wide",
    },
    {
      name: "Star",
      svg: (
        <polygon
          points="50,5 61,35 95,35 68,57 79,91 50,70 21,91 32,57 5,35 39,35"
          fill="#FECA57"
          stroke="#333"
          strokeWidth="2"
        />
      ),
      description: "Five points like in the sky",
    },
    {
      name: "Heart",
      svg: (
        <path
          d="M50,85 C50,85 20,50 20,35 C20,25 30,15 40,15 C45,15 50,20 50,20 C50,20 55,15 60,15 C70,15 80,25 80,35 C80,50 50,85 50,85 Z"
          fill="#FF9FF3"
          stroke="#333"
          strokeWidth="2"
        />
      ),
      description: "Shape of love",
    },
  ]

  const currentShapeData = shapes[currentShape]
  const progress = ((currentShape + 1) / shapes.length) * 100

  useEffect(() => {
    const generateOptions = () => {
      const correct = currentShapeData.name
      const options = [correct]

      const wrongOptions = shapes.filter((s) => s.name !== correct).map((s) => s.name)
      while (options.length < 4 && wrongOptions.length > 0) {
        const randomIndex = Math.floor(Math.random() * wrongOptions.length)
        const wrong = wrongOptions.splice(randomIndex, 1)[0]
        options.push(wrong)
      }

      return options.sort(() => Math.random() - 0.5)
    }

    setOptions(generateOptions())
    setSelectedAnswer(null)
    setShowFeedback(false)
  }, [currentShape])

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer)
    setShowFeedback(true)

    if (answer === currentShapeData.name) {
      setScore(score + 15)
      setTimeout(() => {
        if (currentShape < shapes.length - 1) {
          setCurrentShape(currentShape + 1)
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
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-red-400 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <Card className="mb-6 bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                Shape Explorer
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
              {currentShape + 1} of {shapes.length} shapes
            </p>
          </CardHeader>
        </Card>

        {/* Main Game Area */}
        <Card className="bg-white/90 backdrop-blur-sm">
          <CardContent className="p-8 text-center">
            {/* Shape Display */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-6">What shape is this?</h2>

              <div className="w-48 h-48 mx-auto mb-4 bg-white rounded-lg shadow-lg flex items-center justify-center">
                <svg width="100" height="100" viewBox="0 0 100 100">
                  {currentShapeData.svg}
                </svg>
              </div>

              <p className="text-lg text-gray-600 italic">"{currentShapeData.description}"</p>
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
                      ? option === currentShapeData.name
                        ? "default"
                        : selectedAnswer === option
                          ? "destructive"
                          : "outline"
                      : "outline"
                  }
                  className={`h-16 text-lg ${
                    showFeedback && option === currentShapeData.name ? "bg-green-500 hover:bg-green-600" : ""
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
                  selectedAnswer === currentShapeData.name ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                }`}
              >
                {selectedAnswer === currentShapeData.name ? (
                  <div>
                    <Trophy className="h-6 w-6 mx-auto mb-2" />
                    <p className="font-bold text-lg">Perfect!</p>
                    <p>That's a {currentShapeData.name}!</p>
                  </div>
                ) : (
                  <div>
                    <p className="font-bold text-lg">Try again!</p>
                    <p>That's a {currentShapeData.name}</p>
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
