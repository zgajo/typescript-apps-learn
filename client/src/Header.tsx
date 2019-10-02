import React from "react";
import { Link } from "react-router-dom";
import { getAccessToken, setAccessToken } from "./accessToken";
import {
  MeDocument,
  MeQuery,
  useLogoutMutation,
  useMeQuery
} from "./generated/graphql";
interface Props {}

export const Header: React.FC<Props> = () => {
  const { data, loading } = useMeQuery();

  const [logout, { client }] = useLogoutMutation();
  console.log("data", data);
  let content = null;
  if (loading) {
  } else if (data && data.me) {
    content = data.me.email;
  } else {
    content = "Not logged in";
  }

  return (
    <header>
      <div>
        <Link to="/">home</Link>
      </div>
      <div>
        <Link to="/register">register</Link>
      </div>
      <div>
        <Link to="/login">login</Link>
      </div>
      <div>
        <Link to="/bye">Bye</Link>
      </div>
      <div>
        <button
          onClick={async () => {
            await logout();

            setAccessToken("");

            client!.writeQuery<MeQuery>({
              query: MeDocument,
              data: { me: null }
            });
          }}
        >
          Log out
        </button>
      </div>
      <h1>{content}</h1>
    </header>
  );
};
