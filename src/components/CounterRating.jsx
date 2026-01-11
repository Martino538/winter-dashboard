import { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { CountUp } from "countup.js";
import { fetchData } from "../util/http";

export default function CounterRating() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["counterRating"],
    queryFn: fetchData,
  });

  const counterRef = useRef(null);

  useEffect(() => {
    if (!data || !counterRef.current) return;

    let ratingTotal = 0;
    let ratingCount = 0;

    for (let item of data) {
      const rating = Number(item.Rating);

      if (!isNaN(rating)) {
        ratingTotal += rating;
        ratingCount++;
      }
    }

    let averageRating = 0;
    if (ratingCount > 0) {
      averageRating = (ratingTotal / ratingCount).toFixed(2);
    }

    const countUp = new CountUp(counterRef.current, averageRating, {
      duration: 2,
      separator: ".",
      decimalPlaces: 2,
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
      <div className="image">
        <img src="http://localhost:3001/gold_star.svg" alt="star icon" />
        <h1><span ref={counterRef}>0</span>/5</h1>
      </div>
      <p>Gem. Rating</p>
    </div>
  );
}
