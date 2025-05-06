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
  info: any
}[] = [
  {
    id: "charlie.layne@example.com",
    info: {
      name: "Charlie",
      color: "#D583F0",
      avatar: "https://liveblocks.io/avatars/avatar-1.png",
    },
    verified: true,
  },
  {
    id: "mislav.abha@example.com",
    info: {
      name: "Mislav",
      color: "#F08385",
      avatar: "https://liveblocks.io/avatars/avatar-2.png",
    },
    verified: true,
  },
  {
    id: "tatum.paolo@example.com",
    info: {
      name: "Tatum",
      color: "#F0D885",
      avatar: "https://liveblocks.io/avatars/avatar-3.png",
    },
    verified: true,
  },
  {
    id: "anjali.wanda@example.com",
    info: {
      name: "Anjali",
      color: "#85EED6",
      avatar: "https://liveblocks.io/avatars/avatar-4.png",
    },
    verified: false,
  },
  {
    id: "jody.hekla@example.com",
    info: {
      name: "Jody",
      color: "#85BBF0",
      avatar: "https://liveblocks.io/avatars/avatar-5.png",
    },
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