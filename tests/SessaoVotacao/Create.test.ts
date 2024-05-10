import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { create } from "../../src/server/controllers/sessaoVotacao/Create";
import { PautasProvider } from "../../src/server/database/providers/Pautas";
import { SessaoVotacaoProvider } from "../../src/server/database/providers/SessaoVotacao";
import { testServer } from "../jest.setup";

describe("create", () => {
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
  });
  it("deve retornar NOT_FOUND se a pauta não for encontrada", async () => {
    const mockRequest: Request<{ pautaId: string }, any, any, any, any> = {
      params: {
        pautaId: "1",
      },
      body: {
        pautaId: 1,
        nomeSessao: "Sessão de Teste",
        dataInicio: new Date(),
      },
    } as any;
    const mockResponse: Response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;

    jest.spyOn(PautasProvider, "getById").mockResolvedValue(null);

    await create(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.NOT_FOUND);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: "Pauta não encontrada",
    });
  });

  it("deve retornar INTERNAL_SERVER_ERROR se ocorrer um erro ao criar a sessão de votação", async () => {
    const mockRequest: Request<{ pautaId: string }, any, any, any, any> = {
      params: {
        pautaId: "1",
      },
      body: {
        pautaId: 1,
        nomeSessao: "Sessão de Teste",
        dataInicio: new Date(),
      },
    } as any;
    const mockResponse: Response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;

    const errorMessage = "Erro ao criar sessão de votação";
    jest.spyOn(PautasProvider, "getById").mockResolvedValue({ id: 1 } as any);
    jest
      .spyOn(SessaoVotacaoProvider, "create")
      .mockRejectedValue(new Error(errorMessage));

    await create(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(
      StatusCodes.INTERNAL_SERVER_ERROR
    );
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: "Erro ao criar sessão de votação",
    });
  });
});
