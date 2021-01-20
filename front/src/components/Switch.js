import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SwitchInput = styled.div`
  background-color: transparent;
  box-sizing: border-box;
  display: flex;
  flex: 0 0 auto;
  height: 48px;
  margin: 0 0 10px;
  overflow: hidden;
  padding: 0;
  position: relative;
  width: 84px;

  label {
    cursor: pointer;
    width: 100%;
  }

  input {
    opacity: 0;

    &:checked {
      ~ .container {
        background: ${(props) => props.theme.color.primary};

        &:before {
          opacity: 0;
          transform: translateX(200%);
        }

        &:after {
          opacity: 1;
          transform: translateX(0);
        }
      }

      ~ .circle {
        transform: translateX(36px);
      }
    }
  }

  .container {
    background-color: #e5e5e5;
    border-radius: 50px;
    box-sizing: border-box;
    display: block;
    flex: 0 0 auto;
    height: 48px;
    margin: 0;
    position: absolute;
    top: 0;
    width: 84px;
  }

  .circle {
    background-color: #fff;
    border-radius: 50%;
    display: block;
    height: 44px;
    width: 44px;
    margin: 2px;
    padding: 0;
    position: absolute;
    top: 0;
    transition: all 0.2s ease-in-out;
    transition-property: transform;
    box-shadow: rgba(50, 50, 93, 0.2) 0px 0px 0px 1px,
      rgba(50, 50, 93, 0.1) 0px 2px 5px 0px, rgba(0, 0, 0, 0.1) 0px 1px 1px 0px;
  }
`;

const Switch = forwardRef(({ name }, ref) => (
  <SwitchInput className="switch">
    <label htmlFor={name}>
      <input name={name} type="checkbox" role="switch" id={name} ref={ref} />
      <span className="container" />
      <span className="circle" />
    </label>
  </SwitchInput>
));

Switch.propTypes = {
  name: PropTypes.string,
};

Switch.defaultProps = {
  name: '',
};

export default Switch;
