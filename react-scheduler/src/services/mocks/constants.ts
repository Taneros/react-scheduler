import { generateHours } from "../utils/utils";

export const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

export const START_TIME = 10;

export const FINISH_TIME = 18;

export const HOURS = generateHours(START_TIME, FINISH_TIME);

export const MEMBERS = ["Ann", "Maria", "Bob", "Max", "Alex"];