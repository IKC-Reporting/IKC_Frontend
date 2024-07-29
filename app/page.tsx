"use client";
import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import { useRouter } from 'next/navigation';

const LOGIN = gql`
  query Query(
    $email: String!, 
    $password: String!
  ) 
  {
    login(
      email: $email, 
      password: $password
    )
  }
`;

export default function Home() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter()

  return (
    <div>
      <p>Login page</p>
      <form
        onSubmit={e => {
          e.preventDefault();
          const { loading, error, data } = useQuery(LOGIN, { variables: { email, password } });
          localStorage.setItem("userId", data?.login);
          router.push(
            '/org',
          )
        }}
      >
        <div>
          <label>Email:
            <input
              required type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        </div>
        <br />
        <div>
          <label>Password:
            <input
              required type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        <br /><br />
        <input type="Submit"></input>
      </form>
    </div>
  )
};

