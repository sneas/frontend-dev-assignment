import React from "react";
import SearchBox from "./SearchBox";
import { shallow, mount } from "../../enzyme";
import { doSearch } from "../__mocks__/do-search";
import { suggestions } from "../__mocks__/suggestions";

describe("SearchBox", () => {
  it("renders without crashing", () => {
    const wrapper = mount(<SearchBox doSearch={() => {}} />);
    wrapper.unmount();
  });

  it("shows suggestion box when more than 2 characters were entered", done => {
    let val = "nope";
    const wrapper = mount(
      <SearchBox doSearch={doSearch.tru} onChange={query => (val = query)} />
    );

    const input = wrapper.find(".search__input");

    input.simulate("focus");
    input.getDOMNode().value = "tru";
    input.simulate("change");

    process.nextTick(() => {
      expect(
        wrapper.update().find(".search-box__suggestion-container").length
      ).toEqual(1);
      wrapper.unmount();
      done();
    });
  });

  it("shows no suggestion box when less than 3 characters were entered", done => {
    let val = "nope";
    const wrapper = mount(
      <SearchBox doSearch={doSearch.tru} onChange={query => (val = query)} />
    );

    const input = wrapper.find(".search__input");

    input.simulate("focus");
    input.getDOMNode().value = "tr";
    input.simulate("change");

    process.nextTick(() => {
      expect(
        wrapper.update().find(".search-box__suggestion-container").length
      ).toEqual(0);
      wrapper.unmount();
      done();
    });
  });

  it("should properly increase suggestion index when it has not been set yet", () => {
    const wrapper = shallow(<SearchBox value="tru" doSearch={() => {}} />);
    wrapper.setState({
      suggestions: suggestions.tru,
      suggestionVisible: true,
      suggestionIndex: -1
    });
    wrapper.instance().increaseSuggestionIndex();
    expect(wrapper.update().state("suggestionIndex")).toEqual(0);
  });

  it("should set suggestion index to -1 when it's inthe end of the list", () => {
    const wrapper = shallow(<SearchBox value="tru" doSearch={() => {}} />);
    wrapper.setState({
      suggestions: suggestions.tru,
      suggestionVisible: true,
      suggestionIndex: suggestions.tru.length - 1
    });
    wrapper.instance().increaseSuggestionIndex();
    expect(wrapper.update().state("suggestionIndex")).toEqual(-1);
  });

  it("should set suggestion index to the end of the list when it equals to -1", () => {
    const wrapper = shallow(<SearchBox value="tru" doSearch={() => {}} />);
    wrapper.setState({
      suggestions: suggestions.tru,
      suggestionVisible: true,
      suggestionIndex: -1
    });
    wrapper.instance().decreaseSuggestionIndex();
    expect(wrapper.update().state("suggestionIndex")).toEqual(
      suggestions.tru.length - 1
    );
  });

  it("should properly decrease suggestion index", () => {
    const wrapper = shallow(<SearchBox value="tru" doSearch={() => {}} />);
    wrapper.setState({
      suggestions: suggestions.tru,
      suggestionVisible: true,
      suggestionIndex: suggestions.tru.length - 1
    });
    wrapper.instance().decreaseSuggestionIndex();
    expect(wrapper.update().state("suggestionIndex")).toEqual(
      suggestions.tru.length - 2
    );
  });
});
