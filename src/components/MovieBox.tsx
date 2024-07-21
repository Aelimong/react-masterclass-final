import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import styled from "styled-components";
import { getMovie, IDetailMovie, makeBgPath } from "../apis/api";
import { useNavigate } from "react-router-dom";

interface MovieBoxProps {
  movieId: string | undefined;
  scrollY: number;
}

const MovieBox = (props: MovieBoxProps) => {
  const { movieId, scrollY } = props;
  const navigate = useNavigate();
  const { isPending, error, data } = useQuery<IDetailMovie>({
    queryKey: ["movie", movieId],
    queryFn: () => getMovie(movieId),
  });

  if (error) return null;
  // console.log(data);
  return (
    <>
      {isPending ? (
        <Loader />
      ) : (
        <MovieBoxContainer layoutId={movieId} $scrollY={scrollY}>
          <IconWrap>
            <CloseIcon
              onClick={() => {
                navigate(-1);
              }}
              data-slot="icon"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                clip-rule="evenodd"
                fill-rule="evenodd"
                d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM8.28 7.22a.75.75 0 0 0-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 1 0 1.06 1.06L10 11.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L11.06 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L10 8.94 8.28 7.22Z"
              ></path>
            </CloseIcon>
          </IconWrap>
          <MovieBackImg $backImg={makeBgPath(data.backdrop_path)} />
          <TextWrap>
            <MovieTitle>{data.title}</MovieTitle>
            <MovieOverview>{data.overview}</MovieOverview>
            <InfoItems>
              <Item>Budget: {data.budget}</Item>
              <Item>Revenue: {data.revenue}</Item>
              <Item>Runtime: {data.runtime}</Item>
              <Item>Homepage: {data.homepage}</Item>
            </InfoItems>
          </TextWrap>
        </MovieBoxContainer>
      )}
    </>
  );
};
export default MovieBox;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MovieBoxContainer = styled(motion.div)<{ $scrollY: number }>`
  position: absolute;
  width: 50vw;
  height: 90vh;
  background-color: ${(props) => props.theme.black.darker};
  border-radius: 15px;
  overflow: hidden;
  top: ${(props) => props.$scrollY + 20}px;
  left: 0;
  right: 0;
  margin: 0 auto;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  scrollbar-width: none;

  -ms-overflow-style: none;
`;

const IconWrap = styled.div`
  width: 100%;
  position: relative;
`;

const CloseIcon = styled.svg`
  width: 36px;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

const MovieBackImg = styled.div<{ $backImg: string }>`
  width: 100%;
  height: 50%;
  background-image: linear-gradient(to top, black, transparent),
    url(${(props) => props.$backImg});
  background-size: cover;
  background-position: center;
`;

const TextWrap = styled.div`
  width: 100%;
  padding: 20px;
`;

const MovieTitle = styled.h6`
  font-size: 28px;
  color: ${(props) => props.theme.white.lighter};
  margin-bottom: 20px;
`;

const MovieOverview = styled.p`
  font-size: 14px;
  margin-bottom: 40px;
  line-height: 120%;
`;

const InfoItems = styled.ul`
  font-size: 14px;
  line-height: 120%;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;
const Item = styled.li``;
