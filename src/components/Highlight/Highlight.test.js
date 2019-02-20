import React from "react";
import Highlight from "./Highlight";
import { shallow } from "../../enzyme";

describe("Highlight", () => {
  it("returns as is result in case of empty highlight", () => {
    const wrapper = shallow(
      <div>
        <Highlight
          text="Some other text!!!"
          highlight=""
          className="testClass"
        />
      </div>
    );

    expect(wrapper.html()).toBe("<div>Some other text!!!</div>");
  });

  it("returns as is result in case of unmatched highlight", () => {
    const wrapper = shallow(
      <div>
        <Highlight
          text="Some other text!!!"
          highlight="some text"
          className="testClass"
        />
      </div>
    );

    expect(wrapper.html()).toBe("<div>Some other text!!!</div>");
  });

  it("returns empty result in case of empty text", () => {
    const wrapper = shallow(
      <div>
        <Highlight text="" highlight="some text" className="testClass" />
      </div>
    );

    expect(wrapper.html()).toBe("<div></div>");
  });

  it("highlights text", () => {
    const wrapper = shallow(
      <div>
        <Highlight
          text="This is sOmE texT!!!"
          highlight="some text"
          className="testClass"
        />
      </div>
    );

    expect(wrapper.html()).toEqual(
      `<div>This is <span class="testClass">sOmE texT</span>!!!</div>`
    );
  });
});
