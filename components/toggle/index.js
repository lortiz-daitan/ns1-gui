import PropTypes from 'prop-types';
import React from 'react';
import _ from 'lodash';
import Tooltip from './tooltip';

export default class Toggle extends React.Component{
  static propTypes = {
    /* eslint-disable react/no-deprecated */
    label: PropTypes.string.isRequired,
    checked: PropTypes.bool,
    onChange: PropTypes.func,
    key: PropTypes.string,
    value: PropTypes.string,
    inline: PropTypes.bool,
    style: PropTypes.object,
    labelFirst: PropTypes.bool,
    className: PropTypes.string,
    passKey: PropTypes.string,
    tooltip: PropTypes.string.isRequired
  }
  constructor(props) {
    super(props);

    // unsure if using state for this is ok? i needed a
    // uniqueId mostly for htmlFor label reasons
    this.state = {
      id: _.uniqueId('toggle-')
    };
  }
  render() {
    const {label, checked, onChange, inline, style, className} = this.props;
    const id = this.state.id;
    return <label
      style={style}
      key={this.props.passKey}
      className={`toggle-label ${inline && 'inline'} ${className || ''}`}>
      {this.props.tooltip ?
        this.props.labelFirst && <Tooltip content={this.props.tooltip} direction="top">
          <span dangerouslySetInnerHTML={{__html: label}}></span>
        </Tooltip> :
        this.props.labelFirst && <span dangerouslySetInnerHTML={{__html: label}}></span>
      }
      <input
        {...Object.keys(this.props).reduce((acc, prop) => {
          return prop.indexOf('data-') > -1 ?
            Object.assign({}, acc, {[prop]: this.props[prop]}) :
            acc;
        }, {})}
        type="checkbox"
        id={id}
        className="cbx hidden"
        checked={checked || false}
        onChange={onChange}  />
      <label className='inner-lbl' htmlFor={id}></label>
      {this.props.tooltip ?
        this.props.labelFirst === false &&
          <Tooltip content={this.props.tooltip} direction="top">
            <span dangerouslySetInnerHTML={{__html: label}}></span>
          </Tooltip> :
        !this.props.labelFirst && <span dangerouslySetInnerHTML={{__html: label}}></span>
      }
    </label>;
  }
}
