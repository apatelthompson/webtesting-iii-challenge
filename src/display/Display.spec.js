// Test away!
import React from "react";
import renderer from "react-test-renderer";
import { render, fireEvent } from "@testing-library/react";

import Display from "./Display";

describe("<Display />", () => {
  it("matches snapshot", () => {
    const tree = renderer.create(<Display />);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it("should show Closed when closed", () => {
    const { queryByText } = render(<Display locked={true} closed={true} />);
    expect(queryByText(/closed/i)).toBeTruthy();
  });

  it("should show Open when open", () => {
    const { queryByText } = render(<Display locked={true} closed={false} />);
    expect(queryByText(/open/i)).toBeTruthy();
  });

  it("should show Locked when locked", () => {
    const { queryByText } = render(<Display locked={true} closed={false} />);
    expect(queryByText(/unlocked/i)).toBeFalsy();
  });

  it("should show Unlocked when unlocked", () => {
    const { queryByText } = render(<Display locked={false} closed={false} />);
    expect(queryByText(/unlocked/i)).toBeTruthy();
  });

  /// RED AND GREEN LED TESTS:
  describe("Locked/Closed", () => {
    it("when locked /closed shows red-led", () => {
      const { queryByText } = render(<Display locked={true} closed={true} />);
      expect(queryByText(/closed/i).className.includes("red-led")).toBeTruthy();
      expect(queryByText(/locked/i).className.includes("red-led")).toBeTruthy();
    });
  });
});

describe("unlocked/open", () => {
  it("when unlocked/open shows green-led", () => {
    const { queryByText } = render(<Display locked={false} closed={false} />);
    expect(queryByText(/open/i).className.includes("green-led")).toBeTruthy();
    expect(
      queryByText(/unlocked/i).className.includes("green-led")
    ).toBeTruthy();
  });
});
