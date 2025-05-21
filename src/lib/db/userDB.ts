// liveblocks useSelf() hook result
// {
//   "connectionId": 3,
//   "id": "mislav.abha@example.com",
//   "info": {
//       "name": "Mislav",
//       "color": "#F08385",
//       "avatar": "https://liveblocks.io/avatars/avatar-2.png"
//   },
//   "presence": {
//       "__yjs_clientid": 2344943196,
//       "selectedNodes": []
//   },
//   "canWrite": true,
//   "canComment": true
// }

const USER_INFO: {
  id: string, verified: boolean,
}[] = [
  {
    id: "charlie.layne@example.com",
    verified: true,
  },
  {
    id: "mislav.abha@example.com",
    verified: true,
  },
  {
    id: "tatum.paolo@example.com",
    verified: true,
  },
  {
    id: "anjali.wanda@example.com",
    verified: false,
  },
  {
    id: "jody.hekla@example.com",
    verified: true,
  },
]

export function getRandomUser() {
  return USER_INFO[Math.floor(Math.random() * 10) % USER_INFO.length];
}

export function getUser(id: string) {
  return USER_INFO.find((u) => u.id === id) || null;
}

export function getUsers() {
  return USER_INFO;
}