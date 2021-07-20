import server from "../../../src/rest-api/app";
import request from "supertest";

// close the server after each test
afterEach((done) => {
  server.close();
  done();
});

describe("routes/info", () => {
  it("should pong", async () => {
    const response = await request(server).get("/info");
    expect(response.status).toEqual(200);
    expect(response.type).toEqual("application/json");
    expect(response.body.data).toEqual("okkk");
  });
});
