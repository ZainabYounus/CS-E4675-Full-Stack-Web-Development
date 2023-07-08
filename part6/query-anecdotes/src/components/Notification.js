import NotificationContext, { useNotification } from '../NotificationContext'

const Notification = () => {
  const notification = useNotification(NotificationContext)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification

// const Notification = () => {
//   const style = {
//     border: 'solid',
//     padding: 10,
//     borderWidth: 1,
//     marginBottom: 5
//   }
  
//   if (true) return null

//   return (
//     <div style={style}>
      
//     </div>
//   )
// }

// export default Notification
