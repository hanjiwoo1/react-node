export async function fetchApiGet<T>(url: string): Promise<T> {
  try {
    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const res: T = await response.json();
    return res;
  } catch (err) {
    console.error(err);
    throw err;
  }
}