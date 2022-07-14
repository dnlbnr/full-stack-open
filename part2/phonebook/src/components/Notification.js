const Notification = ({ message, success, error }) => {
  return (
    <div className={success ? 'success' : error ? 'error' : 'default'}>
      {message}
    </div>
  );
};

export default Notification;
