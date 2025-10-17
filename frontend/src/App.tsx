import { Outlet } from "react-router"
import Theme from "./contexts/Theme"

function App() {
  return (
    <>
      <Theme>
        <Theme.Toggle />
        <Outlet />
      </Theme>
    </>
  )
}

export default App
