import { Outlet } from "react-router"
import Theme from "./contexts/Theme"
import Error from "./components/ui/Error"

function App() {
  return (
    <>
      <Theme>
        <Error>
          <Outlet />
        </Error>
      </Theme>
    </>
  )
}

export default App
