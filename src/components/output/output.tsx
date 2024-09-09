import {ReactNode, useContext } from "react";
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

const Output = () => {
  const { finalData } = useContext(DayFormContext)

  const tableCell = (week: Date[]): ReactNode[] => {
    let weekIndex = 0
    const result = []
    for (let [_, checkDay] of Object.entries(dayCheckers)) {
      if (checkDay(week[weekIndex])) {
        result.push(
          <TableCell
            className="font-medium border-r-2"
            key={uuidv4()}
          >
            {format(week[weekIndex], "dd/MM/yyyy")}
          </TableCell>)
        weekIndex += 1
      } else {
        result.push(<TableCell className="font-medium border-r-2" key={uuidv4()}></TableCell>)
      }
    }

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
        {finalData?.map((week, index) => (
          <TableRow key={`row-${index}`}>
            {tableCell(week)}
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={7}>
            <Button>
              Kopiuj
            </Button>
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}

export default Output
