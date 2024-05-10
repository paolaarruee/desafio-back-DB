import { StatusCodes } from 'http-status-codes';

import { testServer } from '../jest.setup';


describe('votos - GetAll', () => {
  let accessToken = '';
  beforeAll(async () => {
    const email = 'getall-cidades@gmail.com';
    await testServer.post('/cadastrar').send({ email, senha: '123456', nome: 'Teste', admin: true, cpf:"11111111111" });
    
    const signInRes = await testServer.post('/entrar').send({ cpf:"11111111111", senha: '123456' });

    accessToken = signInRes.body.accessToken;
  });


  it('Tenta consultar sem usar token de autenticação', async () => {
    const res1 = await testServer
      .get('/votos')
      .send();
    expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res1.body).toHaveProperty('errors.default');
  });
  
  it('Buscar todos os registros', async () => {
    const createPauta = await testServer
      .post("/pauta")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        titulo: "Pauta 01",
        descricao: "Pauta 01 descricao",
      });

    expect(createPauta.statusCode).toEqual(StatusCodes.CREATED);

    const criasessao = await testServer
      .post(`/sessao/1`)
      .set({Authorization: `Bearer ${accessToken}` })
      .send({
        pautaId: 1,
        dataInicio: "2024-05-10 03:11:00",
        nomeSessao: "Nomeee",
      });

    expect(criasessao.statusCode).toEqual(StatusCodes.CREATED);

    const criaVoto = await testServer
      .post(`/voto/1`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        id: 1,
        sessaoId: 1,
        userCpf: "12345678900",
        opcao: "Sim",
      });
    expect(criaVoto.statusCode).toEqual(StatusCodes.CREATED);

    const resBuscada = await testServer
      .get('/votos')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(Number(resBuscada.header['x-total-count'])).toBeGreaterThan(0);
    expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
    expect(resBuscada.body.length).toBeGreaterThan(0);
  });
});
