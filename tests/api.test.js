"use strict";

const { sampleTestFunction } = require("../src/api");

test("adds 1 + 2 to equal 3", async () => {
  const mockRequestBody = {number: 1};
  const mockRequest = {payload: mockRequestBody}
  expect(await sampleTestFunction(mockRequest, {})).toStrictEqual({data: 3});
});
