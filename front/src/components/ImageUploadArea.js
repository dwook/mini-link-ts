import React, { useState, useRef, forwardRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Upload from '../icons/Upload';
import Delete from '../icons/Delete';
import CircleButton from './CircleButton';

const StyledImageUploadArea = styled.div`
  height: 200px;
  margin: 0 20px 20px;
  background-color: ${(props) => props.theme.color.gray};
  background-image: url(${(props) => props.image});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
  border-radius: 6px;
  display: flex;
  overflow: hidden;
  .title {
    font-weight: bold;
    padding: 8px 0;
  }
`;

const ButtonContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;
`;

const ButtonList = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  ${ButtonContainer} {
    background: ${(props) => props.theme.color.primary};
    height: 50px;
    width: 50px;
    border-radius: 50%;
    margin: 4px 4px 6px;
    color: #fff;
    svg {
      width: 30px;
      height: 30px;
    }
  }
`;

const ImageUploadArea = forwardRef(({ name, exImageURL }, ref) => {
  const imageInput = useRef();
  const [imageURL, setImageURL] = useState(exImageURL);

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);
  const onClickImageDelete = useCallback(() => {
    setImageURL(null);
  }, [imageURL]);
  const onChangeImage = useCallback(async (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageURL(e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  }, []);

  return (
    <StyledImageUploadArea image={imageURL}>
      <input
        type="file"
        name={name}
        multiple
        hidden
        ref={(element) => {
          imageInput.current = element;
          ref(element);
        }}
        onChange={onChangeImage}
      />
      {imageURL && (
        <ButtonList>
          <CircleButton
            primary
            icon={<Upload />}
            onClick={onClickImageUpload}
          />
          <CircleButton
            primary
            icon={<Delete />}
            onClick={onClickImageDelete}
          />
        </ButtonList>
      )}
      {!imageURL && (
        <ButtonContainer onClick={onClickImageUpload}>
          <Upload />
          <div className="title">이미지 업로드</div>
          <div>파일을 선택하여 업로드해주세요.</div>
        </ButtonContainer>
      )}
    </StyledImageUploadArea>
  );
});

ImageUploadArea.propTypes = {
  name: PropTypes.string,
  exImageURL: PropTypes.string,
};

ImageUploadArea.defaultProps = {
  name: '',
  exImageURL: '',
};

export default ImageUploadArea;
