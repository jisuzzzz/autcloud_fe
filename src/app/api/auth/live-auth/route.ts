import { Liveblocks } from "@liveblocks/node";
import { NextRequest } from "next/server";
import { getRandomUser } from "@/lib/db/userDB";

type User = {
  id: string
  role: string
}

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY!,
})

export async function POST(request: NextRequest) {
  const user = getRandomUser() as User;

  const project_id = "37bfb83b-dd64-410b-81c5-7374b0c453e0"
  const role = "admin"
  const roomPrefix = `project-${project_id}`

  // const { proejct_id, user_email, role } = await getUserProjectRole()
  const userIdx = Math.floor(Math.random() * COLORS.length)

  const session = liveblocks.prepareSession(`${user.id}`, {
    userInfo: {
      id: user.id,
      name: NAMES[userIdx%5],
      avatar: `https://liveblocks.io/avatars/avatar-${userIdx+1}.png`,
      color: COLORS[userIdx],
      role: role
    },
  })
  // if(role === 'admin') {
  //   session.allow(`${roomPrefix}:*`, session.FULL_ACCESS)
  // } else if(role === 'editor') {
  //   session.allow(`${roomPrefix}:*`, session.FULL_ACCESS)
  // } else if (role === 'viewer') {
  //   session.allow(`${roomPrefix}:*`, session.READ_ACCESS)
  // }

  session.allow(`*`, session.FULL_ACCESS)

  const { body, status } = await session.authorize()
  return new Response(body, { status })
}

const COLORS = ["#D583F0", "#F08385", "#F0D885", "#85EED6", "#85BBF0", "#8594F0", "#85DBF0"]
const NAMES = ["Charlie", "Mislav", "Tatum", "Anjali", "Jody"]