import React from 'react'
import { getUserId } from '../../lib/auth'
import { getUserData } from '../../lib/api'

function Dashboard() {
  const [userId, setUserId] = React.useState(null)
  const [userData, setUserData] = React.useState(null)


  React.useEffect(() => {
    const getData = async () => {
      try {
        setUserId(getUserId)
        const res = await getUserData(userId)
        console.log(res.data)
        setUserData(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [userId])

  console.log(userData)

  return (
    <>
      <h1>Welcome to your Dashboard</h1>
      {userData && userData.role === 'INS' ? <h2>Hi Instructor</h2> : <h2>Hi Learner</h2>}
      <img src={userData && userData.profileImage} alt='profile' />
    </>
  )
}

export default Dashboard