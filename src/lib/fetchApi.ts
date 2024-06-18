export async function fetchApi<T>(url: string, data: unknown): Promise<T> {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const res: T = await response.json();
    // console.log('res : ', res);
    return res;
  } catch (err) {
    console.error(err);
    throw err;
  }
}