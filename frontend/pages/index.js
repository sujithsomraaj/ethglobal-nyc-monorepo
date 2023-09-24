import Jumbotron from "@/components/Jumbotron";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main>
      <div className='container mx-auto mt-5 font-sans'>
          <Navbar />
          <Jumbotron />
      </div>
    </main>
  )
}
