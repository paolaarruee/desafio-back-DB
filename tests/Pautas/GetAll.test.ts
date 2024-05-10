import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { getAllValidation, getAll } from "../../src/server/controllers/pautas/GetAll";
import { PautasProvider } from "../../src/server/database/providers/Pautas";


describe("getAll", () => {
  it("deve retornar resultados paginados", async () => {
    const mockRequest: Request = {
      query: {
        page: "1",
        limit: "10",
        filter: "someFilter",
      },
    } as any;
    const mockResponse: Response = {
      setHeader: jest.fn(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;
    const mockResult = [{ id: 1, titulo: "Pauta 1", descricao: "Descricao Pauta 01"}, { id: 2, titulo: "Pauta 2", descricao: "Descricao Pauta 02"},];
    const mockCount = 2;

   
    jest.spyOn(PautasProvider, "getAll").mockResolvedValue(mockResult);
    jest.spyOn(PautasProvider, "count").mockResolvedValue(mockCount);

    await getAll(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.OK);
    expect(mockResponse.json).toHaveBeenCalledWith(mockResult);
    expect(mockResponse.setHeader).toHaveBeenCalledWith("access-control-expose-headers", "x-total-count");
    expect(mockResponse.setHeader).toHaveBeenCalledWith("x-total-count", mockCount);
  });

  it("deve lidar com erros", async () => {
    const mockRequest: Request = {
      query: {
        page: "1",
        limit: "10",
        filter: "someFilter",
      },
    } as any;
    const mockResponse: Response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;
    const errorMessage = "An error occurred";

    jest.spyOn(PautasProvider, "getAll").mockResolvedValue(new Error(errorMessage));

    await getAll(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(mockResponse.json).toHaveBeenCalledWith({ errors: { default: errorMessage } });
  });
});
