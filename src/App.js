import React, { useState, useEffect } from "react";
import { BiLogoWhatsapp } from "react-icons/bi";
import Card from "./components/Card";
import "./App.css";

import { images } from "./import";

function App() {
  const [cards, setCards] = useState([]);
  const [firstCard, setFirstCard] = useState({});
  const [secondCard, setSecondCard] = useState({});

  const [unflippedCards, setUnflippedCards] = useState([]);
  const [disabledCards, setDisabledCards] = useState([]);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  };

  useEffect(() => {
    shuffleArray(images);
    setCards(images);
  }, []);

  useEffect(() => {
    checkForMatch();
  }, [secondCard]);

  const flipCard = (name, number) => {
    if (firstCard.name === name && firstCard.number === number) {
      return 0;
    }
    if (!firstCard.name) {
      setFirstCard({ name, number });
    } else if (!secondCard.name) {
      setSecondCard({ name, number });
    }
    return 1;
  };

  const checkForMatch = () => {
    if (firstCard.name && secondCard.name) {
      const match = firstCard.name === secondCard.name;
      match ? disableCards() : unflipCards();
    }
  };

  const disableCards = () => {
    setDisabledCards([firstCard.number, secondCard.number]);
    resetCards();
  };

  const unflipCards = () => {
    setUnflippedCards([firstCard.number, secondCard.number]);
    resetCards();
  };

  const resetCards = () => {
    setFirstCard({});
    setSecondCard({});
  };

  return (
    <div className="app">
      <div className="cards-container ml-5">
        {cards.map((card, index) => (
          <Card
            name={card.player}
            number={index}
            frontFace={card.src}
            flipCard={flipCard}
            unflippedCards={unflippedCards}
            disabledCards={disabledCards}
          />
        ))}
      </div>
      <footer class="footer-container">
        <div className="text-container">
        <h2>
        SI QUERÉS TU ORÁCULO ESCRIBINOS
        </h2>
        <h2 class="footer-contact">
          <a
            class="footer-link"
            href="https://api.whatsapp.com/send?phone=541156678027"
            target="_blank"
          >
        
           <BiLogoWhatsapp />
          
          </a>
        </h2>
        </div>
      </footer>
    </div>
  );
}

export default App;
