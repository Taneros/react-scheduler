import Table from "react-bootstrap/Table";
import { DAYS, HOURS, MEMBERS } from "../services/mocks/constants";
import TableCell from "../components/table-cell";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../services/hooks/hooks";

function CalendarPage() {
  const events = useAppSelector(state => state.schedule.events);

  return (
    <div>
      <main>
        <h1>Calendar</h1>
        <select name="filter" id="filter">
          <option>All members</option>
          {MEMBERS.map((member) => (
            <option>{member}</option>
          ))}
        </select>
        <NavLink to="/create-event">New event +</NavLink>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              {DAYS.map((day, index) => (
                <th key={index}>{day.slice(0, 3)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {HOURS.map((hour, i) => (
              <tr key={i}>
                <td>{hour}</td>
                {
                  DAYS.map((day) => {
                    const schedule = events.find((event) => event.day === day && event.time === hour);

                    return <TableCell event={schedule ?? null}></TableCell>;
                  })
                }
              </tr>
            ))}
          </tbody>
        </Table>
      </main>
    </div>
  );
}

export default CalendarPage;
