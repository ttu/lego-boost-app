import * as React from 'react'
import { Message } from 'semantic-ui-react'

interface IMessageContent {
    visible: boolean;
    onClose: () => void;
    header?: string;
    content: string;
}
class MessageBlock extends React.Component<IMessageContent> {
  handleDismiss = () => {
    this.props.onClose();
  }

  render() {
    if (this.props.visible) {
      return (
        <Message
          onDismiss={this.handleDismiss}
          header={this.props.header}
          content={this.props.content}
        />
      )
    }

    return (null);
  }
}

export default MessageBlock