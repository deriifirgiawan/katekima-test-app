export const extractId = (str: string) => {
  const parts = str.split("/").filter(Boolean); 
  const id = parts[parts.length - 1];
  return id ? parseInt(id, 10) : null;
}