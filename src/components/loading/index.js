import { memo } from 'react';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Loading() {

  const cn = bem('Loading');

  return (
    <div className={cn()}>
      <span className={cn('loader')}></span>
    </div>
  );
}

export default memo(Loading);
