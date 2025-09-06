export function getError(error: any) {
  return (
    error?.error ||
    error?.data?.message ||
    error?.message ||
    "Unauthorized or something went wrong!"
  );
}