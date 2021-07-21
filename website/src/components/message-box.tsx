import * as React from 'react';
import './message-box.css';

export interface MessageBoxProps {}
export interface MessageBoxState {}
 
class MessageBox extends React.Component<MessageBoxProps, MessageBoxState> {
  render() { 
    return (
      <div className="message-box">
        <textarea className="color-normal appearance-none rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none" />
        <div className="message-box-footer"></div>
      </div>
    );
  }
}
 
export default MessageBox;