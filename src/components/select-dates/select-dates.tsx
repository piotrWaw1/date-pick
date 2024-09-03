import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import DateRangeCalendar from "@/components/select-dates/date-range-calendar.tsx";
import { Checkbox } from "@/components/ui/checkbox.tsx";

const formSchema = z.object({
  dateRange: z.object({
    from: z.date().optional(),
    to: z.date().optional()
  }),
  mon: z.boolean().optional(),
  tue: z.boolean().optional(),
  wed: z.boolean().optional(),
  thu: z.boolean().optional(),
  fri: z.boolean().optional(),
  sat: z.boolean().optional(),
  sun: z.boolean().optional(),
})

export type FormSchema = z.infer<typeof formSchema>

type DaysFormType = ("mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun")[]

const DAYSFORM: DaysFormType = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"]
const DAYSPL = ["Pon", "Wt", "Śr", "Czw", "Pt", "Sob", "Niedz"]

const defaultValues = {
  dateRange: {
    from: undefined,
    to: undefined,
  },
}

const SelectDates = () => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues
  })

  const onSubmit = form.handleSubmit((values: FormSchema) => {
    console.log(values)
  })

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-8">
        <FormField
          control={form.control}
          name="dateRange"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date range</FormLabel>
              <FormControl>
                <DateRangeCalendar {...field}/>
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage/>
            </FormItem>
          )}
        />
        <div className="flex gap-2">
          {DAYSFORM.map((element, index) => (
            <FormField
              key={index}
              control={form.control}
              name={element}
              render={({ field }) => (
                <FormItem>
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export default SelectDates
