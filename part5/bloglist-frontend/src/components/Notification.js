function Notification({ text, success, error }) {
  const getType = () => {
    if (success) {
      return 'success';
    }
    if (error) {
      return 'error';
    }
    return '';
  };

  return <div className={`notification ${getType()}`}><h1>{text}</h1></div>;
}

export default Notification;
