import * as React from 'react';
import { Message, Icon } from 'semantic-ui-react';

interface IMessageContent {
  visible: boolean;
  header?: string;
  content: string;
  infoToggle: () => void;
}

const MessageBlock = ({ visible, header, content, infoToggle }: IMessageContent) => {
  return visible ? (
    <Message info onDismiss={infoToggle} header={header} content={content} />
  ) : (
    <Icon color="blue" className="dismissed-info" name="info circle" onClick={infoToggle} />
  );
};

export default MessageBlock;
