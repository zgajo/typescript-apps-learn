import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { User } from "./entity/User";
import { hash } from "bcrypt";

@Resolver()
export class UserResolver {
  @Query(() => String!)
  hello() {
    return "hi!";
  }
  @Query(() => [User]!)
  users() {
    return User.find();
  }

  @Mutation(() => Boolean!)
  async register(
    @Arg("email") email: string,
    @Arg("password") password: string
  ) {
    try {
      const hashPassword = await hash(password, 12);

      await User.insert({
        email,
        password: hashPassword
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
