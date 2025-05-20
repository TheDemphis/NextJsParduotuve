import { LuUser } from 'react-icons/lu'
import { currentUser } from '@clerk/nextjs/server'

async function UserIcon() {
  const user = await currentUser()
  const profileImg = user?.imageUrl
  if (user) {
    return (
      <img
        className="h-6 w-6 object-cover rounded"
        src={profileImg}
        alt="Profilio nuotrauka"
      />
    )
  }
  return <LuUser className="h-6 w-6 object-cover rounded bg-primary" />
}
export default UserIcon
