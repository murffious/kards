import React from 'react';

// Import module and default styles
import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

// Import custom examples
// import StyledProgressbar from './StyledProgressbar';

function Label(props) {
  return <div style={{ marginTop: 25, marginBottom: 5 }}>{props.children}</div>;
}
const percentage = 44;

export const Progressbar = (props) => (
  <div>
    <Label>Basic example</Label>
    <div style={{ width: '100px' }}>
      <CircularProgressbar percentage={percentage} text={`${percentage}%`} />
    </div>
  </div>
)