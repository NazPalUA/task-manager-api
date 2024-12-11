export const isValidTaskId = (id: unknown): id is string => {
  return typeof id === 'string' && /^\d+$/.test(id);
};
