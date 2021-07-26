import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PhoneBook from "./PhoneBook";

test("renders two tabs - General and Change History", () => {
  render(<PhoneBook />);
  const tabList = screen.getAllByRole("tab");
  expect(tabList).toHaveLength(2);
});

test("render General tab by default", () => {
  render(<PhoneBook />);
  const generalTab = screen.getByRole("tab", { selected: true });
  expect(generalTab).toHaveTextContent("General");
});

test("render Change History tab on click", () => {
  render(<PhoneBook />);
  const changeHistoryTab = screen.getByRole("tab", { selected: false });
  userEvent.click(changeHistoryTab);

  const divElement = screen.getByText(/Not Implemented/i);
  expect(divElement).toBeInTheDocument();
});
