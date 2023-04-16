import styled from 'styled-components'

const Wrapper = styled.article`
  .messages-container {
    width: 58%;
    height: 675px;
    background: var(--grey-100);
    position: relative;
    float: right;
    box-shadow: 0px 4px 10px 0px rgba(204, 204, 204, 0.62);
  }

  .chat {
    width: 100%;
    max-width: 800px;
    height: calc(100vh - 50px);
    min-height: 100%;
    padding: 15px 30px;
    margin: 0 auto;
    overflow-y: scroll;
    background-color: #fff;
    transform: rotate(180deg);
    direction: rtl;
    &__wrapper {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      -ms-flex-direction: column-reverse;
      flex-direction: column-reverse;
      -webkit-box-pack: end;
      -ms-flex-pack: end;
      justify-content: flex-end;
    }
    &__message {
      font-size: 18px;
      padding: 10px 20px;
      border-radius: 25px;
      color: #000;
      background-color: #e6e7ec;
      max-width: 500px;
      width: -webkit-fit-content;
      width: -moz-fit-content;
      width: fit-content;
      position: relative;
      margin: 15px 0;
      word-break: break-all;
      transform: rotate(180deg);
      direction: ltr;
      &:after {
        content: '';
        width: 20px;
        height: 12px;
        display: block;
        background-image: url('https://stageviewcincyshakes.firebaseapp.com/icon-gray-message.e6296433d6a72d473ed4.png');
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
        position: absolute;
        bottom: -2px;
        left: -5px;
      }
      &-own {
        color: #fff;
        margin-left: auto;
        background-color: #00a9de;
        &:after {
          width: 19px;
          height: 13px;
          left: inherit;
          right: -5px;
          background-image: url('https://stageviewcincyshakes.firebaseapp.com/icon-blue-message.2be55af0d98ee2864e29.png');
        }
      }
    }
  }

  .chat__form {
    background-color: #e0e0e0;
    form {
      max-width: 800px;
      margin: 0 auto;
      height: 50px;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
    }
    input {
      height: 40px;
      font-size: 16px;
      min-width: 90%;
      padding-left: 15px;
      background-color: #fff;
      border-radius: 15px;
      border: none;
    }
    button {
      width: 10%;
      height: 100%;
      font-size: 16px;
      background-color: transparent;
      border: none;
      text-align: center;
      text-transform: uppercase;
      cursor: pointer;
      &:hover {
        font-weight: bold;
      }
    }
  }
`

export default Wrapper
