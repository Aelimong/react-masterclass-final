import { useQuery } from "@tanstack/react-query";
import { getNowPlaying, IGetMovieResult, makeImagePath } from "../apis/api";
import styled from "styled-components";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { useMatch, useNavigate } from "react-router-dom";
import MovieBox from "../components/MovieBox";

export default function NowPlaying() {
  const navigate = useNavigate();
  const bigMovieMatch = useMatch<string, string>("/now-playing/:movieId");
  const { scrollY } = useScroll();

  const { isPending, error, data } = useQuery<IGetMovieResult>({
    queryKey: ["movies", "nowPlaying"],
    queryFn: getNowPlaying,
  });

  if (error) {
    return null;
  }

  const onBoxClick = (movieId: number) => {
    navigate(`/now-playing/${movieId}`);
  };

  const onOverlayClick = () => {
    navigate(-1);
  };
  const boxVariants = {
    normal: {
      scale: 1,
    },
    hover: {
      scale: 1.1,
      y: -50,
    },
  };

  return (
    <>
      <HomeContainer>
        {isPending ? (
          <Loader />
        ) : (
          <>
            <PosterBoxes>
              {data.results.map((el, idx) => {
                return (
                  <>
                    <BoxWrap
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      key={el.id + ""}
                    >
                      <Box
                        layoutId={el.id + ""}
                        variants={boxVariants}
                        initial="normal"
                        whileHover="hover"
                        onClick={() => {
                          onBoxClick(el.id);
                        }}
                        $backgroundImg={makeImagePath(el.poster_path + "")}
                      ></Box>
                      <MovieTitle>{el.title}</MovieTitle>
                    </BoxWrap>
                  </>
                );
              })}
            </PosterBoxes>
            <AnimatePresence>
              {bigMovieMatch && (
                <>
                  <Overlay
                    onClick={onOverlayClick}
                    exit={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  />
                  <MovieBox
                    movieId={bigMovieMatch.params.movieId}
                    scrollY={scrollY.get()}
                  />
                </>
              )}
            </AnimatePresence>
          </>
        )}
      </HomeContainer>
    </>
  );
}

const HomeContainer = styled.main`
  width: 100%;
  margin: 0 auto;
  max-width: 900px;
  padding: 80px 20px;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PosterBoxes = styled(motion.div)`
  display: grid;
  gap: 60px 40px;
  margin-bottom: 10px;
  grid-template-columns: repeat(3, 1fr);
`;

const BoxWrap = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Box = styled(motion.div)<{ $backgroundImg: string }>`
  height: 30vw;
  border-radius: 20px;
  background-image: url(${(props) => props.$backgroundImg});
  background-size: cover;
  background-position: center center;
  cursor: pointer;
`;

const MovieTitle = styled.h4`
  text-align: center;
  margin-top: 20px;
  font-size: 20px;
  font-weight: 700;
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;
