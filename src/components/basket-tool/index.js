import {memo} from "react";
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural} from "../../utils";
import './style.css';

function BasketTool({sum, amount, onOpen, language}) {
  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
      <Link to='/' className={cn('link')}>
        <div>{language.mainPage}</div>
      </Link>
      <div>
        <span className={cn('label')}>{language.inBasket}:</span>
        <span className={cn('total')}>
          {amount
            ? `${amount} ${plural(amount, {one:language.oneGood, few:language.fewGood, many:language.manyGood})} / ${numberFormat(sum)} ₽`
            : language.empty
          }
        </span>
        <button onClick={onOpen}>{language.going}</button>
      </div>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0
}

export default memo(BasketTool);
