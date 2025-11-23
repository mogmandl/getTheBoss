import React from 'react'
import { useTranslation } from 'react-i18next'

type Props = {
  guess: string
  setGuess: (v: string) => void
  onSubmit: (e: React.FormEvent) => void
  inputRef: React.RefObject<HTMLInputElement | null>
  disabled?: boolean
}

export default function GuessForm({ guess, setGuess, onSubmit, inputRef, disabled }: Props) {
  const { t } = useTranslation()

  return (
    <form onSubmit={onSubmit} className="border-2 border-gray-300 p-8">
      <label className="block mb-4">
        <span className="block text-gray-600 mb-2">{t('gameExact.inputLabel')}</span>
        <input
          ref={inputRef}
          value={guess}
          onChange={e => setGuess(e.target.value)}
          type="number"
          disabled={disabled}
          className="w-full border border-gray-300 px-4 py-2 focus:outline-none focus:border-blue-600 disabled:opacity-50"
          placeholder={t('gameExact.inputPlaceholder')}
        />
      </label>
      <button
        type="submit"
        disabled={disabled}
        className="w-full border-2 border-blue-600 bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 disabled:opacity-50"
      >
        {t('gameExact.submitButton')}
      </button>
    </form>
  )
}
