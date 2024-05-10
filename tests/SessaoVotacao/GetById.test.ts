import { StatusCodes } from "http-status-codes";

import { testServer } from "../jest.setup";

describe("sessao - GetById", () => {
  const mockToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIsImNwZiI6IjExMTExMTExMTExIiwiYWRtaW4iOjEsImlhdCI6MTcxNTMwODc0OSwiZXhwIjoxNzE1Mzk1MTQ5fQ.LSmYoBgBgRjIBVpCKgTYmgHTOJWqMyU3B_E0_z-yesI";

  it("Tenta consultar sem usar token de autenticação", async () => {
    const res1 = await testServer.get("/sessao/1").send();
    expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res1.body).toHaveProperty("errors.default");
  });

  it("Busca registro por id", async () => {
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

    const resBuscada = await testServer
      .get(`/sessao/${criasessao.body}`)
      .set({ Authorization: `Bearer ${mockToken}` })
      .send();

    expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
    expect(resBuscada.body).toHaveProperty("nomeSessao");
  });

  it('Tenta buscar registro que não existe', async () => {

    const res1 = await testServer
      .get('/sessao/99999')
      .set({ Authorization: `Bearer ${mockToken}` })
      .send();

    expect(res1.statusCode).toEqual(StatusCodes.NOT_FOUND);
  });
});
