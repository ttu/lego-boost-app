import * as React from 'react';
import { LegoBoost } from './boost/legoBoost';


interface IProps {
  boost: LegoBoost
}

class ManualControl extends React.Component<IProps> {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="ManualControl">
        ManualControl
      </div>
    );
  }
}

export default ManualControl
