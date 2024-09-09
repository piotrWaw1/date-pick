import Header from "@/components/header/header.tsx";
import SelectDates from "@/components/select-dates/select-dates.tsx";
import Output from "@/components/output/output.tsx";

function App() {
  return (
    <>
      <Header/>
      <div className="container m-auto grid md:grid-cols-3 gap-10 mt-5">
        <div className=" p-3">
          <SelectDates/>
        </div>
        <div className="p-3 col-span-2">
          <Output/>
        </div>
      </div>
    </>
  )
}

export default App
