import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import styled from "styled-components";
import Flag from "react-flags";

import fire from "../../../utils/firebase";

import {
  Section,
  SectionTitle,
  TextArea,
  VoicesContainer,
  VoiceContainer,
  FlagContainer,
  PlayIcon,
  Title,
  FormatContainer,
  FormatTile,
  InstagramIcon,
  TwitterIcon,
  TikTokIcon,
  FormatTileContainer,
  FormatName,
  ExportButton,
  TextInput,
  PodcastSection,
  PodcastPreview,
  PodcastInfoSection,
  PodcastInfoTitle,
  PodcastInfoDetails,
  StyledFlag,
} from "./NewVideoForm.styled";

export const FlowContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 48ch;
  max-width: 48ch;
  height: 100%;
  margin: 3rem auto 0rem;
`;

const RenderingText = styled.p`
  font-size: 1.2rem;
`;

const FormatOption = ({ name, resolution, onClick, active = false, icon }) => {
  const [width, height] = resolution.split("x");

  const heightToWidthRatio = height / width;

  return (
    <FormatTileContainer active={active}>
      <FormatTile
        active={active}
        onClick={() => onClick(resolution)}
        heightToWidthRatio={heightToWidthRatio}
      >
        {icon}
      </FormatTile>
      <FormatName>
        {name} {resolution}
      </FormatName>
    </FormatTileContainer>
  );
};

const languages = [
  {
    label: "English",
    flag: "🇺🇸",
  },
  {
    label: "Serbian",
    flag: "🇷🇸",
  },
  {
    label: "Hindi",
    flag: "🇮🇳",
  },
  {
    label: "Spanish",
    flag: "🇪🇸",
  },
  {
    label: "Russian",
    flag: "🇷🇺",
  },
  {
    label: "Chinese",
    flag: "🇨🇳",
  },
];

const formats = [
  { name: "Square", resolution: "1080x1080", icon: <InstagramIcon /> },
  { name: "Portrait", resolution: "1080x1350", icon: <TwitterIcon /> },
  { name: "Story", resolution: "1080x1920", icon: <TikTokIcon /> },
];

const NewVideoFormStep = ({ state, setState }) => {
  const { videoData } = state;

  const handleFormSubmission = () => {
    fetch("https://us-central1-keen-phalanx-296111.cloudfunctions.net/render", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(state.videoData),
    })
      .then((response) => response.text())
      .then((renderId) => {
        setState({
          ...state,
          renderId,
        });
      });

    setState({
      ...state,
      currentStep: (state.currentStep += 1),
    });
  };

  const handleTextChange = (event) => {
    setState({
      ...state,
      videoData: { ...videoData, text: event.target.value },
    });
  };

  const handleVoiceChange = (voice) => {
    setState({ ...state, videoData: { ...videoData, voice } });
  };

  const handleFormatChange = (resolution) => {
    setState({ ...state, videoData: { ...videoData, resolution } });
  };

  const { text, voice, resolution } = videoData;

  return (
    <>
      <PodcastSection>
        <PodcastPreview src="https://cdn2.sounder.fm/57675/conversions/e309231b633f69eda1d10a5bc7204c56-square_big.jpg?v=1600726540" />
        <PodcastInfoSection>
          <PodcastInfoTitle>Accidental Parenting</PodcastInfoTitle>
          <PodcastInfoDetails>By Aubrey & Col</PodcastInfoDetails>
        </PodcastInfoSection>
      </PodcastSection>
      <Section>
        <SectionTitle>Translate to languages</SectionTitle>
        <VoicesContainer>
          {languages.map(({ label, flag }) => (
            <VoiceContainer
              active={label === voice}
              onClick={() => handleVoiceChange(label)}
            >
              <FlagContainer>{flag}</FlagContainer>
              {label}
            </VoiceContainer>
          ))}
        </VoicesContainer>
      </Section>
      <Section>
        <SectionTitle>Format</SectionTitle>
        <FormatContainer>
          {formats.map((format) => (
            <FormatOption
              active={format.resolution === resolution}
              name={format.name}
              resolution={format.resolution}
              onClick={handleFormatChange}
              icon={format.icon}
            />
          ))}
        </FormatContainer>
      </Section>
      <ExportButton onClick={handleFormSubmission}>Create Clip</ExportButton>
    </>
  );
};

const EmailStep = ({ state, setState }) => {
  const handleEmailChange = (event) => {
    setState({ ...state, email: event.target.value });
  };

  const handleEmailSubmission = () => {
    // send data to Firebase

    setState({
      ...state,
      currentStep: (state.currentStep += 1),
    });
  };

  const { email } = state.email;

  return (
    <>
      <Section>
        <SectionTitle>Email</SectionTitle>
        <TextInput value={email} onChange={handleEmailChange} />
      </Section>
      <ExportButton onClick={handleEmailSubmission}>
        Generate Video
      </ExportButton>
    </>
  );
};

const VideoPreviewStep = ({ state, setState }) => {
  const [render, setRender] = useState();
  const { renderId } = state;

  useEffect(() => {
    const db = fire.database();

    const data = db.ref(`renders/${renderId}`);
    data.on("value", (snapshot) => {
      const data = snapshot.val();
      setRender(data);
    });
  }, []);

  return (
    <>
      <Section>
        {render && render?.url ? (
          <>
            <video controls src={render.url} />
            <ExportButton href={render.url}>Download</ExportButton>
          </>
        ) : (
          <RenderingText>Your video is rendering...</RenderingText>
        )}
      </Section>
    </>
  );
};

const INITIAL_STATE = {
  videoData: {
    text: "",
    voice: "Diana",
    resolution: "1080x1080",
  },
  email: "",
  renderId: null,
  currentStep: 0,
  steps: [<NewVideoFormStep />, <VideoPreviewStep />],
};

const NewVideoFlow = () => {
  const [state, setState] = useState(INITIAL_STATE);

  const { steps, currentStep } = state;

  return (
    <FlowContainer>
      <Title>Create Clip</Title>
      {React.cloneElement(steps[currentStep], {
        state,
        setState,
      })}
    </FlowContainer>
  );
};

export default NewVideoFlow;
