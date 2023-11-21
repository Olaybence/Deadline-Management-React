import { useState } from "react";
import "./App.css";

import AddTask from "./components/AddTask";
import CalendarContainer from "./components/CalendarContainer";
import Header from "./components/Header";
import List from "./components/List";
import DisplayToggle from "./components/DisplayToggle";

export const LIST = "LIST";
export const CALENDAR = "CALENDAR";
function App() {
  const [displayToggle, setDisplayToggle] = useState(LIST);
  function handleToggle(toggleTo) {
    console.log("displayToggle", toggleTo);
    setDisplayToggle(toggleTo);
  };

  return (
    <>
      <Header />
      <AddTask />
      <DisplayToggle displayToggle={handleToggle} />
      {displayToggle === LIST ? <List /> : <CalendarContainer />}
    </>
  );
}

export default App;
// export default connect(mapStateToProps, mapDispatchToProps)(App);
