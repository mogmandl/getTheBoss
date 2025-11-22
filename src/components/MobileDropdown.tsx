import React from 'react'

type Props = {
  mobileOpen: boolean
  onHomeClick: () => void
  onRankingClick: () => void
}

export default function MobileDropdown({ mobileOpen, onHomeClick, onRankingClick }: Props) {
  return (
    <div aria-hidden={!mobileOpen}>
      <div
        className={`md:hidden absolute top-full right-4 z-20 min-w-[140px] mt-2 bg-gray-200 rounded-md transform origin-top-right transition-all duration-150 ${
          mobileOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col">
          <button onClick={onHomeClick} className="w-full text-center py-2">홈입니다.</button>
          <button onClick={onRankingClick} className="w-full text-center py-2">랭킹입니다.</button>
        </div>
      </div>
    </div>
  )
}
