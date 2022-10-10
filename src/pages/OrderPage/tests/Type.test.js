import { render, screen } from "@testing-library/react";
import Type from "../Type";
import { server } from "../../../mocks/server";
import { rest } from "msw";

test("display product images from server", async () => {
  render(<Type orderType="products" />);

  const productImages = await screen.findAllByRole("img", {
    name: /products$/i,
  });
  expect(productImages).toHaveLength(2);

  const altText = productImages.map((element) => element.alt);
  expect(altText).toEqual(["America product", "England product"]);
});

test("fetch option information from server", async () => {
  render(<Type orderType="options" />);

  const optionCheckBoxes = await screen.findAllByRole("checkbox");

  expect(optionCheckBoxes).toHaveLength(2);
});

test("when fetching prodcut datas, face an error", async () => {
  server.restoreHandlers(
    rest.get("https://localhost:5000/products", (req, res, ctx) =>
      res(ctx.status(500))
    )
  );

  render(<Type orderType="products" />);

  const errorBanner = await screen.findByTestId("error-banner");
  expect(errorBanner).toHaveTextContent("에러가 발생했습니다.");
});
