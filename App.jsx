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
  // { term: "useState", definition: "Manages state in React" },
  // { term: "useEffect", definition: "Handles side effects in React" }
]);

  const [term, setTerm] = useState("");
  const [definition, setDefinition] = useState("");
  const [showApp, setShowApp] = useState(false);

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
        backgroundPosition: "center"
        }} >

        
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
        objectFit: "cover"
        }} />


        <div
        style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.4)"
        }} >        
        </div>


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
        animation: "glowText 2s ease-in-out infinite alternate"
        }} >
        Dev-Term Flashcards
        </h1>


      </div>
    ) : (
      
    <div
    style = {{
    textAlign: "center",
    minHeight: "100vh",
    paddingTop: "50px",
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat"
    }} >




    <div
    style={{
    marginBottom: "30px",
    display: "flex",
    justifyContent: "center",
    gap: "12px",
    flexWrap: "wrap"
    }} >


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
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
    }} />

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
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
    }} />

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
    transition: "0.3s"
    }}

    onMouseOver={(e) =>
      (e.target.style.transform = "scale(1.05)")
    }

    onMouseOut={(e) =>
      (e.target.style.transform = "scale(1)")
    } >
    Add Card
    </button>

</div>


  <div
  style={{
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
  gap: "30px",
  justifyContent: "center",
  padding: "20px"
  }} >



  {flashcards.map((card, index) => (
  <Card
  key={index}
  term={card.term}
  definition={card.definition}
  onDelete={() => deleteCard(index)} />
  ))}

  </div>

</div>

)}
  </>
);

}

export default App;