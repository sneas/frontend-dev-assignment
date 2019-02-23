import React from "react";
import SearchInput from "./SearchInput";
import { shallow, mount } from "../../enzyme";

describe("SearchInput", () => {
  it("should display clear button on non-empty value", () => {
    const wrapper = shallow(<SearchInput value="some value" />);
    expect(
      wrapper.find(".search__button-clear").is(".search__button--hidden")
    ).toEqual(false);
  });

  it("should hide clear button on empty value", () => {
    const wrapper = shallow(<SearchInput value="" />);
    expect(
      wrapper.find(".search__button-clear").is(".search__button--hidden")
    ).toEqual(true);
  });

  it("should change value to empty on clicking clear button and focus on input", () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <SearchInput value="test value" onChange={onChange} />
    );
    const input = wrapper.find(".search__input").getDOMNode();
    spyOn(input, "focus");
    wrapper.find(".search__button-clear").simulate("click");
    expect(onChange).toHaveBeenCalledWith("");
    expect(input.focus).toHaveBeenCalled();

    wrapper.unmount();
  });

  it("should focus on input by clicking search when value is empty", () => {
    const wrapper = mount(<SearchInput value="" />);
    const input = wrapper.find(".search__input").getDOMNode();
    spyOn(input, "focus");
    wrapper.find(".search__button-submit").simulate("click");
    expect(input.focus).toHaveBeenCalled();

    wrapper.unmount();
  });

  it("should submit form by clicking search when value is not empty", () => {
    const wrapper = mount(<SearchInput value="test value" />);
    const input = wrapper.find(".search__input").getDOMNode();
    spyOn(input, "focus");
    wrapper.find(".search__button-submit").simulate("click");
    expect(input.focus).not.toHaveBeenCalled();

    wrapper.unmount();
  });
});
