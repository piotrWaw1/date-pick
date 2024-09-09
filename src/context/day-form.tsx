import { createContext, ReactNode, useState } from "react";
import { FormSchema } from "@/components/select-dates/select-dates.tsx";
import {
  eachDayOfInterval,
  getWeek,
} from "date-fns";
import { dayCheckers } from "@/util/days-fo-week.ts";

interface DayFormContext {
  finalData: Date[][] | undefined;
  setData: (data: FormSchema) => void;
}

export const DayFormContext = createContext<DayFormContext>({
  finalData: undefined,
  setData: () => undefined,
});

const DayFormProvider = ({ children }: { children: ReactNode }) => {
  const [finalData, setFinalData] = useState<Date[][] | undefined>()

  const setData = (data: FormSchema | undefined) => {
    if (data) {
      const { dateRange, mon, tue, wed, thu, fri, sat, sun, evenNotEven } = data
      const countTrue = Object.values(data).filter(item => item === true).length
      const daysOfWeek = Object.entries({ mon, tue, wed, thu, fri, sat, sun }).filter(([_, value]) => value)

      if (dateRange?.from && dateRange?.to) {
        const allDates = eachDayOfInterval({ start: dateRange.from, end: dateRange.to })

        const dateSearch = allDates.filter((date) => {
          if (findDay(daysOfWeek, date)) {
            const weekNumber = getWeek(date);
            return evenNotEven === "even" ? weekNumber % 2 === 0 : weekNumber % 2 !== 0;
          }
          return false
        })

        const sorted = weekSort(dateSearch, countTrue)
        setFinalData(sorted)
      }
    }
  }

  const weekSort = (dates: Date[], howManyDaysInWeek: number) => {
    const weeks: Date[][] = []
    let i = 0
    let week: Date[] = []
    dates.forEach((date, index) => {
      week.push(date)
      i += 1
      if (i === howManyDaysInWeek || dayCheckers["sun"](date) || index === dates.length - 1) {
        weeks.push(week)
        week = []
        i = 0
      }
    })
    return weeks
  }

  const findDay = (selectedDays: [string, boolean][], date: Date) => {

    for (let [key, _] of selectedDays) {
      if (dayCheckers[key](date)) {
        return true
      }
    }
    return false;
  }

  const contextData = {
    finalData,
    setData
  }

  return (
    <DayFormContext.Provider value={contextData}>
      {children}
    </DayFormContext.Provider>
  )
}

export default DayFormProvider;
