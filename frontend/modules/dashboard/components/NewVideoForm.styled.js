import styled from "styled-components";
import Flag from "react-flags";

import PlayCircleIcon from "../../../design-system/icons/play-circle.svg";
import InstagramLogo from "../../../design-system/icons/instagram.svg";
import TwitterLogo from "../../../design-system/icons/twitter.svg";
import TikTokLogo from "../../../design-system/icons/tiktok3.svg";

export const Title = styled.h1`
  font-family: Inter;
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 2rem;
`;

export const Section = styled.div`
  margin-bottom: 2rem;
`;

export const PodcastSection = styled.div`
  margin-bottom: 2rem;
  display: flex;
`;

export const PodcastPreview = styled.img`
  width: 10rem;
  height: 10rem;
  border-radius: 20px;
  margin-right: 1rem;
`;

export const PodcastInfoSection = styled.div`
  display: flex;
  flex-direction: column;
`;

export const PodcastInfoTitle = styled.h1`
  font-size: 2rem;
  margin: 0;
`;

export const PodcastInfoDetails = styled.p`
  font-size: 1.2rem;
  margin: 1rem 0rem 0rem;
`;

export const StyledFlag = styled(Flag)`
  border-radius: 0.5rem;
`;

export const SectionTitle = styled.h2`
  font-family: Inter;
  font-weight: 400;
  font-size: 1rem;
  margin-bottom: 1rem;
`;

export const TextArea = styled.textarea`
  resize: none;
  padding: 0.5rem;
  font-family: Inter;
  font-size: 1rem;
  width: 100%;
  border: 2px solid #9da1a8;
  border-radius: 10px;
  outline: none;

  &:focus {
    border: 2px solid #ff834b;
    outline: none;
  }
`;

export const VoicesContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  grid-gap: 1rem;
`;

export const FlagContainer = styled.p`
  font-size: 1.5rem;
  margin: 0rem 0.5rem 0rem 0rem;
`;

export const VoiceContainer = styled.div`
  color: ${(props) => (props.active ? "#0743f5" : "#9da1a8")};
  border: 2px solid ${(props) => (props.active ? "#0743f5" : "#9da1a8")};
  border-radius: 10px;
  width: 100%;
  height: 2.5rem;
  display: flex;
  align-items: center;
  padding: 0 0.5rem;
  cursor: pointer;
`;

export const PlayIcon = styled(PlayCircleIcon)`
  color: inherit;
  margin-right: 0.5rem;
`;

export const FormatContainer = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
`;

export const FormatTileContainer = styled.div`
  width: calc(48ch / 3 - 2 * 1rem);
  display: flex;
  flex-direction: column;
  color: ${(props) => (props.active ? "#0743f5" : "#9da1a8")};
`;

export const FormatTile = styled.div`
  display: flex;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  width: calc(48ch / 3 - (2 / 3 * 1rem));
  height: calc(
    (48ch / 3 - (2 / 3 * 1rem)) * ${(props) => props.heightToWidthRatio}
  );
  border: 2px solid ${(props) => (props.active ? "#0743f5" : "#9da1a8")};
  color: ${(props) => (props.active ? "#0743f5" : "#9da1a8")};
  border-radius: 10px;
  cursor: pointer;
`;

export const FormatName = styled.span`
  color: inherit;
  font-size: 0.75rem;
  margin-top: 0.25rem;
`;

export const InstagramIcon = styled(InstagramLogo)`
  color: inherit;
  height: 1.5rem;
  width: 1.5rem;
`;

export const TwitterIcon = styled(TwitterLogo)`
  color: inherit;
  height: 1.5rem;
  width: 1.5rem;
`;

export const TikTokIcon = styled(TikTokLogo)`
  color: inherit;
  height: 2rem;
  width: 2rem;
  margin-left: 5px;
`;

export const ExportButton = styled.button`
  width: 12rem;
  padding: 1rem 2rem;
  font-size: 0.875rem;
  text-align: center;
  border-radius: 10px;
  background: rgb(4, 25, 120);
  background: linear-gradient(
    90deg,
    rgba(4, 25, 120, 1) 0%,
    rgba(7, 67, 245, 1) 100%
  );
  color: white;
  outline: none;
  border: none;
  font-weight: 500;
  cursor: pointer;
`;

export const TextInput = styled.input`
  resize: none;
  padding: 0.5rem;
  font-family: Inter;
  font-size: 1rem;
  width: 100%;
  border: 2px solid #9da1a8;
  border-radius: 10px;
  outline: none;

  &:focus {
    border: 2px solid #0743f5;
    outline: none;
  }
`;
