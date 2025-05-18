export default async function Home() {
  const response = await fetch("http://localhost:8000/");
  const data = await response.json();

  console.log(data);
  return <div>{data.message}</div>;
}
