import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CounterTrips from "./components/CounterTrips";
import CounterRating from "./components/CounterRating";
import Header from "./components/Header";
import ParticlesBackground from "./components/ParticlesBackground";
import TopCountry from "./components/TopCountry";
import TopActivity from "./components/TopActivity";
import CountAverageCost from "./components/CountAverageCost";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ParticlesBackground />
      <Header />
      <section id="cards-section">
        <article>
          <CounterTrips />
        </article>
        <article>
          <CountAverageCost />
        </article>
        <article>
          <CounterRating />
        </article>
        <article>
          <TopCountry />
        </article>
        <article>
          <TopActivity />
        </article>
      </section>
    </QueryClientProvider>
  );
}

export default App;
