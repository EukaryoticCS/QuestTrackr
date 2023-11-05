import { useState } from "react";
import Alert from "./components/Alert";
import Button from "./components/Button";
import DismissAlert from "./components/DismissAlert";
import ListGroup from "./components/ListGroup";

function App() {
  const [alertVisible, setAlertVisibility] = useState(false);

  return (
    <div>
      {alertVisible && (
        <DismissAlert onClose={() => setAlertVisibility(false)}>
          Heyo! Dismiss by clicking the x:
        </DismissAlert>
      )}
      <Button color="primary" onClick={() => setAlertVisibility(true)}>
        Click me!
      </Button>
    </div>
  );
}

export default App;
