export async function getAnswer() {
  const res = await fetch("http://localhost:8000/ninja");
  const answer = await res.json();
//   console.log(typeof answer);
//   console.log(`answer : ${answer}`);
  return (answer);
}