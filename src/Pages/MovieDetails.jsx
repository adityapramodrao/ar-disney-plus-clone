import React, { useEffect } from "react";
import styled from "styled-components";
import { FaStar, FaPlus, FaPlay, FaRegStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchShowDetails } from "../slices/DetailsPageSlice"; // Fix import

const MovieDetails = () => {
  
  const { id } = useParams(); // Get movie ID from URL
  const dispatch = useDispatch();
  
  // Fix useSelector to match slice state
  const { details, status, error } = useSelector((state) => state.ShowDetails);

  useEffect(() => {
    if (id) {
      dispatch(fetchShowDetails(id)); // Fix: Ensure `id` is passed
    }
  }, [dispatch, id]);

  if (status === "loading") {
    return <Container>Loading...</Container>;
  }

  if (status === "failed") {
    return <Container>Error: {error}</Container>;
  }

  if (!details) {
    return <Container>No data available</Container>;
  }

  return (
    <Container>
      <TopSection>
        <Poster src={details.primaryImage} alt={details.primaryTitle} />
      </TopSection>
      <MovieInfo>
        <Title>{details.primaryTitle}</Title>
        <Details>{`${details.startYear} • PG • ${details.releaseDate}`}</Details>
        <RatingContainer>
          <Rating>
            <FaStar color="gold" /> {details.averageRating}/10
            <span>({details.budget})</span>
          </Rating>
          <UserRating>
            <FaRegStar /> Rate
          </UserRating>
          <Popularity>
            <span>🔥 {details.grossWorldwide}</span>
          </Popularity>
        </RatingContainer>
        <Tags>
        {details.interests.map((el) => (
          <Tag key={el}>{el}</Tag>
        ))}
      </Tags>
      <Tags>
        {details.genres.map((el) => (
          <Tag key={el}>{el}</Tag>
        ))}
      </Tags>
        <Description>{details.description}</Description>
        <Info>
        <Row>
          <Label>Director</Label>
          <Value>{details?.directors[0]?.fullName ? details?.directors[0]?.fullName : "N/A"}</Value>
        </Row>
        <Row>
          <Label>Writers</Label>
          <Value>{details?.writers[0]?.fullName ? details?.writers[0]?.fullName : "N/A"}</Value>
        </Row>
        <Row>
          <Label>Stars</Label>
          <Value> {details?.writers[1]?.fullName ? details?.writers[1]?.fullName : "N/A"}</Value>
        </Row>
        <Row>
          <Label>Cast </Label>
          {details.cast.slice(0,6).map((el) => (
             <Value key={el}>{el.fullName}</Value>
          ))}
        </Row>
      </Info>
      <IMDbProLink>
        IMDb<span>Pro</span> See production info at IMDbPro
      </IMDbProLink>
      <BottomSection>
        <WatchlistButton>
          <FaPlus /> Add to Watchlist
          <span>Added by 10.5K users</span>
        </WatchlistButton>
        <Reviews>
          <ReviewCount>67 User reviews</ReviewCount>
          <ReviewCount>39 Critic reviews</ReviewCount>
          <Metascore>66</Metascore>
        </Reviews>
      </BottomSection>
      </MovieInfo>
    </Container>
  );
};

export default MovieDetails;

// Styled Components
const Container = styled.div`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);

  &:after {
    background: url("/images/home-background.png") center center / cover
      no-repeat fixed;
    content: "";
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -1;
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 10px;
`;

const Tag = styled.span`
  background: rgba(255, 255, 255, 0.1);
  padding: 6px 12px;
  border-radius: 15px;
  font-size: 14px;
`;

const TopSection = styled.div`
  display: flex;
  gap: 20px;
`;

const Poster = styled.img`
  width: 200px;
  border-radius: 10px;
`;

const MovieInfo = styled.div`
  margin-top: 20px;
`;

const Title = styled.h1`
  font-size: 32px;
`;

const Details = styled.p`
  color: gray;
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin: 10px 0;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: bold;
`;

const UserRating = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  color: gray;
`;

const Popularity = styled.div`
  color: green;
`;

const Description = styled.p`
  margin-top: 10px;
  line-height: 1.5;
`;

const Info = styled.div`
  margin-bottom: 15px;
`;

const Row = styled.div`
  display: flex;
  margin-bottom: 5px;
`;

const Label = styled.span`
  font-weight: bold;
  min-width: 100px;
`;

const Value = styled.span`
  color: #4fa3ff;
  background: rgba(255, 255, 255, 0.1);
  padding: 6px 12px;
  border-radius: 15px;
  font-size: 14px;
`;

const WatchlistButton = styled.button`
  margin-top: 15px;
  background: yellow;
  border: none;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;
const IMDbProLink = styled.div`
  color: #4fa3ff;
  margin-bottom: 15px;
  cursor: pointer;
  span {
    font-weight: bold;
  }
`;

const BottomSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(255, 255, 255, 0.1);
  padding: 12px 16px;
  border-radius: 10px;
`;


const Reviews = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const ReviewCount = styled.span`
  color: #4fa3ff;
  cursor: pointer;
`;

const Metascore = styled.span`
  background: green;
  padding: 4px 8px;
  font-weight: bold;
  border-radius: 4px;
`;
