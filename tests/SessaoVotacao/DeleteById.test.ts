import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("sessao - DeleteById", () => {
  const mockToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIsImNwZiI6IjExMTExMTExMTExIiwiYWRtaW4iOjEsImlhdCI6MTcxNTMwODc0OSwiZXhwIjoxNzE1Mzk1MTQ5fQ.LSmYoBgBgRjIBVpCKgTYmgHTOJWqMyU3B_E0_z-yesI";
  it("Tenta apagar registro sem usar token de autenticação", async () => {
    const res1 = await testServer.delete("/sessao/1").send();
    expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res1.body).toHaveProperty("errors.default");
  });
  it("Apaga registro", async () => {
    const createPauta = await testServer
      .post("/pauta")
      .set("Authorization", `Bearer ${mockToken}`)
      .send({
        titulo: "Pauta 01",
        descricao: "Pauta 01 descricao",
      });

    expect(createPauta.statusCode).toEqual(StatusCodes.CREATED);

    const createSessao = await testServer
      .post("/sessao/1")
      .set({ Authorization: `Bearer ${mockToken}` })
      .send({
        pautaId: 1,
        dataInicio: "2024-05-10 03:11:00",
        nomeSessao: "Nomeee",
      });

    expect(createSessao.statusCode).toEqual(StatusCodes.CREATED);

    const resApagada = await testServer
      .delete(`/sessao/${createSessao.body}`)
      .set({ Authorization: `Bearer ${mockToken}` })
      .send();

    expect(resApagada.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });
  it("Tenta apagar registro que não existe", async () => {
    const res1 = await testServer
      .delete("/sessao/99999")
      .set({ Authorization: `Bearer ${mockToken}` })
      .send();

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
  });
});
