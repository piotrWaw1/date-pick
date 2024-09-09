import { ModeToggle } from "@/components/mode-toggle.tsx";

const Header = () => {
  return (
    <header className="container m-auto h-14">
      <div className="flex justify-between items-center m-auto">
        <div>
          <h1 className="text-2xl font-bold">Date-pick</h1>
        </div>
        <div>
          <ModeToggle/>
        </div>
      </div>
    </header>
  )
}

export default Header
