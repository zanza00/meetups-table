import { addDays } from 'date-fns';

export function calcNextFridayFromMonday(
  monday: Date,
): { from: Date; to: Date } {
  return {
    from: monday,
    to: addDays(monday, 4),
  };
}
