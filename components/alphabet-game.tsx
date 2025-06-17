"use client"

import { useState } from "react"
import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Volume2, Star, Trophy } from "lucide-react"

interface AlphabetGameProps {
  onComplete: () => void
  onBack: () => void
}

export default function AlphabetGame({ onComplete, onBack }: AlphabetGameProps) {
  const [currentLetter, setCurrentLetter] = useState(0)
  const [score, setScore] = useState(0)
  const [showFeedback, setShowFeedback] = useState(false)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  const alphabets = [
    { letter: "A", sound: "AY", word: "Apple", image: "🍎" },
    { letter: "B", sound: "BEE", word: "Ball", image: "⚽" },
    { letter: "C", sound: "SEE", word: "Cat", image: "🐱" },
    { letter: "D", sound: "DEE", word: "Dog", image: "🐶" },
    { letter: "E", sound: "EE", word: "Elephant", image: "🐘" },
    { letter: "F", sound: "EFF", word: "Fish", image: "🐟" },
    { letter: "G", sound: "GEE", word: "Goat", image: "🐐" },
    { letter: "H", sound: "AYCH", word: "House", image: "🏠" },
  ]

  const currentAlphabet = alphabets[currentLetter]

  React.useEffect(() => {
    const generateOptions = () => {
      const correct = currentAlphabet.word
      const options = [correct]

      const wrongOptions = ["Tree", "Car", "Book", "Sun", "Moon", "Star", "Bird", "Flower", "Water", "Fire"]
      while (options.length < 4) {
        const wrong = wrongOptions[Math.floor(Math.random() * wrongOptions.length)]
        if (!options.includes(wrong)) {
          options.push(wrong)
        }
      }

      return options.sort(() => Math.random() - 0.5)
    }

    setOptions(generateOptions())
  }, [currentLetter])

  const progress = ((currentLetter + 1) / alphabets.length) * 100

  const [options, setOptions] = useState<string[]>([])

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option)
    setShowFeedback(true)

    if (option === currentAlphabet.word) {
      setScore(score + 10)
      setTimeout(() => {
        if (currentLetter < alphabets.length - 1) {
          setCurrentLetter(currentLetter + 1)
          setShowFeedback(false)
          setSelectedOption(null)
        } else {
          onComplete()
        }
      }, 2000)
    } else {
      setTimeout(() => {
        setShowFeedback(false)
        setSelectedOption(null)
      }, 2000)
    }
  }

  const playLetterSound = () => {
    // Audio simulation
    console.log(`Playing sound for: ${currentAlphabet.letter} - ${currentAlphabet.sound}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-400 to-indigo-400 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <Card className="mb-6 bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                Alphabet Adventure
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
              {currentLetter + 1} of {alphabets.length} letters
            </p>
          </CardHeader>
        </Card>

        {/* Main Game Area */}
        <Card className="bg-white/90 backdrop-blur-sm">
          <CardContent className="p-8 text-center">
            {/* Letter Display */}
            <div className="mb-8">
              <div className="w-32 h-32 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-6xl font-bold text-white">{currentAlphabet.letter}</span>
              </div>
              <Button onClick={playLetterSound} className="mb-4" variant="outline">
                <Volume2 className="h-4 w-4 mr-2" />
                Hear Sound
              </Button>
              <p className="text-lg text-gray-600">
                Sound: <span className="font-bold">{currentAlphabet.sound}</span>
              </p>
            </div>

            {/* Question */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Which word starts with this letter?</h2>
              <div className="text-6xl mb-2">{currentAlphabet.image}</div>
            </div>

            {/* Options */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => handleOptionSelect(option)}
                  disabled={showFeedback}
                  variant={
                    showFeedback
                      ? option === currentAlphabet.word
                        ? "default"
                        : selectedOption === option
                          ? "destructive"
                          : "outline"
                      : "outline"
                  }
                  className={`h-16 text-lg ${
                    showFeedback && option === currentAlphabet.word ? "bg-green-500 hover:bg-green-600" : ""
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
                  selectedOption === currentAlphabet.word ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                }`}
              >
                {selectedOption === currentAlphabet.word ? (
                  <div>
                    <Trophy className="h-6 w-6 mx-auto mb-2" />
                    <p className="font-bold">Excellent!</p>
                    <p>
                      {currentAlphabet.letter} is for {currentAlphabet.word}
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="font-bold">Keep trying!</p>
                    <p>Correct answer: {currentAlphabet.word}</p>
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
