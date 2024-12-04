import { Hero } from "../components/Hero"
import { Results } from "../components/Results"

export function Home() {
  return (
    <main id="content">
      <Hero />
      <Results select='all' />
    </main>
  )
}
