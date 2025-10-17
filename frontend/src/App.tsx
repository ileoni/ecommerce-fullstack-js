import { Outlet } from "react-router"
import Theme from "./contexts/Theme"

function App() {
  return (
    <>
      <Theme>
        <Outlet />
      </Theme>
    </>
  )
}

export default App
