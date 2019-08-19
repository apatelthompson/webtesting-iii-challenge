// Test away
import React from "react";
import renderer from "react-test-renderer";
import { render, fireEvent } from "@testing-library/react";

import Dashboard from "./Dashboard";

describe("<Dashboard />", () => {
  it("matches snapshot", () => {
    const tree = renderer.create(<Dashboard />);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it("should default to unlocked, open", () => {
    const { queryByText } = render(<Dashboard />);
    expect(queryByText(/unlocked/i)).toBeTruthy();
    expect(queryByText(/open/i)).toBeTruthy();
  });

  it("cannot be closed or opened if locked", () => {
    const { queryByText, getByTestId } = render(<Dashboard />);
    const openCloseBtn = getByTestId("open-close-btn");
    const lockUnlockBtn = getByTestId("lock-unlock-btn");

    //close -> lock -> try to open

    fireEvent.click(openCloseBtn);
    fireEvent.click(lockUnlockBtn);
    fireEvent.click(openCloseBtn);
    expect(queryByText(/closed/i)).toBeTruthy;
  });
});
