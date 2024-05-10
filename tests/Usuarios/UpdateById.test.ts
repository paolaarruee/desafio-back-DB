import { StatusCodes } from "http-status-codes";

import { testServer } from "../jest.setup";

describe("usuario - UpdateById", () => {

  it("Atualiza registro", async () => {
    const res1 = await testServer.post("/cadastrar").send({
      senha: "123456789",
      nome: "Juca da Silva",
      email: "emailteste@gmail.com",
      cpf: "33333333333",
      admin: true,
    });
    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual("number");

    const entrar = await testServer.post("/entrar").send({
      senha: "123456789",
      nome: "Juca da Silva",
      email: "emailteste@gmail.com",
      cpf: "33333333333",
      admin: true,
    });
    expect(entrar.statusCode).toEqual(StatusCodes.OK);
    expect(entrar.body).toHaveProperty("accessToken");
    const accessToken = entrar.body.accessToken;

    const resAtualizada = await testServer
      .put(`/usuario/${res1.body}`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        email: "email@gmail.com",
        senha: "123456789",
        nome: "Teste",
        admin: true,
        cpf: "22222222222",
      });

    expect(resAtualizada.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });
  it("Tenta atualizar registro que não existe", async () => {
    const cadastrar = await testServer.post("/cadastrar").send({
      senha: "123456789",
      nome: "Juca da Silva",
      email: "emailteste@gmail.com",
      cpf: "33333333333",
      admin: true,
    });
    expect(cadastrar.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof cadastrar.body).toEqual("number");

    const entrar = await testServer.post("/entrar").send({
      senha: "123456789",
      nome: "Juca da Silva",
      email: "emailteste@gmail.com",
      cpf: "33333333333",
      admin: true,
    });
    expect(entrar.statusCode).toEqual(StatusCodes.OK);
    expect(entrar.body).toHaveProperty("accessToken");
    const accessToken = entrar.body.accessToken;
    const res1 = await testServer
      .put("/usuario/99999")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        email: "email@gmail.com",
        senha: "123456",
        nome: "Teste",
        admin: true,
        cpf: "22222222222",
      });

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body.error).toHaveProperty("default", "Usuário não encontrado");
  });
});
