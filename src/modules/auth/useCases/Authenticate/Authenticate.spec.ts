import { faker } from '@faker-js/faker';
import { Bcrypt } from '../../../../common/libs/Hasher';
import { Jwt } from '../../../../common/libs/Jwt';
import { env } from '../../../../env';
import { InvalidCredentialsError } from '../../errors/InvalidCredentialsError';
import { UsersRepository } from '../../repositories/UsersRepository';
import { AuthenticateUseCase } from './AuthenticateUseCase';

const makeSut = async () => {
  const password = faker.string.alphanumeric(12);
  const hasher = new Bcrypt();
  const passwordHash = await hasher.hash(password);

  const user = {
    email: faker.internet.email(),
    name: faker.person.fullName(),
    passwordHash,
  };

  const usersRepository = new UsersRepository();
  await usersRepository.create(user);

  const sut = new AuthenticateUseCase(
    usersRepository,
    hasher,
    new Jwt(env.JWT_SECRET)
  );

  return { sut, user, password };
};

describe('Authenticate User', () => {
  it('should authenticate an user successfully', async () => {
    const { sut, user, password } = await makeSut();

    const result = await sut.execute({
      email: user.email,
      password,
    });

    expect(result).toHaveProperty('token');
    expect(result).toHaveProperty('user');
  });

  it('should not authenticate a non existing user', async () => {
    const { sut } = await makeSut();

    const promise = sut.execute({
      email: 'non-existing-user@example.com',
      password: '123456',
    });

    await expect(promise).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it('should not authenticate a user with incorrect password', async () => {
    const { sut, user } = await makeSut();

    const promise = sut.execute({
      email: user.email,
      password: '000000',
    });

    await expect(promise).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
