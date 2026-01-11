import { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { CountUp } from "countup.js";
import { fetchData } from "../util/http";

export default function CounterTrips() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["counterTrips"],
    queryFn: fetchData,
  });

  const counterRef = useRef(null);

  useEffect(() => {
    if (!data || !counterRef.current) return;

    const voteAmount = data.length;

    const countUp = new CountUp(counterRef.current, voteAmount, {
      duration: 2,
      separator: ".",
    });

    if (!countUp.error) {
      countUp.start();
    } else {
      console.error("CountUp error:", countUp.error);
    }
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="counter-graph">
      <h1 ref={counterRef}>0</h1>
      <p>Aantal trips</p>
    </div>
  );
}
