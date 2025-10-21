import { Outlet } from "react-router"
import Theme from "./contexts/Theme"
import Alert from "./contexts/Alert"

function App() {
  return (
    <>
      <Theme>
        <Alert>
          <Outlet />
        </Alert>
      </Theme>
    </>
  )
}

export default App
