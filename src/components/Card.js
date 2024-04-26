import React, { useState, useEffect } from 'react';
import ReactCardFlip from 'react-card-flip';
import backFace from '../images/sub25/oraculo2.jpeg';
import classnames from 'classnames';

const Card = ({ name, number, frontFace, flipCard, unflippedCards, disabledCards}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [hasEvent, setHasEvent] = useState(true);


  const cardImageClass = classnames('card-image', { '': isFlipped });
  const cardImageClassFront = classnames('card-image', { 'isflip': isFlipped });

  useEffect(() => {
    if (unflippedCards.includes(number)) {
      setTimeout(() => setIsFlipped(false), 700);
    }
  }, [unflippedCards])

  useEffect(() => {
    if (disabledCards.includes(number)) {
      setHasEvent(false);
    }
  }, [disabledCards])

  const handleClick = e => {
    const value = flipCard(name, number);
    if (value !== 0) {
      setIsFlipped(!isFlipped);
     
      setTimeout(function() {
        window.location.href = '/'; 
      }, 4500);
    }
  }

  let className = 'card-image';
if (isFlipped) {
  className += ' isflip';
}

  return (
    <div className='card' >
      <ReactCardFlip className='cards' isFlipped={isFlipped} >
      <img    
          className={classnames(cardImageClass, { 'no-event': !hasEvent })}
          src={backFace}
          alt='back-face'
          onClick={hasEvent ? handleClick : null}
        />
        <img
           
          className={classnames(cardImageClassFront, { 'no-event': !hasEvent })}
          src={frontFace}
          alt='front-face'
          onClick={hasEvent ? handleClick : null}
        />
      </ReactCardFlip>
    </div>
  )
}

export default Card
