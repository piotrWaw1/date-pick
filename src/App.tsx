import Header from "@/components/header/header.tsx";
import SelectDates from "@/components/select-dates/select-dates.tsx";
import Output from "@/components/output/output.tsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

function App() {
  return (
    <>
      <Header/>
      <div className="container m-auto grid xl:grid-cols-3 gap-10 mt-5">
        <div className="p-3 flex justify-center xl:col-span-1 col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Wybierz zakres dat</CardTitle>
              <CardDescription>Wypełnij cały formularz a dane zostaną wyświetlone w tabelce obok.</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <SelectDates/>
            </CardContent>
          </Card>
        </div>
        <div className="p-3 col-span-2 overflow-x-auto">
          <Output/>
        </div>
      </div>
    </>
  )
}

export default App
