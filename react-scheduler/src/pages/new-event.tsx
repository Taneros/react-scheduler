import { FormEvent, useEffect, useState } from "react";
import { DAYS, HOURS, MEMBERS } from "../services/mocks/constants";
import { TEvent } from "../types/types";
import { v4 as uuidv4 } from "uuid";
import { useAppDispatch, useAppSelector } from "../services/hooks/hooks";
import { createEvent, updateState } from "../services/features/schedule/scheduleSlice";
import { useNavigate } from "react-router-dom";
import Alert from 'react-bootstrap/Alert';

function NewEventPage() {
  const [event, setEvent] = useState<TEvent>({
    name: "",
    participants: [],
    day: "",
    time: "",
    id: uuidv4(),
  });

  const dispatch = useAppDispatch();
  const createEventSuccess = useAppSelector(state => state.schedule.createEventSuccess);
  const createEventFailed = useAppSelector(state => state.schedule.createEventFailed);
  
  const createOptions = (array: string[] | number[]) => {
    return array.map((text: string | number, index: number) => {
      return (
        <option key={index} value={text}>
          {text}
        </option>
      );
    });
  };

  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    const options = e.target.options;
    const values = [];
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        values.push(options[i].value);
      }
    }
    setEvent({
      ...event,
      participants: values,
    });
  };

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(createEvent(event));
    setTimeout(() => dispatch(updateState()), 5000);
  }

  const navigate = useNavigate();

  useEffect(() => {
    if (createEventSuccess) {
      navigate(-1);
    }
  }, [createEventSuccess, navigate])

  return (
    <div>
      <main>
        {createEventFailed && <Alert key="danger" variant="danger">Failed to create an event. The slot is already booked.</Alert>}
        <h1>Create new event</h1>
        <form action="/" method="post" onSubmit={handleSubmit}>
          <label htmlFor="eventName">Name of the event:</label>
          <input
            type="text"
            id="eventName"
            onChange={(evt) =>
              setEvent({
                ...event,
                name: evt.target.value,
              })
            }
            required
          />
          <div>
            <label htmlFor="participants">Participants:</label>
            <select
              value={event.participants}
              name="participants"
              id="participants"
              onChange={handleChange}
              multiple
              required
            >
              {createOptions(MEMBERS)}
            </select>
          </div>
          <div>
            <label htmlFor="day">Day:</label>
            <select
              value={event.day}
              name="day"
              id="day"
              onChange={(evt) =>
                setEvent({
                  ...event,
                  day: evt.target.value,
                })
              }
              required
            >
              {createOptions(DAYS)}
            </select>
          </div>
          <div>
            <label htmlFor="time">Time:</label>
            <select
              value={event.time}
              name="time"
              id="time"
              onChange={(evt) =>
                setEvent({
                  ...event,
                  time: evt.target.value,
                })
              }
              required
            >
              {createOptions(HOURS)}
            </select>
          </div>
          <button type="reset">Cancel</button>
          <button type="submit">Create</button>
        </form>
      </main>
    </div>
  );
}

export default NewEventPage;
