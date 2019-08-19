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

describe("buttons exist", () => {
  it("shows buttons to toggle", () => {
    const { getByTestId } = render(<Controls locked={false} closed={false} />);
    expect(getByTestId("open-close-btn")).toBeTruthy();
    expect(getByTestId("lock-unlock-btn")).toBeTruthy();
  });
});

//when clicked, text changes
describe("buttons text changes", () => {
  it("button text changes when clicked", () => {
    const { getByTestId, queryByText } = render(
      <Controls locked={false} closed={false} />
    );
    const openCloseBtn = getByTestId("open-close-btn");
    const lockUnlockBtn = getByTestId("lock-unlock-btn");

    fireEvent.click(openCloseBtn);
    expect(queryByText(/open/i)).toBeTruthy;

    fireEvent.click(lockUnlockBtn);
    expect(queryByText(/lock/i)).toBeTruthy;

    fireEvent.click(lockUnlockBtn);
    expect(queryByText(/unlock/i)).toBeTruthy;

    fireEvent.click(openCloseBtn);
    expect(queryByText(/close/i)).toBeTruthy;
  });
});

describe("closed button disabled", () => {
  it("closed button doesnt work if gate locked", () => {
    const { getByTestId } = render(<Controls locked={true} closed={false} />);

    expect(getByTestId("open-close-btn").disabled).toBeTruthy();
  });
});

describe("locked button disabled", () => {
  it("lock button doesnt work if gate open", () => {
    const { getByTestId } = render(<Controls locked={false} closed={false} />);

    expect(getByTestId("lock-unlock-btn").disabled).toBeTruthy();
  });
});
