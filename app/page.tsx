"use client";
import { gql, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const LOGIN = gql`
  mutation Mutation($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

const Home = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login, { loading, error, data }] = useMutation(LOGIN);
  const router = useRouter();

  const handleLogin = (loginId: string) => {
    localStorage.setItem("userId", data?.login);
    router.push("/org");
  };

  useEffect(() => {
    const loginId = data?.login ? data?.login : "";
    if (loginId.length > 0) {
      handleLogin(data?.login);
    }
  }, [data?.login]);

  return (
    <div>
      <p>Login page</p>
      <form
        onSubmit={(e) => {
          localStorage.setItem("userId", "");
          e.preventDefault();
          login({ variables: { email: email, password: password } });
        }}
      >
        <div>
          <label>
            Email:
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        </div>
        <br />
        <div>
          <label>
            Password:
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        <br />
        <br />
        <input type="Submit" value="Login"></input>
      </form>
    </div>
  );
};

export default Home;
