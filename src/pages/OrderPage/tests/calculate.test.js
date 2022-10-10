// import { render, screen } from "@testing-library/react";
import { screen, render } from "../../../test-utils";
import userEvent from "@testing-library/user-event";
import Type from "../Type";
import OrderPage from "../OrderPage";

test("update product's total when products change", async () => {
  // 테스트할 경우에도 context provider로 감싸줘야 전역 state에 대한 로직을 반영할 수 있음
  // 모든 테스트에서 context provider를 감싸주는 것은 비효율적 => customRender를 사용하여 해결
  //   render(<Type orderType="products" />, { wrapper: OrderContextProvider });
  render(<Type orderType="products" />);

  // exact 옵션 상품 총 가격: 문자열 뒤에 어떤 문자열이 들어와도 참조
  const productsTotal = screen.getByText("상품 총 가격: ", { exact: false });
  expect(productsTotal).toHaveTextContent("0");

  // 아메리카 여행 상품 한 개 올리기
  const americaInput = await screen.findByRole("spinbutton", {
    name: "America",
  });

  // 현재 소스 코드보다 위에서 같은 엘리먼트를 위한 useEvent를 사용했다면 clear
  userEvent.clear(americaInput);
  userEvent.type(americaInput, "1");
  expect(productsTotal).toHaveTextContent("1000");

  // 영국 상품 3개 더 올리기
  const englandInput = await screen.findByRole("spinbutton", {
    name: "England",
  });
  userEvent.clear(englandInput);
  userEvent.type(englandInput, "3");
  expect(productsTotal).toHaveTextContent("4000");
});

test("update option's total when option change", async () => {
  render(<Type orderType="options" />);

  const optionsTotal = screen.getByText("옵션 총 가격:", { exact: false });
  expect(optionsTotal).toHaveTextContent("0");

  const insuranceCheckbox = await screen.findByRole("checkbox", {
    name: "Insurance",
  });

  userEvent.click(insuranceCheckbox);
  expect(insuranceCheckbox).toHaveTextContent("500");

  const dinnerCheckbox = await screen.findByRole("checkbox", {
    name: "Dinner",
  });

  userEvent.click(dinnerCheckbox);
  expect(optionsTotal).toHaveTextContent("1000");

  userEvent.click(dinnerCheckbox);
  expect(optionsTotal).toHaveTextContent("500");
});

describe("total price of goods and options", () => {
  test("total price starts with 0 and Updating total price when adding one products", async () => {
    render(<OrderPage />);

    const total = screen.getByText("Total Price:", { exact: false });
    expect(total).toHaveTextContent("0");

    const americaInput = await screen.findByRole("spinbutton", {
      name: "America",
    });
    userEvent.clear(americaInput);
    userEvent.type(americaInput, "1");
    expect(total).toHaveTextContent("1000");
  });
  test("Updating total price when adding one option", async () => {
    render(<OrderPage />);

    const total = screen.getByText("Total Price:", { exact: false });

    const insuranceCheckbox = await screen.findByRole("checkbox", {
      name: "Insurance",
    });
    userEvent.click(insuranceCheckbox);
    expect(total).toHaveTextContent("500");
  });
  test("Updating total price when removing option and products", async () => {
    render(<OrderPage />);

    const total = screen.getByText("Total Price:", { exact: false });

    const insuranceCheckbox = await screen.findByRole("checkbox", {
      name: "Insurance",
    });
    userEvent.click(insuranceCheckbox);

    const americaInput = await screen.findByRole("spinbutton", {
      name: "America",
    });
    userEvent.clear(americaInput);
    userEvent.type(americaInput, "3");

    userEvent.clear();
    userEvent.type(americaInput, "1");

    expect(total).toHaveTextContent("1500");
  });
});
