import { useRef } from 'react';
import { useState } from 'react';
import './style.css';
import * as uuid from 'uuid';
import ShowAnswersButton from '../../showAnswersButton';

const isArrayEqual = (selected, correct) => {

  if (selected.length !== correct.length) {
    return false;
  }
  return correct.filter(e => !selected.includes(e)).length === 0;
};

/**
 * 
 * @param {Object} props 
 * @param {string} props.question
 * @param {string[]} props.answers
 * @param {number[]} props.correctAnswer
 * @returns 
 */
const MultiAnswerComponent = (props) => {

  const [count, setCount] = useState(0);

  const [selectCorrectAnswer, _setSelectCorrectAnswer] = useState(false)

  const setSelectCorrectAnswer = () => {
    _setSelectCorrectAnswer(true)
    correctRef.current.classList.add('selected');
    wrongRef.current.classList.remove('selected');
  }

  let selectedAnswerIndex = [];
  const checkboxClick = (index, status) => {
    if (status) {
      selectedAnswerIndex.push(index);
    } else {
      selectedAnswerIndex = selectedAnswerIndex.filter(e => e === index);
    }
    wrongRef.current.classList.remove('selected');
    correctRef.current.classList.remove('selected');
  };

  const correctRef = useRef();
  const wrongRef = useRef();

  const checkOnClick = () => {
    if (isArrayEqual(selectedAnswerIndex, props.correctAnswer) || selectCorrectAnswer) {
      correctRef.current.classList.add('selected');
      wrongRef.current.classList.remove('selected');
    } else {
      wrongRef.current.classList.add('selected');
      correctRef.current.classList.remove('selected');
      setCount(count + 1);
    }
  };

  return (
    <div className='question single-answer'>
      <div><h3>{props.question}</h3></div>
      <div className='answers'>
        {props.answers.map((answer, i) => {
          const id = uuid.v1();
          return (<div>
            <input
              id={id}
              type='checkbox'
              onClick={(e) => checkboxClick(i, e.currentTarget.checked)}
              checked={selectCorrectAnswer ? (props.correctAnswer.includes(i)) : undefined}
            />
            <label
              for={id}
              className={selectCorrectAnswer && (props.correctAnswer.includes(i)) ? 'checked-label' : undefined}
            >{answer}</label>
          </div>);
        })}
      </div>
      <div className='check'>
        <div className='button' onClick={checkOnClick}>
          check my answer
          <div ref={correctRef} className='correct'>correct</div>
          <div ref={wrongRef} className='wrong'>wrong {count}</div>
        </div>

      </div>
      <ShowAnswersButton
        wrongAnswerCount={count}
        set={setSelectCorrectAnswer}
        check={checkOnClick}
      />
    </div>
  );
};

export default MultiAnswerComponent;