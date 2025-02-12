import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchTvShows } from "../../slices/TVShowsSlice";


const TVShows = () => {
  const carouselRef = useRef(null);
  const dispatch = useDispatch();
  const { Shows, status } = useSelector((state) => state.TvShows);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTvShows());
    }
  }, [dispatch, status]);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <Container>
      <h4>Most Popular TV Shows</h4>
      <CarouselWrapper>
        <NavButton onClick={scrollLeft}>
          <FaChevronLeft />
        </NavButton>
        <Carousel ref={carouselRef}>
          {Shows.slice(0, 12).map((items) => (
            <MovieCard key={items.id}>
              <Link to={`/detail/${items.id}`}>
                <MovieImage src={items.primaryImage} alt={items.primaryTitle} />
                <MovieOverlay>
                  <MovieTitle>{items.primaryTitle}</MovieTitle>
                  <MovieGenres>{items.genres?.join(", ")}</MovieGenres>
                  <MovieRating>IMDB ⭐ {items.averageRating || "N/A"}</MovieRating>
                  <MovieDescription>{items.description || "No description available."}</MovieDescription>
                </MovieOverlay>
              </Link>
            </MovieCard>
          ))}
        </Carousel>
        <NavButton onClick={scrollRight}>
          <FaChevronRight />
        </NavButton>
      </CarouselWrapper>
    </Container>
  );
};

export default TVShows;

// Styled Components
const Container = styled.div`
  width: 100%;
  padding: 10px;
  overflow: hidden;

  h4 {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
  }
`;

const CarouselWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  width: 100%;
`;

const Carousel = styled.div`
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  white-space: nowrap;
  gap: 15px;
  padding: 10px;
  width: 100%;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const MovieOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  opacity: 0;
  padding: 10px;
  transition: opacity 0.3s ease-in-out;
  border-radius: 10px;
`;

const MovieCard = styled.div`
  flex: 0 0 auto;
  width: 200px;
  text-align: center;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }

  &:hover ${MovieOverlay} {
    opacity: 1;
  }
`;

const MovieImage = styled.img`
  width: 100%;
  height: 280px;
  object-fit: cover;
  border-radius: 10px;
`;

const MovieTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
  text-align: center;
`;

const MovieGenres = styled.div`
  font-size: 14px;
  opacity: 0.9;
  text-align: center;
  margin-bottom: 5px;
`;

const MovieRating = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: gold;
  margin-bottom: 5px;
`;

const MovieDescription = styled.div`
  font-size: 14px;
  opacity: 0.9;
  max-width: 90%;
  max-height: 80px; /* Limit description height */
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* Limit to 3 lines */
  -webkit-box-orient: vertical;
  white-space: normal;
`;


const NavButton = styled.button`
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  cursor: pointer;
  padding: 10px;
  font-size: 18px;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;

  &:first-of-type {
    left: 0;
  }
  &:last-of-type {
    right: 0;
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.9);
  }
`;
