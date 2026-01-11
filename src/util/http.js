export async function fetchData() {
  const res = await fetch("http://localhost:3001/api/data");
    return await res.json();
}