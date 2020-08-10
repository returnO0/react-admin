import React from 'react'
import './link-button.less'

/**
 * 外形想链接的按钮
 * @param props
 * @returns {*}
 * @constructor
 */
export default function LinkButton(props) {
    return <button {...props} className="link-button"/>
};
