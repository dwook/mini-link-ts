import styled from 'styled-components';

const Row = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 0 20px;
`;

const Input = styled.input`
  height: 48px;
  padding: 8px 10px;
  color: #333;
  border: 0px;
  border-radius: 6px;
  font-size: 14px;
  background: rgb(255, 255, 255);
  box-shadow: rgba(50, 50, 93, 0.2) 0px 0px 0px 1px,
    rgba(50, 50, 93, 0.1) 0px 2px 5px 0px, rgba(0, 0, 0, 0.1) 0px 1px 1px 0px;
  transition: box-shadow 0.08s ease-in 0s, color 0.08s ease-in 0s,
    -webkit-box-shadow 0.08s ease-in 0s;
  -webkit-appearance: none;

  &:focus {
    outline: none;
    -webkit-box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1),
      0 1px 1px 0 rgba(0, 0, 0, 0.05), 0 0 0 4px rgba(0, 0, 0, 0.1);
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1), 0 1px 1px 0 rgba(0, 0, 0, 0.05),
      0 0 0 4px rgba(0, 0, 0, 0.1);
  }
`;

const Label = styled.label`
  width: 100%;
  padding: 10px 0;
  ${(props) => {
    if (props.required) {
      return `
        &:after {
          content:'*';
          margin-left: 3px;
        }
    `;
    }
  }}
`;

const Message = styled.div`
  height: 14px;
  margin: 10px 5px 5px;
  font-size: 12px;
`;

const Error = styled.span`
  color: ${(props) => props.theme.color.primary};
`;

const Info = styled.span`
  color: ${(props) => props.theme.color.green};
`;

export { Row, Input, Label, Message, Error, Info };
