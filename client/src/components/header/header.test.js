import { search } from "./handleSearch";

describe("search function", () => {
  it("returns a valid result", () => {
    const city = "Los Angeles";
    const startDate = "2023-06-01";
    const endDate = "2023-06-05";
    const numberOfPeople = 2;

    const result = search(city, startDate, endDate, numberOfPeople);

    // assert that the result is valid
    expect(result).toBeDefined();
    expect(result.length).toBeGreaterThan(0);
    expect(result[0].city).toEqual(city);
    expect(result[0].startDate).toEqual(startDate);
    expect(result[0].endDate).toEqual(endDate);
    expect(result[0].numberOfPeople).toEqual(numberOfPeople);
  });
});
