"use client"

import type { ReactNode } from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Star, Trophy, BookOpen, Calculator, Award, Volume2 } from "lucide-react"
import AlphabetGame from "../components/alphabet-game"
import CountingGame from "../components/counting-game"
import WordBuildingGame from "../components/word-building-game"
import AdditionGame from "../components/addition-game"
import SubtractionGame from "../components/subtraction-game"
import ShapeGame from "../components/shape-game"

interface GameStats {
  level: number
  points: number
  badges: string[]
  streakDays: number
}

interface Subject {
  id: string
  name: string
  icon: ReactNode
  color: string
  progress: number
  games: Game[]
}

interface Game {
  id: string
  name: string
  description: string
  difficulty: number
  completed: boolean
}

export default function EducationGamePlatform() {
  const [currentView, setCurrentView] = useState<"home" | "language" | "math" | "game">("home")
  const [selectedGame, setSelectedGame] = useState<string | null>(null)
  const [gameStats, setGameStats] = useState<GameStats>({
    level: 3,
    points: 1250,
    badges: ["First Steps", "Word Master", "Number Hero"],
    streakDays: 7,
  })

  const subjects: Subject[] = [
    {
      id: "language",
      name: "Language Learning",
      icon: <BookOpen className="h-8 w-8" />,
      color: "bg-blue-500",
      progress: 65,
      games: [
        {
          id: "alphabet",
          name: "Alphabet Adventure",
          description: "Learn letters with fun sounds and pictures",
          difficulty: 1,
          completed: true,
        },
        {
          id: "words",
          name: "Word Building",
          description: "Create words from letters",
          difficulty: 2,
          completed: true,
        },
        {
          id: "reading",
          name: "Reading Practice",
          description: "Read simple sentences and stories",
          difficulty: 3,
          completed: false,
        },
        {
          id: "stories",
          name: "Story Time",
          description: "Listen to interactive stories",
          difficulty: 2,
          completed: false,
        },
      ],
    },
    {
      id: "math",
      name: "Mathematics",
      icon: <Calculator className="h-8 w-8" />,
      color: "bg-green-500",
      progress: 45,
      games: [
        {
          id: "counting",
          name: "Counting Fun",
          description: "Count objects and learn numbers",
          difficulty: 1,
          completed: true,
        },
        {
          id: "addition",
          name: "Addition Adventure",
          description: "Add numbers together",
          difficulty: 2,
          completed: false,
        },
        {
          id: "subtraction",
          name: "Subtraction Safari",
          description: "Learn to subtract numbers",
          difficulty: 2,
          completed: false,
        },
        {
          id: "shapes",
          name: "Shape Explorer",
          description: "Discover different shapes",
          difficulty: 1,
          completed: true,
        },
      ],
    },
  ]

  const playSound = () => {
    // Audio feedback simulation
    console.log("Playing encouraging sound!")
  }

  const renderHome = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-orange-400 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header with stats */}
        <Card className="mb-6 bg-white/90 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                  <Star className="h-6 w-6 text-yellow-800" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">Learning Adventure</h1>
                  <p className="text-gray-600">Fun Games for Smart Kids</p>
                </div>
              </div>
              <Button onClick={playSound} variant="outline" size="sm">
                <Volume2 className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{gameStats.level}</div>
                <div className="text-sm text-gray-600">Level</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{gameStats.points}</div>
                <div className="text-sm text-gray-600">Points</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{gameStats.badges.length}</div>
                <div className="text-sm text-gray-600">Badges</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{gameStats.streakDays}</div>
                <div className="text-sm text-gray-600">Day Streak</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Badges */}
        <Card className="mb-6 bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              Your Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {gameStats.badges.map((badge, index) => (
                <Badge key={index} variant="secondary" className="bg-yellow-100 text-yellow-800">
                  <Award className="h-3 w-3 mr-1" />
                  {badge}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Subjects */}
        <div className="grid md:grid-cols-2 gap-6">
          {subjects.map((subject) => (
            <Card
              key={subject.id}
              className="bg-white/90 backdrop-blur-sm hover:bg-white/95 transition-all cursor-pointer transform hover:scale-105"
              onClick={() => setCurrentView(subject.id as "language" | "math")}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className={`p-3 rounded-full ${subject.color} text-white`}>{subject.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold">{subject.name}</h3>
                    <Progress value={subject.progress} className="w-32 mt-2" />
                    <p className="text-sm text-gray-600 mt-1">{subject.progress}% Complete</p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {subject.games.slice(0, 4).map((game) => (
                    <div
                      key={game.id}
                      className={`p-2 rounded-lg text-center text-sm ${game.completed ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}`}
                    >
                      {game.completed ? "✓" : "○"} {game.name.split(" ")[0]}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )

  const renderSubject = (subjectId: "language" | "math") => {
    const subject = subjects.find((s) => s.id === subjectId)
    if (!subject) return null

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 p-4">
        <div className="max-w-4xl mx-auto">
          <Card className="mb-6 bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-3">
                  <div className={`p-3 rounded-full ${subject.color} text-white`}>{subject.icon}</div>
                  {subject.name}
                </CardTitle>
                <Button onClick={() => setCurrentView("home")} variant="outline">
                  Back Home
                </Button>
              </div>
              <Progress value={subject.progress} className="mt-4" />
            </CardHeader>
          </Card>

          <div className="grid md:grid-cols-2 gap-4">
            {subject.games.map((game) => (
              <Card
                key={game.id}
                className="bg-white/90 backdrop-blur-sm hover:bg-white/95 transition-all cursor-pointer transform hover:scale-105"
                onClick={() => {
                  setSelectedGame(game.id)
                  setCurrentView("game")
                }}
              >
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="text-lg">{game.name}</span>
                    <div className="flex items-center gap-2">
                      {game.completed && <Badge className="bg-green-500">Completed</Badge>}
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < game.difficulty ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{game.description}</p>
                  <Button className="w-full" variant={game.completed ? "secondary" : "default"}>
                    {game.completed ? "Play Again" : "Start Game"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const renderGame = () => {
    if (!selectedGame) return null

    const handleGameComplete = () => {
      setGameStats((prev) => ({
        ...prev,
        points: prev.points + 50,
        level: prev.level + (prev.points + 50 > prev.level * 500 ? 1 : 0),
      }))

      setCurrentView("home")
      setSelectedGame(null)
    }

    const handleGameBack = () => {
      setCurrentView("home")
      setSelectedGame(null)
    }

    // Render the appropriate game component
    switch (selectedGame) {
      case "alphabet":
        return <AlphabetGame onComplete={handleGameComplete} onBack={handleGameBack} />

      case "counting":
        return <CountingGame onComplete={handleGameComplete} onBack={handleGameBack} />

      case "words":
        return <WordBuildingGame onComplete={handleGameComplete} onBack={handleGameBack} />

      case "addition":
        return <AdditionGame onComplete={handleGameComplete} onBack={handleGameBack} />

      case "subtraction":
        return <SubtractionGame onComplete={handleGameComplete} onBack={handleGameBack} />

      case "shapes":
        return <ShapeGame onComplete={handleGameComplete} onBack={handleGameBack} />

      default:
        return (
          <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-400 to-purple-400 p-4">
            <div className="max-w-4xl mx-auto">
              <Card className="bg-white/90 backdrop-blur-sm">
                <CardContent className="text-center py-12">
                  <h2 className="text-2xl font-bold mb-2">Game not found!</h2>
                  <Button onClick={() => setCurrentView("home")}>Go Home</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )
    }
  }

  return (
    <>
      {currentView === "home" && renderHome()}
      {(currentView === "language" || currentView === "math") && renderSubject(currentView)}
      {currentView === "game" && renderGame()}
    </>
  )
}
