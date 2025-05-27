const USER_INFO: {
  id: string, verified: boolean, role: string,
}[] = [
  {
    id: "charlie.layne@example.com",
    verified: true,
    role: "admin"
  },
  {
    id: "mislav.abha@example.com",
    verified: true,
    role: "editor"
  },
  {
    id: "tatum.paolo@example.com",
    verified: true,
    role: "editor"
  },
  {
    id: "anjali.wanda@example.com",
    verified: false,
    role: "editor"
  },
  {
    id: "jody.hekla@example.com",
    verified: true,
    role: "editor"
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