import {memo} from "react";
import PropTypes from "prop-types";
import './style.css';

function Head({title, languageSwitcher, languageSwitcherTitle}){

  const callbacks = {
    languageSwitcher: () => languageSwitcher()
  }

  return (
    <div className='Head'>
      <h1>{title}</h1>
      <button onClick={callbacks.languageSwitcher}>{languageSwitcherTitle}</button>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
};

Head.defaultProps = {
  languageSwitcher: () => {},
};

export default memo(Head);
