import { render, screen } from '@testing-library/react'
import GameCard from '.'

const game = {
  startTime: '2022-02-12T22:00:00.000Z',
  status: 3,
  period: 4,
  clock: '',
  vTeam: {
    triCode: 'PHI',
    win: '44',
    loss: '10',
    score: '130',
  },
  hTeam: {
    triCode: 'MIA',
    win: '32',
    loss: '22',
    score: '109',
  },
}

describe('<GameCard />', () => {
  it('renders correctly', () => {
    render(<GameCard {...game} />)

    // show visitor info
    expect(screen.getByTitle(/philadelphia 76ers/i)).toBeInTheDocument()
    expect(screen.getByText('76ers')).toBeInTheDocument()
    expect(screen.getByText('44-10')).toBeInTheDocument()
    expect(screen.getByText('130')).toBeInTheDocument()

    // show home info
    expect(screen.getByTitle(/miami heat/i)).toBeInTheDocument()
    expect(screen.getByText('Heat')).toBeInTheDocument()
    expect(screen.getByText('32-22')).toBeInTheDocument()
    expect(screen.getByText('109')).toBeInTheDocument()

    // show clock info
    expect(screen.getByText('Final')).toBeInTheDocument()

    // show footer info
    expect(screen.getByText('View details')).toBeInTheDocument()
  })

  it('should render without footer', () => {
    render(<GameCard {...game} details={false} />)

    expect(screen.queryByText('View details')).not.toBeInTheDocument()
  })

  it('should render live pulse when the game is happening', () => {
    const gameLive = {
      ...game,
      status: 2,
    }
    render(<GameCard {...gameLive} details={false} />)

    expect(screen.getByText('Live')).toBeInTheDocument()
  })
})
