const Notification = ({ message, status }) => {
    if (message === null) return null
  
    let style = {
      color: 'green',
      background: 'lightgrey',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
    }

    switch (status) {
      case 'error':
        style.color = 'red'
        break;
      default:
        style.color = 'green'
    }
    
    return (
      <div style={style}>
        {message}
      </div>
    )
}

export default Notification