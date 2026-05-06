import { useState } from "react";
import Card from "./Card";
import introVideo from "./assets/intro.mp4";
import bgImage from "./assets/bg.jpg";

function App() {
  const [flashcards, setFlashcards] = useState([
    { term: "Variable", definition: "Stores data values" },
    { term: "Function", definition: "Reusable block of code" },
    { term: "Array", definition: "Stores multiple values in one variable" },
    { term: "Object", definition: "Collection of key-value pairs" },
    { term: "Loop", definition: "Repeats a block of code multiple times" },
    { term: "Conditional", definition: "Executes code based on a condition" },
    { term: "Boolean", definition: "Represents true or false values" },
    { term: "String", definition: "Sequence of characters" },
    { term: "Number", definition: "Represents numeric values" },
    { term: "Null", definition: "Represents an empty value" },
    { term: "Undefined", definition: "Declared but not assigned" },
    { term: "API", definition: "Allows communication between systems" },
    { term: "DOM", definition: "Represents HTML as objects" },
    { term: "Event", definition: "User action like click or key press" },
    { term: "State", definition: "Stores dynamic data in React" },
    { term: "Props", definition: "Data passed between components" },
    { term: "Component", definition: "Reusable UI block in React" },
    { term: "Hook", definition: "Special React function" },
  ]);

  const [term, setTerm] = useState("");
  const [definition, setDefinition] = useState("");
  const [showApp, setShowApp] = useState(false);

  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState([]);

  const addCard = () => {
    if (term === "" || definition === "") return;

    setFlashcards([...flashcards, { term, definition }]);
    setTerm("");
    setDefinition("");
  };

  const deleteCard = (indexToDelete) => {
    const newCards = flashcards.filter((_, index) => index !== indexToDelete);
    setFlashcards(newCards);
  };

  const startQuiz = () => {
    if (flashcards.length < 2) {
      alert("Please keep at least 2 flashcards to start quiz.");
      return;
    }

    setQuizStarted(true);
    setCurrentQuestion(0);
    setSelectedOption("");
    setShowResult(false);
    setQuizFinished(false);
    setScore(0);
    setWrongAnswers([]);

    setTimeout(() => {
      document.getElementById("quiz-section")?.scrollIntoView({
        behavior: "smooth",
      });
    }, 100);
  };

  const getOptions = () => {
    const correctAnswer = flashcards[currentQuestion].definition;

    const wrongOptions = flashcards
      .filter((_, index) => index !== currentQuestion)
      .map((card) => card.definition)
      .slice(0, 3);

    const options = [correctAnswer, ...wrongOptions];

    return options.sort(() => Math.random() - 0.5);
  };

  const handleOptionClick = (option) => {
    if (showResult) return;

    setSelectedOption(option);
    setShowResult(true);

    const correctAnswer = flashcards[currentQuestion].definition;

    if (option === correctAnswer) {
      setScore(score + 1);
    } else {
      setWrongAnswers([
        ...wrongAnswers,
        {
          question: flashcards[currentQuestion].term,
          selected: option,
          correct: correctAnswer,
        },
      ]);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion + 1 < flashcards.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption("");
      setShowResult(false);
    } else {
      setQuizFinished(true);
    }
  };

  const restartQuiz = () => {
    startQuiz();
  };

  const options = quizStarted && !quizFinished ? getOptions() : [];

  return (
    <>
      {!showApp ? (
        <div
          style={{
            position: "relative",
            height: "100vh",
            overflow: "hidden",
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <video
            src={introVideo}
            autoPlay
            muted
            onEnded={() => setShowApp(true)}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              objectFit: "cover",
            }}
          />

          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "rgba(0,0,0,0.4)",
            }}
          ></div>

          <h1
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontFamily: "'Poppins', sans-serif",
              fontSize: "48px",
              fontWeight: "700",
              color: "white",
              letterSpacing: "2px",
              textAlign: "center",
              animation: "glowText 2s ease-in-out infinite alternate",
            }}
          >
            Dev-Term Flashcards
          </h1>
        </div>
      ) : (
        <div
          style={{
            textAlign: "center",
            minHeight: "100vh",
            paddingTop: "50px",
            paddingBottom: "60px",
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div
            style={{
              marginBottom: "30px",
              display: "flex",
              justifyContent: "center",
              gap: "12px",
              flexWrap: "wrap",
            }}
          >
            <input
              type="text"
              placeholder="Enter term"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              style={{
                padding: "12px 15px",
                borderRadius: "25px",
                border: "none",
                outline: "none",
                width: "180px",
                fontSize: "14px",
                backdropFilter: "blur(10px)",
                background: "rgba(255,255,255,0.7)",
                boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
              }}
            />

            <input
              type="text"
              placeholder="Enter definition"
              value={definition}
              onChange={(e) => setDefinition(e.target.value)}
              style={{
                padding: "12px 15px",
                borderRadius: "25px",
                border: "none",
                outline: "none",
                width: "220px",
                fontSize: "14px",
                backdropFilter: "blur(10px)",
                background: "rgba(255,255,255,0.7)",
                boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
              }}
            />

            <button
              onClick={addCard}
              style={{
                padding: "12px 18px",
                borderRadius: "25px",
                border: "none",
                background: "linear-gradient(135deg, #4dabf7, #3b82f6)",
                color: "white",
                fontWeight: "bold",
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
              }}
            >
              Add Card
            </button>
          </div>

          {!quizStarted && (
            <>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
                  gap: "30px",
                  justifyContent: "center",
                  padding: "20px",
                }}
              >
                {flashcards.map((card, index) => (
                  <Card
                    key={index}
                    term={card.term}
                    definition={card.definition}
                    onDelete={() => deleteCard(index)}
                  />
                ))}
              </div>

              <div style={{ marginTop: "40px" }}>
                <button
                  onClick={startQuiz}
                  style={{
                    padding: "14px 25px",
                    borderRadius: "30px",
                    border: "none",
                    background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
                    color: "white",
                    fontWeight: "bold",
                    cursor: "pointer",
                    boxShadow: "0 6px 15px rgba(0,0,0,0.4)",
                  }}
                >
                  Start Quiz
                </button>
              </div>
            </>
          )}

          {quizStarted && !quizFinished && (
            <div
              id="quiz-section"
              style={{
                marginTop: "40px",
                width: "420px",
                maxWidth: "90%",
                marginLeft: "auto",
                marginRight: "auto",
                padding: "30px",
                borderRadius: "25px",
                background: "rgba(255,255,255,0.9)",
                boxShadow: "0 10px 25px rgba(0,0,0,0.4)",
              }}
            >
              <h2>Quiz Mode</h2>

              <p>
                Question {currentQuestion + 1} of {flashcards.length}
              </p>

              <h3>
                What is the definition of{" "}
                <span style={{ color: "#4f46e5" }}>
                  {flashcards[currentQuestion].term}
                </span>
                ?
              </h3>

              {options.map((option, index) => {
                const correctAnswer = flashcards[currentQuestion].definition;

                let bgColor = "#ffffff";

                if (showResult && option === correctAnswer) {
                  bgColor = "#22c55e";
                } else if (
                  showResult &&
                  option === selectedOption &&
                  option !== correctAnswer
                ) {
                  bgColor = "#ef4444";
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleOptionClick(option)}
                    style={{
                      display: "block",
                      width: "100%",
                      margin: "12px 0",
                      padding: "12px",
                      borderRadius: "12px",
                      border: "1px solid #ccc",
                      background: bgColor,
                      color: showResult ? "white" : "black",
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                  >
                    {option}
                  </button>
                );
              })}

              {showResult && (
                <button
                  onClick={nextQuestion}
                  style={{
                    marginTop: "20px",
                    padding: "12px 20px",
                    borderRadius: "25px",
                    border: "none",
                    background: "#2563eb",
                    color: "white",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  {currentQuestion + 1 === flashcards.length
                    ? "Finish Quiz"
                    : "Next Question"}
                </button>
              )}
            </div>
          )}

          {quizFinished && (
            <div
              style={{
                marginTop: "40px",
                width: "450px",
                maxWidth: "90%",
                marginLeft: "auto",
                marginRight: "auto",
                padding: "30px",
                borderRadius: "25px",
                background: "rgba(255,255,255,0.92)",
                boxShadow: "0 10px 25px rgba(0,0,0,0.4)",
              }}
            >
              <h2>Quiz Report</h2>

              <p>Total Questions: {flashcards.length}</p>
              <p>Correct Answers: {score}</p>
              <p>Wrong Answers: {flashcards.length - score}</p>
              <p>
                Average Score:{" "}
                {Math.round((score / flashcards.length) * 100)}%
              </p>

              {wrongAnswers.length > 0 && (
                <>
                  <h3>Wrong Answers Review</h3>

                  {wrongAnswers.map((item, index) => (
                    <div
                      key={index}
                      style={{
                        textAlign: "left",
                        background: "#f3f4f6",
                        margin: "10px 0",
                        padding: "12px",
                        borderRadius: "12px",
                      }}
                    >
                      <p>
                        <strong>Question:</strong> {item.question}
                      </p>
                      <p style={{ color: "red" }}>
                        <strong>Your Answer:</strong> {item.selected}
                      </p>
                      <p style={{ color: "green" }}>
                        <strong>Correct Answer:</strong> {item.correct}
                      </p>
                    </div>
                  ))}
                </>
              )}

              <button
                onClick={restartQuiz}
                style={{
                  marginTop: "20px",
                  padding: "12px 20px",
                  borderRadius: "25px",
                  border: "none",
                  background: "#7c3aed",
                  color: "white",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Restart Quiz
              </button>


              <button
              onClick={() => {
              setQuizStarted(false);
              setQuizFinished(false);
              }}
              style={{
              marginTop: "20px",
              marginLeft: "10px",
              padding: "12px 20px",
              borderRadius: "25px",
              border: "none",
              background: "#ef4444",
              color: "white",
              cursor: "pointer",
              fontWeight: "bold"
              }}
              >
              Back to Flashcards
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default App;