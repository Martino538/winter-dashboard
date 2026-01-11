import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../util/http";

export default function TopActivity() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["TopActivity"],
    queryFn: fetchData,
  });

  const [TopActivity, setTopActivity] = useState("");

  useEffect(() => {
    if (!data) return;

    const activityCounts = {};

    for (let item of data) {
      const activity = item.Activity;
      if (!activity) continue;
      if (!activityCounts[activity]) {
        activityCounts[activity] = 1;
      } else {
        activityCounts[activity]++;
      }
    }

    let winner = "N/A";
    let highestCount = 0;

    for (let activity in activityCounts) {
      if (activityCounts[activity] > highestCount) {
        highestCount = activityCounts[activity];
        winner = activity;
      }
    }

    setTopActivity(winner);
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="counter-graph topActivity">
      <h1>{TopActivity}</h1>
      <p>Favoriete Activiteit</p>
    </div>
  );
}
