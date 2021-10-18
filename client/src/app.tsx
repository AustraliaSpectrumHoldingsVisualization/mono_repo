import * as React from "react";
import styled from 'styled-components';

const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;
`

export interface HelloWorldProps {
  userName: string;
  lang: string;
}

export const App = (props: HelloWorldProps) => {
  return (
    <div>
      <h1>
        Hi {props.userName} from React!!11!! Welcome to {props.lang}!
      </h1>
      <Button>
        Button
      </Button>
    </div>
  );
}
