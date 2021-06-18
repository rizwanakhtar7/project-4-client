import React from 'react'
import { getUserId } from '../../lib/auth'
import { getUserData } from '../../lib/api'

function Dashboard() {
  const [userId, setUserId] = React.useState(null)
  const [userRole, setUserRole] = React.useState(null)


  React.useEffect(() => {
    const getData = async () => {
      try {
        setUserId(getUserId)
        const res = await getUserData(userId)
        setUserRole(res.data.role)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [userId])

  console.log(userId)
  console.log(userRole)

  return (
    <>
      <h1>Welcome to your Dashboard</h1>
      {userRole === 'INS' ? <h2>Hi Instructor</h2> : <h2>Hi Learner</h2>}
    </>
  )
}

export default Dashboard