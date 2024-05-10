import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("sessao - UpdateById", () => {
  const mockToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIsImNwZiI6IjExMTExMTExMTExIiwiYWRtaW4iOjEsImlhdCI6MTcxNTMwODc0OSwiZXhwIjoxNzE1Mzk1MTQ5fQ.LSmYoBgBgRjIBVpCKgTYmgHTOJWqMyU3B_E0_z-yesI";

  it("Tenta atualizar sem usar token de autenticação", async () => {
    const res1 = await testServer
      .put("/sessao/1")
      .send({ nomeSessao: "Teste" });
    expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
  });
  it("Atualiza registro", async () => {
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

    const resAtualizada = await testServer
      .put(`/sessao/${criasessao.body}`)
      .set({ Authorization: `Bearer ${mockToken}` })
      .send({
        pautaId: 1,
        dataInicio: "2024-05-10 03:11:00",
        nomeSessao: "Nome sessao Atualizado",
      });

    expect(resAtualizada.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });
  it("Tenta atualizar registro que não existe", async () => {
    const res1 = await testServer
      .put("/sessao/99999")
      .set({ Authorization: `Bearer ${mockToken}` })
      .send({
        pautaId: 1,
        dataInicio: "2024-05-10 03:11:00",
        nomeSessao: "Nome sessao Atualizado",
      });

    expect(res1.statusCode).toEqual(StatusCodes.NOT_FOUND);
  });
});
