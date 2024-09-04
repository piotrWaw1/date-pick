import { useContext } from "react";
import { DayFormContext } from "@/context/day-form.tsx";

const Output = () => {

  const {formData} = useContext(DayFormContext)

  console.log(formData)

  return (
    <>

    </>
  )
}

export default Output
