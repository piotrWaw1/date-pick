import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import DateRangeCalendar from "@/components/select-dates/date-range-calendar.tsx";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group.tsx";
import { useContext } from "react";
import { DayFormContext } from "@/context/day-form.tsx";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  dateRange: z.object({
    from: z.date().optional(),
    to: z.date().optional(),
  }),
  mon: z.boolean().optional(),
  tue: z.boolean().optional(),
  wed: z.boolean().optional(),
  thu: z.boolean().optional(),
  fri: z.boolean().optional(),
  sat: z.boolean().optional(),
  sun: z.boolean().optional(),
  evenNotEven: z.string().optional().default("even"),
})

export type FormSchema = z.infer<typeof formSchema>

const defaultValues = {
  dateRange: {
    from: undefined,
    to: undefined,
  },
  evenNotEven: "even",
}

type DaysFormType = ("mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun")[]
const DAYSFORM: DaysFormType = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"]
const DAYSPL = ["Pon", "Wt", "Śr", "Czw", "Pt", "Sob", "Niedz"]

const SelectDates = () => {
  const { setData } = useContext(DayFormContext)

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues
  })

  const onSubmit = form.handleSubmit((values: FormSchema) => setData(values))

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-3">
        <FormField
          control={form.control}
          name="dateRange"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Wybierz zakres</FormLabel>
              <FormControl>
                <DateRangeCalendar {...field}/>
              </FormControl>
            </FormItem>
          )}
        />
        <div>
          <FormField
            control={form.control}
            name="evenNotEven"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Parzysty czy nieparzysty?</FormLabel>
                <FormControl>
                  <RadioGroup defaultValue="even" value={field.value} onValueChange={field.onChange}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="even" id="r1"/>
                      <FormLabel htmlFor="r1">Parzysty</FormLabel>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="notEven" id="r2"/>
                      <FormLabel htmlFor="r2">Nieparzysty</FormLabel>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
        </div>
        <div>
          <FormLabel>Dni tygodnia</FormLabel>
          <div className="flex gap-2 mt-2">
            {DAYSFORM.map((element, index) => (
              <FormField
                key={index}
                control={form.control}
                name={element}
                render={({ field }) => (
                  <FormItem
                    className="flex flex-col items-center justify-center border p-2 rounded-lg hover:bg-primary/40 transition-colors"
                  >
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>{DAYSPL[index]}</FormLabel>
                    <FormMessage/>
                  </FormItem>
                )}
              />
            ))}
          </div>
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export default SelectDates
