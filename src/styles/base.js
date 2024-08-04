import { css } from "styled-components";

export const base = css`
  html {
    font-size: 62.5%;
  }

  body {
    line-height: 1.5;
    font-size: 1.6rem;
    overflow-x: hidden;
    overflow-y: scroll;
  }

  .footer {
    display: flex;
    align-items: center;
    margin-bottom: 5rem;
    margin-right: auto;
    margin-left: auto;
    max-width: 80rem;
    padding-right: 2.5rem;
    padding-left: 2.5rem;
  }

  .footer__text {
    margin-right: 1rem;
  }

  .footer__text__highlight {
    color: #1bcacd;
    font-weight: bold;
  }

  .footer__iframe {
    font-size: 0;
    height: 30px;
  }
`;
