import { StatusCodes } from "http-status-codes";

import { testServer } from "../jest.setup";

describe("Usuários - SignIn", () => {
  beforeAll(async () => {
    await testServer.post("/cadastrar").send({
      nome: "Jorge",
      senha: "123456",
      email: "jorge@gmail.com",
      cpf: "11111111111",
      admin: true,
    });
  });

  it("Faz login", async () => {
    const res1 = await testServer.post("/entrar").send({
      senha: "123456",
      email: "jorge@gmail.com",
      cpf: "11111111111",
      admin: true,
    });
    expect(res1.statusCode).toEqual(StatusCodes.OK);
    expect(res1.body).toHaveProperty("accessToken");
  });

  it("Senha errada", async () => {
    const res1 = await testServer.post("/entrar").send({
      senha: "1234567",
      email: "jorge@gmail.com",
      cpf: "11111111111",
      admin: true,
    });
    expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res1.body).toHaveProperty("errors.default");
  });

  it("Cpf errado", async () => {
    const res1 = await testServer.post("/entrar").send({
      senha: "123456",
      email: "jorge@gmail.com",
      cpf: "22222222222",
      admin: true,
    });
    expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res1.body).toHaveProperty("errors.default");
  });

  it("Não informado cpf", async () => {
    const res1 = await testServer.post("/entrar").send({
      senha: "123456",
      admin: true,
    });
    expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res1.body.errors).toHaveProperty(
      "default",
      "Email ou senha são inválidos"
    );
  });
});
