// 깔끔한 텍스트 로고
export default function Logo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const textSizes = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-4xl'
  }

  return (
    <div className={`font-bold ${textSizes[size]} text-blue-600`}>
      GetTheBoss
    </div>
  )
}
