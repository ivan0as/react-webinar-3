import { memo } from 'react';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Loading() {

  const cn = bem('Loading');

  return (
    <div className={cn()}><div></div><div></div><div></div><div></div></div>
  );
}

export default memo(Loading);
