import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  // const linkElement = screen.queryByText(/hi react/i);
  // const linkElement = screen.findByText(/learn react/i);

  // const lintTest = screen.getByRole("button", { name: "lintTest" });
  // expect(lintTest).toHaveTextContent("lintTest");

  expect(linkElement).toBeInTheDocument();
});

// test("renders learn react link", () => {
//   const { getByText } = render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
