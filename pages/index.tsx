import Head from 'next/head'
import { CardGroup, Container } from 'reactstrap'
import styled from 'styled-components'

import { useLoginQuery } from '../redux/auth/auth.api'
import ShowOnCondition from '../components/auth/ShowOnCondition.component'
import AirConditionerCard from '../components/AirConditionerCard/AirConditionerCard.component'
import HeaterCard from '../components/HeaterCard/HeaterCard.component'
import WithSkeleton from '../components/WithSkeleton/WithSkeleton.component'

const IndexStyle = styled.section`
  .loading-card {
    @media (min-width: 992px) {
      width: 50%;
    }
  }

  .cards-container {
    display: flex;
    flex-wrap: wrap;
    padding: 2.5rem 0;

    @media (min-width: 992px) {
      flex-wrap: nowrap;
    }
  }

  .card {
    padding: 1.5rem 2rem;
    background-color: ${({ theme }) => theme.colors.darkBlue};
    box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
    color: ${({ theme }) => theme.colors.white};
    margin: 0 0 1.5rem;
    border: 1px solid #000 !important;
    border-radius: 0.375rem !important;

    @media (min-width: 992px) {
      margin: 0 2.5rem;
    }

    .btn {
      background-color: ${({ theme }) => theme.colors.oblivionBlue};
      color: ${({ theme }) => theme.colors.white};

      &:hover,
      &:active {
        border-color: ${({ theme }) => theme.colors.green};
      }
    }
  }

  .card-header {
    font-size: 8rem;
    text-align: center;
    background-color: transparent;
    border: none;
  }
`

const HeaterCardWithSkeleton = WithSkeleton(HeaterCard)
const AirConditionerCardWithSkeleton = WithSkeleton(AirConditionerCard)

export default function Home() {
  //Login funnel user
  const { isError, isLoading } = useLoginQuery(undefined)

  return (
    <IndexStyle>
      <Head>
        <title>Comfort Home Solutions - Sottoscrizione contratti</title>
      </Head>
      <Container>
        <ShowOnCondition showWhen={!isError}>
          <div className="cards-container">
            <HeaterCardWithSkeleton otherClasses={["loading-card"]} isLoading={isLoading} />
            <AirConditionerCardWithSkeleton otherClasses={["loading-card"]} isLoading={isLoading} />
          </div>
        </ShowOnCondition>
      </Container>
    </IndexStyle>
  )
}