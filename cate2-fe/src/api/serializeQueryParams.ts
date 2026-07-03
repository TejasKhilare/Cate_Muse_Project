export const serializeQueryParams = (
  params: Record<string, unknown>,
): string => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((v) => {
        if (v !== undefined && v !== null) {
          searchParams.append(key, String(v));
        }
      });
    } else if (value !== undefined && value !== null) {
      searchParams.append(key, String(value));
    }
  });

  return searchParams.toString();
};