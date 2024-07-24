import { render, fireEvent } from "@testing-library/react";
import { Modal } from "../Modal";

describe("Modal Component", () => {
  it("renders successfully with success state", () => {
    const onCloseSpy = jest.fn();
    const { getByText, queryByText } = render(
      <Modal
        open={true}
        onClose={onCloseSpy}
        successText="Success message"
        error={false}
        buttonText="Button Text"
        errorText="Error Text"
        onClick={() => {}}
        message="Member Id"
      />
    );

    expect(getByText("Success message")).toBeInTheDocument();
    expect(queryByText("Error message")).not.toBeInTheDocument();
  });

  it("renders successfully with error state", () => {
    const onCloseSpy = jest.fn();
    const onClickSpy = jest.fn();
    const { getByText, getByRole } = render(
      <Modal
        open={true}
        onClose={onCloseSpy}
        errorText="Error message"
        error={true}
        buttonText="Button Text"
        onClick={onClickSpy}
        successText="Success Text"
        message="Member Id"
      />
    );

    expect(getByText("Error message")).toBeInTheDocument();

    fireEvent.click(getByRole("button", { name: "Button Text" }));
    expect(onClickSpy).toHaveBeenCalledTimes(1);
  });
  it("renders successfully with error state", () => {
    const onCloseSpy = jest.fn();
    const onClickSpy = jest.fn();
    const { getByText, getByRole } = render(
      <Modal
        open={true}
        onClose={onCloseSpy}
        errorText="Error message"
        error={true}
        buttonText="Button Text"
        onClick={onClickSpy}
        successText="Success Text"
        message="Member Id"
      />
    );

    expect(getByText("Error message")).toBeInTheDocument();

    fireEvent.click(getByRole("button", { name: "Button Text" }));
    expect(onClickSpy).toHaveBeenCalledTimes(1);
  });
});
