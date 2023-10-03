export async function getAnswer() {
  const res = await fetch("http://localhost:8000/ninja");
  const answer = await res.json();
//   console.log(typeof answer);
//   console.log(`answer : ${answer}`);
  return (answer);
}

export async function login(request) {
  const res = await fetch("http://localhost:8000/chat/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  }).catch((e) => console.log(e));
  const userAccount = await res.json();
  return userAccount;
}

export async function getAllRoom(request) {
  const res = await fetch("http://localhost:8000/chat/room", {
    method: "GET",
    headers: {
      "user_id": request,
    },
  }).catch((e) => console.log(e));
  const allRoom = await res.json();
  return allRoom;
}

export async function getAllChatByRoomId(request) {
  const res = await fetch("http://localhost:8000/chat/getchat", {
    method: "GET",
    headers: {
      room_id: request,
    },
  }).catch((e) => console.log(e));
  const allRoom = await res.json();
  return allRoom;
}

export async function addChatAPI(request) {
  const res = await fetch("http://localhost:8000/chat/addchat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  }).catch((e) => console.log(e));
  const userAccount = await res.json();
  return userAccount;
}