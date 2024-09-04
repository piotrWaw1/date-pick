import { createContext, ReactNode, useState } from "react";
import { FormSchema } from "@/components/select-dates/select-dates.tsx";


interface DayFormContext {
  formData: FormSchema | undefined;
  setData: (data: FormSchema) => void;
}

export const DayFormContext = createContext<DayFormContext>({
  formData: undefined,
  setData: () => undefined,
});

const DayFormProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState<FormSchema | undefined>()

  const setData = (data: FormSchema | undefined) => {
    setFormData(data)
  }

  const contextData = {
    formData,
    setData
  }

  return (
    <DayFormContext.Provider value={contextData}>
      {children}
    </DayFormContext.Provider>
  )
}

export default DayFormProvider;
