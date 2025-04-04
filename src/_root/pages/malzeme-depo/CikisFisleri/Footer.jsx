import React from "react";
import styled from "styled-components";

const StyledFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  bottom: 0;
  right: 0;
  padding: 15px;
  z-index: 1001;
  background-color: #ffffff;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  width: calc(100% - 30px);
  max-width: 920px;
`;

export default function Footer() {
  return (
    <StyledFooter>
      <div>{new Date().getFullYear()} Orjin</div>
      <div>
        <div>Design & Develop by Orjin Team</div>
      </div>
    </StyledFooter>
  );
}
