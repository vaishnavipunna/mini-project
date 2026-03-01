export const fetchCategories = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    console.error("fetchCategories: non-ok response", response.status, response.statusText);
    // Return empty list instead of throwing so UI degrades gracefully
    return [];
  }

  return response.json();
};

export const createCategory = async (
  url: string,
  { arg }: { arg: FormData }
) => {
  const res = await fetch(url, {
    method: "POST",
    body: arg,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Unknown error");
  }

  return data;
};

export const updateCategory = async (
  url: string,
  { arg }: { arg: FormData }
) => {
  const res = await fetch(url, {
    method: "PUT",
    body: arg,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Unknown error");
  }

  return data;
};

export const deleteCategory = async (url: string) => {
  const res = await fetch(url, {
    method: "DELETE",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Unknown error");
  }

  return data;
};
