// import { fireEvent, render, screen } from "@testing-library/react";
// import App from "./App";

// // test("renders learn react link", () => {
// //   render(<App />);
// //   const linkElement = screen.getByText(/learn react/i);
// //   const linkElement = screen.queryByText(/hi react/i);
// //   const linkElement = screen.findByText(/learn react/i);

// //   const lintTest = screen.getByRole("button", { name: "lintTest" });
// //   expect(lintTest).toHaveTextContent("lintTest");

// //   expect(linkElement).toBeInTheDocument();
// // });

// // test("renders learn react link", () => {
// //   const { getByText } = render(<App />);
// //   const linkElement = screen.getByText(/learn react/i);
// //   expect(linkElement).toBeInTheDocument();
// // });

// test("the counter starts at 0", () => {
//   // App 컴포넌트를 렌더링
//   render(<App />);
//   // screen object를 이용해서 원하는 엘리먼트에 접근(접근할 때 id로)
//   const counterElement = screen.getByTestId("counter");
//   // id가 counter인 엘리먼트의 텍스트가 0인지 테스트
//   expect(counterElement).toHaveTextContent(0);
// });

// test("minus button has correct text", () => {
//   render(<App />);
//   const minusButtonElement = screen.getByTestId("minus-button");
//   expect(minusButtonElement).toHaveTextContent("-");
// });

// test("plus button has correct text", () => {
//   render(<App />);
//   const plusButtonElement = screen.getByTestId("plus-button");
//   expect(plusButtonElement).toHaveTextContent("+");
// });

// test("when the + button is pressed, the counter changes to +1", () => {
//   render(<App />);

//   const buttonElement = screen.getByTestId("plus-button");

//   fireEvent.click(buttonElement);

//   const counterElement = screen.getByTestId("counter");
//   expect(counterElement).toHaveTextContent(1);
// });

// test("when the - button is pressed, the counter changes to -1", () => {
//   render(<App />);

//   const buttonElement = screen.getByTestId("minus-button");

//   fireEvent.click(buttonElement);

//   const counterElement = screen.getByTestId("counter");
//   expect(counterElement).toHaveTextContent(-1);
// });

// test("on/off button has blue color", () => {
//   render(<App />);
//   const buttonElement = screen.getByTestId("on/off-button");
//   expect(buttonElement).toHaveStyle({ backgroundColor: "blue" });
// });

// test.only("Prevent the -,+ button from being pressed when the on/off button is clicked", () => {
//   render(<App />);
//   const onOffButtonElement = screen.getByTestId("on/off-button");
//   fireEvent.click(onOffButtonElement);
//   const plusButtonElement = screen.getByTestId("plus-button");
//   const minusButtonElement = screen.getByTestId("minus-button");

//   expect(plusButtonElement).toBeDisabled();
//   expect(minusButtonElement).toBeDisabled();
// });

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

test("From order to order completion", async () => {
  render(<App />);

  const americaInput = await screen.findByRole("spinbutton", {
    name: "America",
  });

  userEvent.clear(americaInput);
  userEvent.type(americaInput, "2");

  const EnglandInput = await screen.findByRole("spinbutton", {
    name: "England",
  });

  userEvent.clear(EnglandInput);
  userEvent.type(EnglandInput, "3");

  const insuranceCheckbox = await screen.findByRole("checkbox", {
    name: "Insurance",
  });
  userEvent.click(insuranceCheckbox);

  const orderButton = await screen.findByRole("button", { name: "주문하기" });
  orderButton.click(orderButton);

  // 주문 확인 페이지
  const summaryHeading = screen.getByRole("heading", { name: "주문 확인" });
  expect(summaryHeading).toBeInTheDocument();

  const productsHeading = screen.getByRole("heading", {
    name: "여행 상품: 5000",
  });
  expect(productsHeading).toBeInTheDocument();

  const optionsHeading = screen.getByRole("heading", { name: "옵션: 500" });
  expect(optionsHeading).toBeInTheDocument();

  expect(screen.getByText("2 America")).toBeInTheDocument();
  expect(screen.getByText("3 England")).toBeInTheDocument();
  expect(screen.getByText("Insurance")).toBeInTheDocument();

  const confirmCheckbox = screen.getByRole("checkbox", {
    name: "주문하려는 것을 확인하셨나요?",
  });
  userEvent.click(confirmCheckbox);

  const confirmOrderButton = screen.getByRole("button", { name: "주문 확인" });
  userEvent.click(confirmOrderButton);

  // 주문 완료 페이지
  const loading = screen.getByText(/loading/i);
  expect(loading).toBeInTheDocument();

  const completeHeader = await screen.findByRole("heading", {
    name: "주문이 성공했습니다.",
  });
  expect(completeHeader).toBeInTheDocument();

  const loadingDisappeared = screen.queryByText("loading");
  expect(loadingDisappeared).not.toBeInTheDocument();

  const firstPageButton = screen.getByRole("button", { name: "첫페이지로" });
  userEvent.click(firstPageButton);
});
