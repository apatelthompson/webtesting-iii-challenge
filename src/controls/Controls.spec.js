// Test away!

import React from "react";
import renderer from "react-test-renderer";
import { render, fireEvent } from "@testing-library/react";

import Controls from "./Controls";

describe("<Controls />", () => {
  it("matches snapshot", () => {
    const tree = renderer.create(<Controls />);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});

describe("buttons", () => {
  it("when unlocked/open shows green-led", () => {
    const { queryByText } = render(<Controls locked={false} closed={false} />);
    expect(queryByText(/open/i).className.includes("green-led")).toBeTruthy();
    expect(
      queryByText(/unlocked/i).className.includes("green-led")
    ).toBeTruthy();
  });
});

//when clicked, text changes
describe("buttons", () => {
  it("button text changes when clicked", () => {
    const click = jest.fn();

    const { getByText } = render(<Controls disabled={!closed} />);

    const button = getByText(/speak/i);
    fireEvent.click(button);

    expect(click).toHaveBeenCalled();

    console.log(button);
  });
});
