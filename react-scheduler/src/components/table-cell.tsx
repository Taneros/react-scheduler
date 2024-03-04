import { FC } from "react";
import { TEvent } from "../types/types";
import { deleteEvent } from "../services/features/schedule/scheduleSlice";
import { useAppDispatch } from "../services/hooks/hooks";

interface ITableCell {
  event?: TEvent | null;
}

export const TableCell: FC<ITableCell> = ({ event }) => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    if (event?.id) {
      dispatch(deleteEvent(event.id)) 
    }
  }

  return (
    <th key={event?.id} onClick={handleClick}>{event?.name ?? null}</th>
  );
}

export default TableCell;