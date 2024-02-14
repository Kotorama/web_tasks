import { useContext } from 'react';
import CampIcon from './camp-table.png';
import './style.css';
import GoodsContext from '../../context/goods.context';

const CampComponent = () => {
  const { removeAllGoods, selectedGoods } = useContext(GoodsContext);

  const sum = selectedGoods.reduce((acc, cur) => {
    return acc + cur.cost;
  }, 0);

  const campClick = () => {
    removeAllGoods();
  };

  return (
    <div className="camp">
      <img src={CampIcon} onClick={sum > 39 ? campClick : () => void 0} />
    </div>
  );
};

export default CampComponent;