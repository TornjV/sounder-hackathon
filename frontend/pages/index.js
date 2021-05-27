import styled from "styled-components";
import Head from "next/head";
import NewVideoForm from "../modules/dashboard/components/NewVideoForm";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-items: center;
`;

const Header = styled.header`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  padding-left: 4rem;
  background: rgb(4, 25, 120);
  background: linear-gradient(
    90deg,
    rgba(4, 25, 120, 1) 0%,
    rgba(7, 67, 245, 1) 100%
  );
`;

const Heading = styled.h1`
  font-family: Inter;
  font-size: 3rem;
  // color: #1e1e1e;
  color: white;
  font-weight: 600;

  > span {
    font-weight: 300;
  }
  text-align: left;
`;

const Subheading = styled.h2`
  font-family: Inter;
  font-size: 1.5rem;
  // color: #1e1e1e;
  color: white;
  font-weight: 400;
  text-align: left;
  margin-top: 0rem;
`;

const ContentWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

export const FormWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function Home() {
  return (
    <Container>
      <Head>
        <title>Sounder clips - Turn podcasts into video</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ContentWrapper>
        <Header>
          <Heading>
            Sounder clips <span>for social media</span>
          </Heading>
          <Subheading>
            Automatically turn your podcasts into engaging <br /> videos and
            build global audience in style.
          </Subheading>
        </Header>
        <FormWrapper>
          <NewVideoForm />
        </FormWrapper>
      </ContentWrapper>
    </Container>
  );
}
