import { useContext, useState } from 'react';
import './style.css';
import GoodsContext from '../../context/goods.context';
import GoodsComponent from '../goods';



const CounterComponent = () => {

  const { selectedGoods, currentTableGoods, addGoods } = useContext(GoodsContext);

  // const costs = selectedGoods
  //  .map(el => el.cost);
  // let sum = 0;
  // for (const el of costs) {
  //  sum += el;
  // }

  const sum = selectedGoods.reduce((acc, cur) => {
    return acc + cur.cost;
  }, 0);

  const AutoDetect = () => {
    addGoods(currentTableGoods[0])
  }

  return (
    <div className='cost-wrapper'>
      <div>{sum}/40</div>
      <div className='auto-detect' onClick={AutoDetect}>auto-detect</div>
      <div className='selected-goods'>
        {
          selectedGoods
            .map(el => <GoodsComponent {...el} key={'selected' + el.id} />)
        }
      </div>
    </div>
  );
};

export default CounterComponent;