import { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { CountUp } from "countup.js";
import { fetchData } from "../util/http";

export default function CountAverageCost() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["CountAverageCost"],
    queryFn: fetchData,
  });

  const counterRef = useRef(null);

  useEffect(() => {
    if (!data || !counterRef.current) return;

    const tripAmount = data.length;
    const totalCost = data.reduce((sum, item) => {
      const cost = Number(item["Avg_Cost(USD)"]);
      if (isNaN(cost)) return sum; // sla lege / ongeldige waarden over
      return sum + cost;
    }, 0);

    const averageCost = (totalCost / tripAmount).toFixed(2);

    const countUp = new CountUp(counterRef.current, averageCost, {
      duration: 2,
      separator: ".",
      decimalPlaces: 2,
      prefix: "€",
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
      <p>Gem. kosten per trip</p>
    </div>
  );
}
