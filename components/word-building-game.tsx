"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Star, Trophy, Volume2 } from "lucide-react"

interface WordBuildingGameProps {
  onComplete: () => void
  onBack: () => void
}

export default function WordBuildingGame({ onComplete, onBack }: WordBuildingGameProps) {
  const [currentWord, setCurrentWord] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedLetters, setSelectedLetters] = useState<string[]>([])
  const [showFeedback, setShowFeedback] = useState(false)

  const words = [
    { word: "CAT", image: "🐱", hint: "A pet that says meow" },
    { word: "DOG", image: "🐶", hint: "A pet that barks" },
    { word: "SUN", image: "☀️", hint: "Bright light in the sky" },
    { word: "BAT", image: "🦇", hint: "Flies at night" },
    { word: "HAT", image: "👒", hint: "You wear it on your head" },
    { word: "CUP", image: "☕", hint: "You drink from it" },
  ]

  const currentWordData = words[currentWord]
  const progress = ((currentWord + 1) / words.length) * 100

  const [availableLetters, setAvailableLetters] = useState<string[]>([])

  React.useEffect(() => {
    const generateLetters = () => {
      const wordLetters = currentWordData.word.split("")
      const extraLetters = ["X", "Z", "Q", "J", "K", "V", "W", "Y"]
      const allLetters = [...wordLetters, ...extraLetters.slice(0, 3)]
      return allLetters.sort(() => Math.random() - 0.5)
    }

    setAvailableLetters(generateLetters())
    setSelectedLetters([])
    setShowFeedback(false)
  }, [currentWord])

  const handleLetterClick = (letter: string, index: number) => {
    if (selectedLetters.length < currentWordData.word.length) {
      setSelectedLetters([...selectedLetters, letter])
    }
  }

  const handleRemoveLetter = (index: number) => {
    const newSelected = selectedLetters.filter((_, i) => i !== index)
    setSelectedLetters(newSelected)
  }

  const checkWord = () => {
    const formedWord = selectedLetters.join("")
    setShowFeedback(true)

    if (formedWord === currentWordData.word) {
      setScore(score + 20)
      setTimeout(() => {
        if (currentWord < words.length - 1) {
          setCurrentWord(currentWord + 1)
          setSelectedLetters([])
          setShowFeedback(false)
        } else {
          onComplete()
        }
      }, 2000)
    } else {
      setTimeout(() => {
        setShowFeedback(false)
      }, 2000)
    }
  }

  const clearWord = () => {
    setSelectedLetters([])
  }

  const playWordSound = () => {
    console.log(`Playing sound for: ${currentWordData.word}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-red-400 to-pink-400 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <Card className="mb-6 bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                Word Building
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
              {currentWord + 1} of {words.length} words
            </p>
          </CardHeader>
        </Card>

        {/* Main Game Area */}
        <Card className="bg-white/90 backdrop-blur-sm">
          <CardContent className="p-8 text-center">
            {/* Word Hint */}
            <div className="mb-8">
              <div className="text-8xl mb-4">{currentWordData.image}</div>
              <h2 className="text-2xl font-bold mb-2">Build the word!</h2>
              <p className="text-lg text-gray-600 mb-4">{currentWordData.hint}</p>
              <Button onClick={playWordSound} variant="outline" size="sm">
                <Volume2 className="h-4 w-4 mr-2" />
                Hear Word
              </Button>
            </div>

            {/* Word Building Area */}
            <div className="mb-8">
              <div className="flex justify-center gap-2 mb-4">
                {Array.from({ length: currentWordData.word.length }, (_, i) => (
                  <div
                    key={i}
                    className="w-16 h-16 border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center bg-gray-50 cursor-pointer"
                    onClick={() => selectedLetters[i] && handleRemoveLetter(i)}
                  >
                    <span className="text-2xl font-bold text-blue-600">{selectedLetters[i] || ""}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-center gap-2 mb-6">
                <Button
                  onClick={checkWord}
                  disabled={selectedLetters.length !== currentWordData.word.length || showFeedback}
                  className="bg-green-500 hover:bg-green-600"
                >
                  Check Word
                </Button>
                <Button onClick={clearWord} variant="outline">
                  Clear
                </Button>
              </div>
            </div>

            {/* Available Letters */}
            <div className="mb-6">
              <h3 className="text-lg font-bold mb-4">Choose Letters:</h3>
              <div className="flex flex-wrap justify-center gap-2">
                {availableLetters.map((letter, index) => (
                  <Button
                    key={index}
                    onClick={() => handleLetterClick(letter, index)}
                    disabled={selectedLetters.includes(letter) || selectedLetters.length >= currentWordData.word.length}
                    variant="outline"
                    className="w-12 h-12 text-xl font-bold"
                  >
                    {letter}
                  </Button>
                ))}
              </div>
            </div>

            {/* Feedback */}
            {showFeedback && (
              <div
                className={`p-4 rounded-lg ${
                  selectedLetters.join("") === currentWordData.word
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {selectedLetters.join("") === currentWordData.word ? (
                  <div>
                    <Trophy className="h-6 w-6 mx-auto mb-2" />
                    <p className="font-bold text-lg">Perfect!</p>
                    <p>You spelled {currentWordData.word} correctly!</p>
                  </div>
                ) : (
                  <div>
                    <p className="font-bold text-lg">Try again!</p>
                    <p>The correct spelling is: {currentWordData.word}</p>
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
