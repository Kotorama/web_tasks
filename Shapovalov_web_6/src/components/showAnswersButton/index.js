
const ShowAnswersButton = (props) => {

  /***
   * @type {{
  *   wrongAnswerCount: any,
  *   correctAnswer: any,
  * set: () => void
   * }}
   */
  const { wrongAnswerCount, correctAnswer, set } = props

  const chooseCorrect = () => {
    set()
  }

  if (wrongAnswerCount > 2) {

  }

  return (
    <div className='give-answer'>
      <div className='button' onClick={chooseCorrect()}>

      </div>
    </div>
  );
};

