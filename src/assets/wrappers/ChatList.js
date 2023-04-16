import styled from 'styled-components'

const Wrapper = styled.main`
  //*** Common variables  ***//
  $white-color: '#ffffff';
  $gray-color: #ececec;
  $deep-gray-color: #cccccc;
  $light-gray-color: #f5f5f5;
  $primary-color: #6747cd;
  $text-color: #666666;
  $success-color: #4caf50;
  $danger-color: #f05050;
  $border-color: #bbbbbb;

  // Common container mixin functions
  @mixin hover-style($color, $bg-color) {
    cursor: pointer;
    &:hover {
      color: $color;
      background: $bg-color;
    }
  }

  @mixin custom-scrollBar(
    $scrollBar-height: 430px,
    $bar-color: $deep-gray-color
  ) {
    .custom-scrollBar {
      width: 495px;
      max-height: $scrollBar-height;
      overflow: hidden;

      div:first-of-type {
        width: 470px;
      }

      &:hover {
        overflow-y: auto;
      }
    }

    .custom-scrollBar::-webkit-scrollbar {
      width: 6px;
    }

    .custom-scrollBar::-webkit-scrollbar-thumb {
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      background-color: $gray-color;
      &:hover {
        background-color: $bar-color;
      }
    }
  }
  /*** Common SCSS ***/
  html,
  body {
    font-family: 'Hind', sans-serif;
    background: $gray-color;
    color: '#333333';
  }

  a:action,
  a:focus,
  a:hover {
    text-decoration: none;
  }

  .table-content {
    display: table;
    width: 100%;
    margin: 0;

    .table-content-cell {
      display: table-cell;
      vertical-align: middle;
    }
  }

  .icon {
    font-size: 24px;
  }

  // project style
  .container {
    width: 100%;
    padding: 10px 0;
    background: var(--white);
    border-radius: var(--borderRadius);
  }

  .notification-container {
    width: 40%;
    height: 675px;
    background: var(--grey-100);
    position: relative;
    float: left;
    box-shadow: 0px 4px 10px 0px rgba(204, 204, 204, 0.62);

    // Notification header style
    .notification-list-header {
      background: var(--white);
      padding: 12px 30px;
      box-shadow: 0px 4px 10px 0px rgba(204, 204, 204, 0.62);

      .arrow-icon {
        width: 30px;
        .icon {
          font-size: xx-large;
          font-weight: bold;
          cursor: pointer;
          padding-top: 2px;
          @include hover-style($text-color, 'transparent');
        }
      }

      .notification-title {
        font-size: 22px;
        text-align: center;
      }

      .search-form {
        position: relative;
        text-align: right;
        width: 30px;
        cursor: pointer;

        form {
          margin: 0;
        }

        .icon {
          @include hover-style($text-color, 'transparent');
        }
      }

      input[type='text'] {
        height: 30px;
        width: 0px;
        font-size: 18px;
        padding: 0;
        margin: 0;
        position: absolute;
        top: 5px;
        right: 25px;
        border: 0;
        border-radius: 0;
        box-shadow: none;
        transition: width 0.4s cubic-bezier(0, 0.795, 0, 1);
      }

      .search-form:hover input[type='text'],
      input[type='text']:focus {
        width: 385px;
        z-index: 1;
        padding-right: 25px;
        border-bottom: 1px solid $border-color;
        cursor: text;
        box-shadow: none;
      }
    }

    // Notification option style
    .notification-option {
      padding: 25px 20px 20px;
      color: #a8a2a2;

      .table-content-cell:first-child {
        font-size: 18px;
      }

      .remove-icon {
        cursor: pointer;
        margin-right: 25px;
        opacity: 0.7;
        @include hover-style($danger-color, 'transparent');
      }

      .check-icon {
        cursor: pointer;
        opacity: 0.7;
        @include hover-style($success-color, 'transparent');
      }
    }

    // Notification list box
    .notification-list-box {
      .list-group {
        margin: auto 15px;
        box-shadow: 0px 4px 8px 0px #d8d4d4;

        .table-content-cell:nth-child(2) {
          width: 75px;
          text-align: right;
        }

        .list-group-item {
          border-radius: 0px;
          padding: 20px 25px;
          overflow: hidden;
          margin-bottom: -1px;

          .media-heading {
            color: $text-color;
          }

          &.unread {
            background: $light-gray-color;
            font-weight: bold;

            .media-heading {
              color: '#333333';
              font-weight: inherit;
            }
          }
        }

        .media {
          width: 82%;
        }

        .media-left {
          padding-right: 15px;

          img {
            width: 50px;
            height: 50px;
            max-width: 50px;
          }

          .text-media-object {
            background: #6747cd;
            width: 50px;
            height: 50px;
            border-radius: 100%;
            text-align: center;
            line-height: 35px;
            color: $white-color;
            font-weight: bold;
            padding: 10px;
            font-size: 18px;
          }
        }

        .media-body {
          padding-top: 7px;

          .notification-location {
            color: #a2a2a2;
          }
        }

        .notification-time {
          color: $deep-gray-color;
        }

        .list-remove-btn {
          position: absolute;
          right: -110px;
          width: 100px;
          top: 0;
          background: $danger-color;
          padding: 35px 0;
          text-align: center;
          font-size: 16px;
          color: $white-color;
          transition: 500ms cubic-bezier(0.58, 0.54, 0.41, 1.38);
        }
      }
    }
  }

  /*** Default scrolling customize style ***/
  @include custom-scrollBar(
    $scrollBar-height: 500px,
    $bar-color: $deep-gray-color
  );
`

export default Wrapper
