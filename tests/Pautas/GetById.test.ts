import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { getById } from '../../src/server/controllers/pautas/GetById';
import { PautasProvider } from '../../src/server/database/providers/Pautas';

describe('getById', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  const mockJson = jest.fn();
  const mockStatus = jest.fn().mockReturnValue({ json: mockJson });

  beforeEach(() => {
    mockRequest = {
      params: { id: "1" }, 
    };
    mockResponse = {
      status: mockStatus,
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve retornar status 400 se não houver id nos parâmetros da requisição', async () => {
    delete mockRequest.params;
    await getById(mockRequest as Request, mockResponse as Response);
    expect(mockStatus).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
    expect(mockJson).toHaveBeenCalledWith({
      errors: {
        default: 'O parâmetro "id" precisa ser informado.',
      },
    });
  });

  it('deve retornar status 404 se a pauta não for encontrada', async () => {
    jest.spyOn(PautasProvider, 'getById').mockResolvedValueOnce(null);
    await getById(mockRequest as Request, mockResponse as Response);
    expect(mockStatus).toHaveBeenCalledWith(StatusCodes.NOT_FOUND);
    expect(mockJson).toHaveBeenCalledWith({
      error: 'Pauta não encontrada',
    });
  });

  it('deve retornar a pauta com status 200 se ela for encontrada', async () => {
    const pautaMock = { id: 1, titulo: 'Título da Pauta',  descricao: "Descricao da Pauta"}; 
    jest.spyOn(PautasProvider, 'getById').mockResolvedValueOnce(pautaMock);
    await getById(mockRequest as Request, mockResponse as Response);
    expect(mockStatus).toHaveBeenCalledWith(StatusCodes.OK);
    expect(mockJson).toHaveBeenCalledWith(pautaMock);
  });
});
