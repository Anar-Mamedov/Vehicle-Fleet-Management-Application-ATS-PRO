import dayjs from "dayjs";
import { describe, expect, it } from "vitest";
import { formatDateForApi, formatTimeForApi, toDayjsOrNull, toTimeDayjsOrNull } from "../dateUtils";

const DATE_VALUE = "2026-08-25";

describe("dateUtils API date and time conversions", () => {
  it("formats date and time fields separately for the API", () => {
    const value = dayjs(`${DATE_VALUE} 13:17:45`);

    expect(formatDateForApi(value)).toBe(DATE_VALUE);
    expect(formatTimeForApi(value)).toBe("13:17");
  });

  it("parses separate API date and time values into dayjs objects", () => {
    const date = toDayjsOrNull(DATE_VALUE);
    const time = toTimeDayjsOrNull("13:17");
    const timeWithSeconds = toTimeDayjsOrNull("13:17:45");

    expect(dayjs.isDayjs(date)).toBe(true);
    expect(date.format("YYYY-MM-DD")).toBe(DATE_VALUE);
    expect(dayjs.isDayjs(time)).toBe(true);
    expect(time.format("HH:mm")).toBe("13:17");
    expect(timeWithSeconds.format("HH:mm:ss")).toBe("13:17:45");
  });

  it("returns null for empty or invalid time values", () => {
    expect(toTimeDayjsOrNull(null)).toBeNull();
    expect(toTimeDayjsOrNull("25:61")).toBeNull();
  });
});
