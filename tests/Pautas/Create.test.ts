import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup"; 


describe("POST /pauta", () => {
  it("Cria registro", async () => {
    const mockToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIsImNwZiI6IjExMTExMTExMTExIiwiYWRtaW4iOjEsImlhdCI6MTcxNTMwODc0OSwiZXhwIjoxNzE1Mzk1MTQ5fQ.LSmYoBgBgRjIBVpCKgTYmgHTOJWqMyU3B_E0_z-yesI";

    const res1 = await testServer
      .post("/pauta")
      .set("Authorization", `Bearer ${mockToken}`)
      .send({
        titulo: "PautaTeste",
        descricao: "PautaTeste",
      });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
  });

  it('Tenta criar um registro com nome muito curto', async () => {
    const mockToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIsImNwZiI6IjExMTExMTExMTExIiwiYWRtaW4iOjEsImlhdCI6MTcxNTMwODc0OSwiZXhwIjoxNzE1Mzk1MTQ5fQ.LSmYoBgBgRjIBVpCKgTYmgHTOJWqMyU3B_E0_z-yesI";

    const res1 = await testServer
      .post("/pauta")
      .set("Authorization", `Bearer ${mockToken}`)
      .send({
        titulo: "Pa",
        descricao: "Pa",
      });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errors.body.titulo');
    expect(res1.body).toHaveProperty('errors.body.descricao');
  });

  it("Cria registro sem ser o administrador", async () => {
    const mockToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsImNwZiI6IjIyMjIyMjIyMjIyIiwiYWRtaW4iOjAsImlhdCI6MTcxNTMwODk4MiwiZXhwIjoxNzE1Mzk1MzgyfQ.tDw2SmkQsOJzsVYfyOi8nKEkhR8ojkj1ctu-BOnrhsQ";

    const res1 = await testServer
      .post("/pauta")
      .set("Authorization", `Bearer ${mockToken}`)
      .send({
        titulo: "PautaTeste",
        descricao: "PautaTestePautaTestePautaTestePautaTestePautaTestePautaTeste",
      });

    expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
  });
});




