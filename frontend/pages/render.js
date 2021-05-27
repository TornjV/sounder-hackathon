import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";

import fire from "../utils/firebase";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: grid;
  align-items: center;
  justify-content: center;
`;

const RenderingText = styled.p`
  font-size: 1.2rem;
`;

const VideoContainer = styled.div`
  display: grid;
  align-items: center;
  justify-content: center;
  grid-template-columns: 1fr;
  grid-gap: 2rem;
`;

const DownloadButton = styled.a`
  width: 12rem;
  padding: 1rem 2rem;
  font-size: 0.875rem;
  text-align: center;
  border-radius: 10px;
  background-image: linear-gradient(135deg, #ff844a, #f94069 50%, #ff844a);
  background-size: 250%;
  color: white;
  outline: none;
  border: none;
  font-weight: 500;
  cursor: pointer;
  justify-self: center;
`;

const Render = () => {
  const router = useRouter();
  const [render, setRender] = useState();

  const renderId = router.query.id;

  useEffect(() => {
    const db = fire.database();

    const data = db.ref(`renders/${renderId}`);
    data.on("value", (snapshot) => {
      const data = snapshot.val();
      setRender(data);
    });
  }, []);

  return (
    <Container>
      {render && render?.url ? (
        <VideoContainer>
          <video controls src={render.url} />
          <DownloadButton href={render.url}>Download</DownloadButton>
        </VideoContainer>
      ) : (
        <RenderingText>Your video is rendering...</RenderingText>
      )}
    </Container>
  );
};

export default Render;
