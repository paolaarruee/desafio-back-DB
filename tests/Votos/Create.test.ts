import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Votos Controller", () => {
  const mockToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIsImNwZiI6IjExMTExMTExMTExIiwiYWRtaW4iOjEsImlhdCI6MTcxNTMwODc0OSwiZXhwIjoxNzE1Mzk1MTQ5fQ.LSmYoBgBgRjIBVpCKgTYmgHTOJWqMyU3B_E0_z-yesI";

  it("deve retornar CREATED se a sessão de votação for criada com sucesso", async () => {
    const createPauta = await testServer
      .post("/pauta")
      .set("Authorization", `Bearer ${mockToken}`)
      .send({
        titulo: "Pauta 01",
        descricao: "Pauta 01 descricao",
      });

    expect(createPauta.statusCode).toEqual(StatusCodes.CREATED);

    const criasessao = await testServer
      .post(`/sessao/1`)
      .set({ Authorization: `Bearer ${mockToken}` })
      .send({
        pautaId: 1,
        dataInicio: "2024-05-10 03:11:00",
        nomeSessao: "Nomeee",
      });

    expect(criasessao.statusCode).toEqual(StatusCodes.CREATED);

    const criaVoto = await testServer
      .post(`/voto/1`)
      .set({ Authorization: `Bearer ${mockToken}` })
      .send({
        id: 1,
        sessaoId: 1,
        userCpf: "12345678900",
        opcao: "Sim",
      });
    expect(criaVoto.statusCode).toEqual(StatusCodes.CREATED);
  });

  it("deve tentar logar sem estar autenticado", async () => {
    const criaVoto = await testServer
      .post(`/voto/1`)
      .send({
        id: 1,
        sessaoId: 1,
        userCpf: "12345678900",
        opcao: "Sim",
      });
    expect(criaVoto.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
  });
});
