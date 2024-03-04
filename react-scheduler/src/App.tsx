import { CalendarPage, NewEventPage } from "./pages";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<CalendarPage />} />
        <Route path="/create-event" element={<NewEventPage />} />
      </Routes>
    </div>
  );
}

export default App;
