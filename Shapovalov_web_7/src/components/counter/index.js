import { useCallback, useContext } from 'react';
import { useMemo } from 'react';
import './style.css';
import GoodsContext from '../../context/goods.context';
import GoodsComponent from '../goods';


// const getCosts = (goods) => {
//   const costs = goods.map((item) => item.cost)
//   return costs
// };



const CounterComponent = ({ goods, addGoods }) => {

  const { removeAllGoods } = useContext(GoodsContext);
  const { selectedGoods } = useContext(GoodsContext);
  const { unselectAllGoods } = useContext(GoodsContext);

  function combinationUtil(arr, data, start, end, index, r) {
    // Current combination is ready to be printed, print it
    if (index == r) {
      return data;
    }

    // replace index with all possible elements. The condition
    // "end-i+1 >= r-index" makes sure that including one element
    // at index will make a combination with remaining elements
    // at remaining positions
    for (let i = start; i <= end && end - i + 1 >= r - index; i++) {
      data[index] = arr[i];
      combinationUtil(arr, data, i + 1, end, index + 1, r);
    }
  }

  // The main function that prints all combinations of size r
  // in arr[] of size n. This function mainly uses combinationUtil()
  function returnCombination(arr, n, r) {
    // A temporary array to store all combination one by one
    let data = new Array(r);

    // Print all combination using temporary array 'data[]'
    combinationUtil(arr, data, 0, n - 1, 0, r);
  }

  /*Driver function to check for above function*/
  let arr = [1, 2, 3, 4, 5];


  // const costs = selectedGoods
  //  .map(el => el.cost);
  // let sum = 0;
  // for (const el of costs) {
  //  sum += el;
  // }

  const sum = selectedGoods.reduce((acc, cur) => {
    return acc + cur.cost;
  }, 0);

  const AutoDetect = useCallback(() => {
    const foundItem = goods[0];
    console.log({ foundItem })
    unselectAllGoods();
    addGoods(foundItem);
    let n = goods.length;
    console.log(returnCombination(goods, n, 3));

    // props.map((x) => console.log(x.cost))

  }, [goods, addGoods]);

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