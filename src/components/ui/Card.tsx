import React from 'react'

export default function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`p-4 border rounded ${className}`}>{children}</div>
  )
}
