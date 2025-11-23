import React from 'react'

type Props = {
  guess: string
  setGuess: (v: string) => void
  onSubmit: (e: React.FormEvent) => void
  inputRef: React.RefObject<HTMLInputElement | null>
  disabled?: boolean
}

export default function GuessForm({ guess, setGuess, onSubmit, inputRef, disabled }: Props) {
  return (
    <form onSubmit={onSubmit}>
      <label>
        직원 수 입력:
        <input
          ref={inputRef}
          value={guess}
          onChange={e => setGuess(e.target.value)}
          type="number"
          disabled={disabled}
        />
      </label>
      <button type="submit" disabled={disabled} style={{ marginLeft: 8 }}>제출</button>
    </form>
  )
}
