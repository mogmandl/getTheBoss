import React from 'react'
import Card from './Card'

export default function ScoreCard({ title, value }: { title: string; value: React.ReactNode }) {
  return (
    <Card>
      <div className="text-sm text-gray-500">{title}</div>
      <div className="text-xl font-bold">{value}</div>
    </Card>
  )
}
