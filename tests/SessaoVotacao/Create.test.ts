import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { create } from "../../src/server/controllers/sessaoVotacao/Create";
import { PautasProvider } from "../../src/server/database/providers/Pautas";
import { SessaoVotacaoProvider } from "../../src/server/database/providers/SessaoVotacao";
import { testServer } from "../jest.setup";
import jwt from "jsonwebtoken";
import crypto from "crypto";

describe("create", () => {
  function generateSecretKey() {
    return crypto.randomBytes(32).toString("hex");
  }

  
function generateToken(user: { id: number; cpf: string; nome: string; admin: boolean }) {
  const payload = {
    uid: user.id,
    cpf: user.cpf,
    nome: user.nome,
    admin: user.admin, 
  };

  return jwt.sign(payload, "suaChaveSecreta"); 
}


const adminUser = {
  id: 1,
  cpf: "11111111111",
  nome: "Admin",
  admin: true, 
};

const tokenAdmin = generateToken(adminUser);


const regularUser = {
  id: 2,
  cpf: "22222222222",
  nome: "Usuário Regular",
  admin: false, 
};

const tokenRegularUser = generateToken(regularUser);
  it("deve retornar CREATED se a sessão de votação for criada com sucesso", async () => {
    const createPauta = await testServer
      .post("/pauta")
      .set("Authorization", `Bearer ${tokenAdmin}`)
      .send({
        titulo: "Pauta 01",
        descricao: "Pauta 01 descricao",
      });
    console.log(`Bearer ${tokenAdmin}`);

    expect(createPauta.statusCode).toEqual(StatusCodes.CREATED);

    const criasessao = await testServer
      .post(`/sessao/1`)
      .set({ Authorization: `Bearer ${tokenAdmin}` })
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
