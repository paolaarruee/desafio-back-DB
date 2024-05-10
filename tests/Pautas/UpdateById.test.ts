import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";
import { IPauta } from "../../src/server/database/models";

function createMockPauta(): IPauta {
  return {
    id: 1,
    titulo: "Título da Pauta",
    descricao: "Descrição da Pauta",
  };
}

describe("PUT /pauta/:id", () => {
  it("Atualiza um registro existente", async () => {
    const mockToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIsImNwZiI6IjExMTExMTExMTExIiwiYWRtaW4iOjEsImlhdCI6MTcxNTMwODc0OSwiZXhwIjoxNzE1Mzk1MTQ5fQ.LSmYoBgBgRjIBVpCKgTYmgHTOJWqMyU3B_E0_z-yesI";

    const res1 = await testServer
      .post("/pauta")
      .set("Authorization", `Bearer ${mockToken}`)
      .send({
        titulo: "Pauta 01",
        descricao: "Pauta 01 descricao",
      });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resAtualizada = await testServer
      .put(`/pauta/${res1.body}`)
      .set({ Authorization: `Bearer ${mockToken}` })
      .send({ titulo: "Pauta 02", descricao: "Pauta 02 descricao" });

    expect(resAtualizada.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it("Retorna erro 500 para pauta que não existe", async () => {
    const mockToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIsImNwZiI6IjExMTExMTExMTExIiwiYWRtaW4iOjEsImlhdCI6MTcxNTMwODc0OSwiZXhwIjoxNzE1Mzk1MTQ5fQ.LSmYoBgBgRjIBVpCKgTYmgHTOJWqMyU3B_E0_z-yesI";
    const nonExistentPautaId = "9999";
    const updatedPautaData = {
      titulo: "Novo Título",
      descricao: "Nova descrição da pauta",
    };

    const res = await testServer
      .put(`/pauta/${nonExistentPautaId}`)
      .set("Authorization", `Bearer ${mockToken}`)
      .send(updatedPautaData);
    expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
  });

  it("Tenta atualizar um registro com dados invalidos", async () => {
    const mockToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIsImNwZiI6IjExMTExMTExMTExIiwiYWRtaW4iOjEsImlhdCI6MTcxNTMwODc0OSwiZXhwIjoxNzE1Mzk1MTQ5fQ.LSmYoBgBgRjIBVpCKgTYmgHTOJWqMyU3B_E0_z-yesI";

    const mockPauta: IPauta = createMockPauta();

    const updatedPautaData = {
      descricao: "Nova de",
      titulo: "No",
    };

    const res = await testServer
      .put(`/pauta/${mockPauta.id}`)
      .set("Authorization", `Bearer ${mockToken}`)
      .send(updatedPautaData);

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
  });

  it("Tenta atualizar um registro sem ser um administrador", async () => {
    const mockToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsImNwZiI6IjIyMjIyMjIyMjIyIiwiYWRtaW4iOjAsImlhdCI6MTcxNTMwODk4MiwiZXhwIjoxNzE1Mzk1MzgyfQ.tDw2SmkQsOJzsVYfyOi8nKEkhR8ojkj1ctu-BOnrhsQ";

    const mockPauta: IPauta = createMockPauta();

    const updatedPautaData = {
      titulo: "Novo Título",
      descricao: "Nova descrição da pauta",
    };

    const res = await testServer
      .put(`/pauta/${mockPauta.id}`)
      .set("Authorization", `Bearer ${mockToken}`)
      .send(updatedPautaData);

    expect(res.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
  });
});
