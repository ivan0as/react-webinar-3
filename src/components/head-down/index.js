import {memo} from "react";
import PropTypes from "prop-types";
import './style.css';

function HeadDown({children}){
    return (
        <div className='HeadDown'>
            {children}
        </div>
    )
}

HeadDown.propTypes = {
    children: PropTypes.node
};

export default memo(HeadDown);
