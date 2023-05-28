import {memo} from "react";
import { Link } from 'react-router-dom';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Navigation({language}) {

  const cn = bem('Navigation');

  return (
    <div className={cn()}>
      <Link to='/' className={cn('link')}>
        <div>{language?.mainPage}</div>
      </Link>
    </div>
  );
}

export default memo(Navigation);