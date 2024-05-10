import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { deleteById } from "../../src/server/controllers/pautas/DeleteById";
import { PautasProvider } from "../../src/server/database/providers/Pautas";

describe("deleteById", () => {
  it("deve retornar BAD_REQUEST se o parâmetro 'id' não for fornecido", async () => {
    const mockRequest: Request = {
      params: {},
    } as any;
    const mockResponse: Response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;

    await deleteById(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
    expect(mockResponse.json).toHaveBeenCalledWith({
      errors: {
        default: 'O parâmetro "id" precisa ser informado.',
      },
    });
  });

  it("deve retornar INTERNAL_SERVER_ERROR se não for possível excluir a pauta", async () => {
    const mockId = {
      id: 1,
      titulo: "PautaTeste",
      descricao: "PautaTestePautaTestePautaTestePautaTestePautaTestePautaTeste",
    };
    const mockRequest: Request = {
      params: { id: mockId.id },
    } as any;
    const mockResponse: Response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;
    const errorMessage = "Erro ao excluir pauta";

    jest
      .spyOn(PautasProvider, "deleteById")
      .mockResolvedValue(new Error(errorMessage));

    await deleteById(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(
      StatusCodes.INTERNAL_SERVER_ERROR
    );
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: { default: "Pauta não encontrada" },
    });
  });

  it("deve retornar NO_CONTENT se a pauta for excluída com sucesso", async () => {
    const mockId = 1;
    const mockRequest: Request = {
      params: { id: mockId },
    } as any;
    const mockResponse: Response = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as any;

    jest.spyOn(PautasProvider, "deleteById").mockResolvedValue();

    await deleteById(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.NO_CONTENT);
    expect(mockResponse.send).toHaveBeenCalled();
  });
});
