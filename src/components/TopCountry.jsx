import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../util/http";

export default function TopCountry() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["TopCountry"],
    queryFn: fetchData,
  });

  const [topDestination, setTopDestination] = useState("N/A");

  useEffect(() => {
    if (!data) return;

    const destinationCounts = {};

    for (let item of data) {
      const dest = item.Destination;
      if (!dest) continue;

      if (!destinationCounts[dest]) {
        destinationCounts[dest] = 1;
      } else {
        destinationCounts[dest]++;
      }
    }

    let winner = "N/A";
    let highestCount = 0;

    for (let dest in destinationCounts) {
      if (destinationCounts[dest] > highestCount) {
        highestCount = destinationCounts[dest];
        winner = dest;
      }
    }

    setTopDestination(winner);
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="counter-graph topCountry">
      <h1>{topDestination}</h1>
      <p>Meest bezochte land</p>
    </div>
  );
}
