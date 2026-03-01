export const createProduct = async (
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

export const updateProduct = async (
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

export const deleteProduct = async (url: string) => {
  const res = await fetch(url, {
    method: "DELETE",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Unknown error");
  }

  return data;
};
