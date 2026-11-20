import dayjs from "dayjs";
import { describe, expect, it } from "vitest";
import { combineDateAndTime, formatDateAndTimeForApi, formatDateForApi, formatIsoDateTimeForApi, formatTimeForApi, getStartEndPickerLimits, toDayjsOrNull, toTimeDayjsOrNull } from "../dateUtils";

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

  it("formats date-time values in the ISO form .NET DateTime fields accept, without a UTC suffix", () => {
    expect(formatIsoDateTimeForApi(dayjs(`${DATE_VALUE} 23:30:15`))).toBe(`${DATE_VALUE}T23:30:15`);
    expect(formatIsoDateTimeForApi("2026-08-25T09:21:48.783")).toBe(`${DATE_VALUE}T09:21:48`);
    expect(formatIsoDateTimeForApi(null)).toBeNull();
  });

  it("combines separate date and time picker values into one ISO API date-time value", () => {
    const date = dayjs(`${DATE_VALUE} 00:00:00`);
    const time = dayjs("2020-01-01 09:35:50");

    expect(formatDateAndTimeForApi(date, time)).toBe(`${DATE_VALUE}T09:35:00`);
    expect(formatDateAndTimeForApi(date, null)).toBe(`${DATE_VALUE}T00:00:00`);
    expect(formatDateAndTimeForApi(null, time)).toBeNull();
  });

  it("combines a date picker value carrying a time of day with a time picker value", () => {
    const date = dayjs(`${DATE_VALUE} 17:42:19`);

    expect(combineDateAndTime(date, toTimeDayjsOrNull("09:35")).format("YYYY-MM-DD HH:mm:ss")).toBe(`${DATE_VALUE} 09:35:00`);
    expect(combineDateAndTime(date, null).format("YYYY-MM-DD HH:mm:ss")).toBe(`${DATE_VALUE} 00:00:00`);
    expect(combineDateAndTime(null, toTimeDayjsOrNull("09:35"))).toBeNull();
  });
});

describe("dateUtils start/end picker limits", () => {
  const START_DATE = dayjs("2026-11-20");
  const END_DATE = dayjs("2026-11-22");

  it("closes days after the end on the start calendar and days before the start on the end calendar", () => {
    const limits = getStartEndPickerLimits(START_DATE, null, END_DATE, null);

    expect(limits.disabledStartDate(dayjs("2026-11-22 15:00"))).toBe(false);
    expect(limits.disabledStartDate(dayjs("2026-11-23"))).toBe(true);
    expect(limits.disabledEndDate(dayjs("2026-11-20 08:00"))).toBe(false);
    expect(limits.disabledEndDate(dayjs("2026-11-19"))).toBe(true);
  });

  it("keeps every day open while the other date is empty", () => {
    const onlyEnd = getStartEndPickerLimits(null, null, END_DATE, null);
    const onlyStart = getStartEndPickerLimits(START_DATE, null, null, null);

    expect(onlyEnd.disabledEndDate(dayjs("2020-01-01"))).toBe(false);
    expect(onlyStart.disabledStartDate(dayjs("2030-01-01"))).toBe(false);
  });

  it("closes start times after the end time and end times before the start time on the same day", () => {
    const limits = getStartEndPickerLimits(START_DATE, toTimeDayjsOrNull("09:30"), dayjs("2026-11-20 00:00"), "14:15");
    const startTime = limits.disabledStartTime();
    const endTime = limits.disabledEndTime();

    expect(startTime.disabledHours()).toEqual([15, 16, 17, 18, 19, 20, 21, 22, 23]);
    expect(startTime.disabledMinutes(14)).toEqual(Array.from({ length: 44 }, (_, index) => index + 16));
    expect(startTime.disabledMinutes(13)).toEqual([]);
    expect(endTime.disabledHours()).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8]);
    expect(endTime.disabledMinutes(9)).toEqual(Array.from({ length: 30 }, (_, index) => index));
    expect(endTime.disabledMinutes(10)).toEqual([]);
  });

  it("does not close times when the dates differ or the other time is empty", () => {
    const differentDays = getStartEndPickerLimits(START_DATE, "09:30", END_DATE, "08:00");
    const emptyEndTime = getStartEndPickerLimits(START_DATE, "09:30", START_DATE, null);

    expect(differentDays.disabledStartTime()).toEqual({});
    expect(differentDays.disabledEndTime()).toEqual({});
    expect(emptyEndTime.disabledStartTime()).toEqual({});
    expect(emptyEndTime.disabledEndTime().disabledHours()).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8]);
  });
});
