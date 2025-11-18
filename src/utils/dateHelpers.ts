export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('sv-SE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatDateShort = (date: string): string => {
  return new Date(date).toLocaleDateString('sv-SE');
};

export const getWeekDates = (date: Date = new Date()): { start: string; end: string } => {
  const curr = new Date(date);
  const first = curr.getDate() - curr.getDay() + 1; // Monday
  const last = first + 6; // Sunday

  const monday = new Date(curr.setDate(first));
  const sunday = new Date(curr.setDate(last));

  return {
    start: monday.toISOString().split('T')[0],
    end: sunday.toISOString().split('T')[0],
  };
};

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};
