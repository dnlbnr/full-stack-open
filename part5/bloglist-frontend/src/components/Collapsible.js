import { forwardRef, useState, useImperativeHandle } from 'react';

const Collapsible = forwardRef((props, ref) => {
  const { text } = props;
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => ({ toggleVisible }));

  return (
    <div>
      <div><button type="button" onClick={toggleVisible}>{visible ? `collapse ${text}` : text}</button></div>
      <div>{visible && props.children}</div>
    </div>
  );
});

export default Collapsible;
