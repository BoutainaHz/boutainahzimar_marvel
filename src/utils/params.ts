// utils/getIdParams.ts
export const getIdParams = (): number | null => {
  if (typeof window !== "undefined") {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    return id ? parseInt(id, 10) : null;
  }
  return null;
};
