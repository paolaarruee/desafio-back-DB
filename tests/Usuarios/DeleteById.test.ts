import { StatusCodes } from 'http-status-codes';

import { testServer } from '../jest.setup';


describe('usuario - DeleteById', () => {
  let accessToken = '';
  beforeAll(async () => {
    const email = 'email@gmail.com';
    await testServer.post('/cadastrar').send({ email, senha: '123456', nome: 'Teste', admin: true, cpf:"11111111111" });
    
    const signInRes = await testServer.post('/entrar').send({ cpf:"11111111111", senha: '123456' });

    accessToken = signInRes.body.accessToken;
  });


  it('Apaga usuario', async () => {

  
    const resApagada = await testServer
      .delete(`/usuario/1`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(resApagada.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });
  it('Tenta apagar usuario que não existe', async () => {

    const res1 = await testServer
      .delete('/usuario/99999')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body.error).toHaveProperty('default', 'Usuário não encontrado');
  });
});