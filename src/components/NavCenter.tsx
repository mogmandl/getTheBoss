import React from 'react'

type Props = {
  onHomeClick: () => void
  onRankingClick: () => void
}

export default function NavCenter({ onHomeClick, onRankingClick }: Props) {
  return (
    <div className="flex-1 flex justify-center">
      <div className="hidden md:flex gap-8">
        <button onClick={onHomeClick} className="px-2" aria-label="home">홈입니다.</button>
        <button onClick={onRankingClick} className="px-2" aria-label="ranking">랭킹입니다.</button>
      </div>
    </div>
  )
}
