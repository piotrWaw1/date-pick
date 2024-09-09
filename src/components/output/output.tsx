import { ReactNode, useContext } from "react";
import { v4 as uuidv4 } from 'uuid';
import { DayFormContext } from "@/context/day-form.tsx";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table.tsx";
import { dayCheckers, DAYSPL } from "@/util/days-fo-week.ts";
import { Button } from "@/components/ui/button.tsx";
import { format } from "date-fns";
import { ClipboardCopy, ClipboardList } from "lucide-react";
import { useToast } from "@/hooks/use-toast.ts";
import { cn } from "@/lib/utils.ts";

const Output = () => {
  const { finalData, validDates } = useContext(DayFormContext)
  const { toast } = useToast()

  const copyDay = async (day: string) => {
    await navigator.clipboard.writeText(day)
    toast({
      title: "Skopiowano do schowka",
      description: `Data: ${day} została pomyślnie skopiowana`
    })
  }

  const copyWeek = async (days: string[]) => {
    await navigator.clipboard.writeText(days.join(", "))
    toast({
      title: "Skopiowano do schowka",
      description: `Tydzień została pomyślnie skopiowany`
    })
  }

  const copyAll = async () => {
    if (validDates) {
      await navigator.clipboard.writeText(validDates?.map(day => format(day, "dd/MM/yyyy")).join(", "))
      toast({
        title: "Wszystkie daty skopiowano do schowka",
        description: `Wszystkie daty zostały pomyślnie skopiowane`
      })
    }
  }

  const tableCell = (week: Date[]): ReactNode[] => {
    let weekIndex = 0
    const result = []
    for (let [_, checkDay] of Object.entries(dayCheckers)) {
      if (checkDay(week[weekIndex])) {
        const day = format(week[weekIndex], "dd/MM/yyyy")
        result.push(
          <TableCell
            className="font-medium border-r-2 cursor-pointer"
            key={uuidv4()}
            onClick={() => copyDay(day)}
          >
            {day}
          </TableCell>)
        weekIndex += 1
      } else {
        result.push(<TableCell className="font-medium border-r-2" key={uuidv4()}></TableCell>)
      }
    }
    result.push(
      <TableCell
        className="font-medium text-center"
        onClick={() => copyWeek(week.map(day => format(day, "dd/MM/yyyy")))}
        key={uuidv4()}
      >
        <Button size={"icon"}>
          <ClipboardCopy/>
        </Button>
      </TableCell>)

    return result
  }

  return (
    <Table>
      <TableCaption>Lista znalezionych dat</TableCaption>
      <TableHeader>
        <TableRow>
          {DAYSPL.map((element, index) => (
            <TableHead key={index}>{element}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {finalData?.length && finalData?.map((week, index) => (
            <TableRow key={`row-${index}`}>
              {tableCell(week)}
            </TableRow>
          )) ||
            <TableRow>
                <TableCell colSpan={8} className="text-center font-bold">Wybierz zakres i dni tygodnia</TableCell>
            </TableRow>
        }
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell className={cn(!finalData?.length && "hidden")} colSpan={8}>
            <Button disabled={!finalData} onClick={copyAll}>
              <ClipboardList className="mr-2"/>
              Kopiuj wszystko
            </Button>
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}

export default Output
