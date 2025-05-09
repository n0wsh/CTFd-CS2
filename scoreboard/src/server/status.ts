import { APIResponse } from "./types";

export type CTFStatus = {
  started: boolean;
  ended: boolean;
  startAt: number;
  endAt: number;
};

export async function fetchCTFStatus(): Promise<CTFStatus> {
  try {
    const result: APIResponse<CTFStatus> = await fetch(
      `${process.env.CTFD_API_URL}/cs2/ctf-status`
    ).then((res) => res.json());
    return result.data;
  } catch (e) {
    console.error("Failed to fetch CTF status:", e);
    return {
      started: false,
      ended: false,
      startAt: 0,
      endAt: 0,
    };
  }
}
