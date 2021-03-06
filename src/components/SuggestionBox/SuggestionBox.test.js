import React from "react";
import SuggestionBox, { INDEX_DATA_ATTR } from "./SuggestionBox";
import { shallow, mount } from "../../enzyme";
import { suggestions } from "../__mocks__/suggestions";

describe("SuggestionBox", () => {
  it("should not highlight non-existing index", () => {
    const wrapper = shallow(
      <SuggestionBox suggestions={suggestions.tru} query="§" index={-1} />
    );
    expect(wrapper.find(".suggestion-box__item--selected").length).toEqual(0);
  });

  it("should highlight existing index", () => {
    const wrapper = shallow(
      <SuggestionBox suggestions={suggestions.tru} query="trui" index={3} />
    );
    expect(
      wrapper.find(".suggestion-box__item--selected").prop(INDEX_DATA_ATTR)
    ).toEqual(3);
  });

  it("should select element on click", () => {
    const selectCallback = jest.fn();
    const wrapper = mount(
      <SuggestionBox
        suggestions={suggestions.tru}
        query="trui"
        onSelect={selectCallback}
      />
    );
    const element = wrapper.find(`[${INDEX_DATA_ATTR}=5]`);
    element.simulate("click");
    expect(selectCallback).toHaveBeenCalledWith("5", expect.anything());
    wrapper.unmount();
  });
});
