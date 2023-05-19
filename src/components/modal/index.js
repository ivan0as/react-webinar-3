import React from "react";
import PropTypes from "prop-types";
import './style.css';

function Modal({children, setModalVisible, title}){
  return (
    <>
        <div className='overlay'></div>
        <div className='modal'>
            <div className='modal-up'>
                <h2>{title}</h2>
                <button onClick={() => setModalVisible(false)}>Закрыть</button>
            </div>
            <div className='modal-children'>
                {children}
            </div>
        </div>
    </>
  )
}

Modal.propTypes = {
  children: PropTypes.node,
  title: PropTypes.node,
  setModalVisible: PropTypes.func
}

Modal.defaultProps = {
  setModalVisible: () => {}
}

export default React.memo(Modal);