import { compare, hash } from "bcrypt";
import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware
} from "type-graphql";
import { createAccessToken, createRefreshToken } from "./auth";
import { User } from "./entity/User";
import { MyContext } from "./MyContext";
import { isAuth } from "./isAuth";
import { sendRefreshToken } from "./sendRefreshToken";

@ObjectType()
class LoginResponse {
  @Field()
  accessToken: String;
  @Field()
  user: User;
}

@Resolver()
export class UserResolver {
  @Query(() => String!)
  hello() {
    return "hi!";
  }

  @Query(() => String!)
  @UseMiddleware(isAuth)
  bye(@Ctx() { payload }: MyContext) {
    return "userID: " + payload!.userId;
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

  @Mutation(() => LoginResponse)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { res }: MyContext
  ): Promise<LoginResponse> {
    const user = await User.findOne({
      where: { email }
    });

    if (!user) {
      throw Error("Could not find user");
    }

    const validPassword = await compare(password, user.password);

    if (!validPassword) {
      throw Error("User credentials not found");
    }

    sendRefreshToken(res, createRefreshToken(user));

    return {
      user,
      accessToken: createAccessToken(user)
    };
  }
}
