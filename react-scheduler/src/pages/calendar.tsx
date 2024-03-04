// import Table from "react-bootstrap/Table";
import { DAYS, HOURS, MEMBERS } from "../services/mocks/constants";
import TableCell from "../components/table-cell";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../services/hooks/hooks";
import styles from "./calendar.module.css";

function CalendarPage() {
  const events = useAppSelector(state => state.schedule.events);

  return (
    <div>
      <main className={styles.page}>
        <h1>Calendar</h1>
        <div className={styles.buttons}>
          <select name="filter" id="filter">
            <option>All members</option>
            {MEMBERS.map((member) => (
              <option>{member}</option>
            ))}
          </select>
          <NavLink className={styles.link} to="/create-event">New event +</NavLink>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>Name</th>
              {DAYS.map((day, index) => (
                <th className={styles.th} key={index}>{day.slice(0, 3)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {HOURS.map((hour, i) => (
              <tr key={i}>
                <td className={styles.td} width="70">{hour}</td>
                {
                  DAYS.map((day) => {
                    const schedule = events.find((event) => event.day === day && event.time === hour);

                    return <TableCell event={schedule ?? null}></TableCell>;
                  })
                }
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default CalendarPage;
