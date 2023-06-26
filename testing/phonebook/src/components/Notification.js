function Notification({ notification }) {
  if (!notification.message) return null;

  const style = {
    color: notification.status === 'error' ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  return (
    <div style={style}>
      {notification.message}
    </div>
  );
}

export default Notification;
