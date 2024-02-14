import { useRef } from "react";
import './style.css';


const ShowAnswersButton = (props) => {

  /***
   * @type {{
  *   wrongAnswerCount: number,
  * set: () => void
   * }}
   */
  const { wrongAnswerCount, set } = props

  const buttonRef = useRef();

  const chooseCorrect = () => {
    set()
  }

  if (wrongAnswerCount > 2) {
    buttonRef.current.classList.add('visible')
  }

  return (
    <div className='give-answer'>
      <div ref={buttonRef} className='check-button' onClick={() => chooseCorrect()}>
        reveal the answer
      </div>
    </div>
  );
};

export default ShowAnswersButton;