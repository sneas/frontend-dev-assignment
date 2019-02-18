import { highlightQuery } from "./Suggestion";

describe("highlightQuery", () => {
  it("should properly highlight query in a string", () => {
    expect(
      highlightQuery("test query")("testClass")("string with tEst quEry!!!")
    ).toEqual('string with <span class="testClass">tEst quEry</span>!!!');
  });

  it("should adequately behave on empty query", () => {
    expect(
      highlightQuery("")("testClass")("string with tEst quEry!!!")
    ).toEqual("string with tEst quEry!!!");
  });

  it("should adequately behave on empty suggestion", () => {
    expect(highlightQuery("test query")("testClass")("")).toEqual("");
  });
});
