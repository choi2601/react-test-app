// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

import { server } from "./mocks/server";

// 모든 테스트가 시작되기 전에 서버 실행
beforeAll(() => server.listen());

// 각 테스트 이후에 다른 테스트에 영향이 가지 않게 리셋
afterEach(() => server.resetHandlers());

// 모든 테스트가 종료된 이후에 서버 종료
afterAll(() => server.close());
