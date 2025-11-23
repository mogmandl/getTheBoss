import { useState, useEffect } from 'react'
import { getCorpOutline, extractEmployeeCount, selectBestMatch } from '../lib/corpApi'

export type Company = {
  id: string
  name: string
  employees: number
}

// 잘 알려진 한국 대기업 목록 (API에서 조회 시도)
const KNOWN_COMPANY_NAMES = [
  // IT/전자
  '삼성전자',
  'SK하이닉스',
  'LG전자',
  '네이버',
  '카카오',
  '삼성SDI',
  'LG디스플레이',
  'SK스퀘어',
  '크래프톤',
  '엔씨소프트',
  '넷마블',
  '컴투스',
  '카카오게임즈',
  '펄어비스',

  // 자동차
  '현대자동차',
  '기아',
  '현대모비스',
  '현대위아',
  '만도',

  // 통신
  'SK텔레콤',
  'KT',
  'LG유플러스',

  // 금융
  'KB금융',
  '신한지주',
  '하나금융',
  '우리금융',
  'NH투자증권',
  '삼성증권',
  '미래에셋증권',
  '한국투자증권',

  // 화학/소재
  'LG화학',
  '포스코',
  'SK이노베이션',
  '한화솔루션',
  '롯데케미칼',
  'LG생활건강',
  '아모레퍼시픽',

  // 바이오/제약
  '셀트리온',
  '삼성바이오로직스',
  '한미약품',
  '유한양행',
  '녹십자',
  '대웅제약',

  // 유통/식품
  '롯데',
  '신세계',
  'CJ',
  'CJ제일제당',
  '이마트',
  '현대백화점',
  '롯데쇼핑',

  // 건설/중공업
  '삼성물산',
  '현대건설',
  'GS건설',
  '대림산업',
  '두산',
  '한진',
  'HD현대',
  '현대중공업',

  // 에너지/공기업
  '한국전력',
  '한국가스공사',
  'SK에너지',
  'GS칼텍스',

  // 기타 대기업
  '한화',
  'GS',
  'SK',
  '롯데케미칼',
  '효성',
  'LS',
]

// API에서 가져온 회사 정보 캐시 (localStorage 사용)
const CACHE_KEY = 'company_employee_cache'
const CACHE_EXPIRY = 24 * 60 * 60 * 1000 // 24시간

function getCachedCompanies(): Map<string, { employees: number; timestamp: number }> {
  try {
    const cached = localStorage.getItem(CACHE_KEY)
    if (cached) {
      const data = JSON.parse(cached)
      const map = new Map<string, { employees: number; timestamp: number }>()
      Object.entries(data).forEach(([key, value]: [string, any]) => {
        map.set(key, value)
      })
      return map
    }
  } catch (e) {
    console.warn('캐시 로드 실패:', e)
  }
  return new Map()
}

function setCachedCompany(name: string, employees: number) {
  try {
    const cache = getCachedCompanies()
    cache.set(name, { employees, timestamp: Date.now() })
    const obj: Record<string, { employees: number; timestamp: number }> = {}
    cache.forEach((value, key) => {
      obj[key] = value
    })
    localStorage.setItem(CACHE_KEY, JSON.stringify(obj))
  } catch (e) {
    console.warn('캐시 저장 실패:', e)
  }
}

function getCachedEmployeeCount(name: string): number | null {
  const cache = getCachedCompanies()
  const cached = cache.get(name)
  if (cached) {
    // 캐시 만료 확인
    if (Date.now() - cached.timestamp < CACHE_EXPIRY) {
      // 직원 수가 0인 경우는 무효한 데이터로 간주하고 null 반환
      if (cached.employees > 0) {
        return cached.employees
      } else {
        // 0명인 캐시는 삭제
        cache.delete(name)
        try {
          const obj: Record<string, { employees: number; timestamp: number }> = {}
          cache.forEach((value, key) => {
            obj[key] = value
          })
          localStorage.setItem(CACHE_KEY, JSON.stringify(obj))
        } catch (e) {
          console.warn('캐시 업데이트 실패:', e)
        }
      }
    }
  }
  return null
}

/**
 * API를 통해 실제 회사 정보를 로드
 */
async function loadCompaniesFromAPI(): Promise<Company[]> {
  try {
    const loadedCompanies: Company[] = []
    const shuffled = [...KNOWN_COMPANY_NAMES].sort(() => Math.random() - 0.5)
    const maxAttempts = 30 // 70개 회사 중 30개 시도
    let attempts = 0
    let successCount = 0
    const targetCount = 20 // 목표: 20개 회사

    console.log('회사 정보 로드 시작 (API에서 가져옵니다)')

    for (const name of shuffled) {
      if (successCount >= targetCount || attempts >= maxAttempts) {
        break
      }
      attempts++

      // 캐시 확인
      const cached = getCachedEmployeeCount(name)
      const cache = getCachedCompanies()
      const cachedData = cache.get(name)
      const isCacheExpired = cachedData ? (Date.now() - cachedData.timestamp >= CACHE_EXPIRY) : true

      if (cached !== null && cached > 0 && !isCacheExpired) {
        loadedCompanies.push({
          id: `real-${successCount}`,
          name,
          employees: cached,
        })
        successCount++
        console.log(`✓ ${name}: ${cached.toLocaleString()}명 (캐시)`)
        continue
      }

      // API 호출
      try {
        console.log(`API 호출 시도: ${name}`)
        const response = await getCorpOutline(name)

        if (!response || !response.header) {
          console.warn(`API 응답 구조 오류 (${name})`)
          continue
        }

        if (response.header.resultCode && response.header.resultCode !== '00') {
          console.warn(`API 오류 (${name}): ${response.header.resultMsg || response.header.resultCode}`)
          continue
        }

        if (!response.body) {
          console.warn(`API body 없음 (${name})`)
          continue
        }

        const items = response.body.items?.item

        if (items) {
          const itemArray = Array.isArray(items) ? items : [items]
          const bestMatch = selectBestMatch(itemArray, name)

          if (bestMatch) {
            const employees = extractEmployeeCount(bestMatch)

            if (employees !== null && employees > 0) {
              setCachedCompany(name, employees)
              loadedCompanies.push({
                id: `real-${successCount}`,
                name,
                employees,
              })
              successCount++
              console.log(`✓ ${name}: ${employees.toLocaleString()}명 (API, ${itemArray.length}개 결과 중 선택)`)
            } else {
              console.warn(`직원 수 정보 없음 또는 0명 (${name})`)
            }
          } else {
            console.warn(`유효한 회사 정보 없음 (${name}, ${itemArray.length}개 결과)`)
          }
        } else {
          console.warn(`회사 정보 없음 (${name})`)
        }
      } catch (error: any) {
        console.error(`회사 정보 조회 실패 (${name}):`, error?.message || error)
      }

      await new Promise(resolve => setTimeout(resolve, 200))
    }

    console.log(`회사 정보 로드 완료: ${loadedCompanies.length}개 성공 (${attempts}개 시도)`)

    if (loadedCompanies.length < 5) {
      console.warn(`경고: 로드된 회사가 너무 적습니다 (${loadedCompanies.length}개)`)
    }

    return loadedCompanies.filter(c => c.employees > 0)
  } catch (error) {
    console.error('회사 정보 로드 실패:', error)
    return []
  }
}

// 초기값: 캐시에서 빠르게 로드
function getInitialCompanies(): Company[] {
  const cachedCompanies: Company[] = []
  const cache = getCachedCompanies()
  let index = 0

  cache.forEach((value, name) => {
    if (Date.now() - value.timestamp < CACHE_EXPIRY && value.employees > 0) {
      cachedCompanies.push({
        id: `real-${index}`,
        name,
        employees: value.employees,
      })
      index++
    }
  })

  cachedCompanies.sort((a, b) => b.employees - a.employees)
  return cachedCompanies
}

const initialCompanies: Company[] = getInitialCompanies()

// React hook을 위한 상태 관리
let companiesState: Company[] = initialCompanies
let isLoadingState = initialCompanies.length === 0
let companiesListeners: Set<() => void> = new Set()

function setCompanies(newCompanies: Company[]) {
  companiesState = newCompanies
  isLoadingState = false
  companiesListeners.forEach(listener => listener())
}

function setIsLoading(loading: boolean) {
  isLoadingState = loading
  companiesListeners.forEach(listener => listener())
}

function subscribeCompanies(listener: () => void) {
  companiesListeners.add(listener)
  return () => {
    companiesListeners.delete(listener)
  }
}

// 앱 시작 시 API에서 최신 데이터 로드
if (initialCompanies.length === 0) {
  setIsLoading(true)
  loadCompaniesFromAPI().then(loaded => {
    if (loaded.length > 0) {
      setCompanies(loaded)
      console.log('회사 정보 로드 완료:', loaded.length, '개')
    } else {
      console.warn('회사 정보를 가져올 수 없습니다. API를 확인해주세요.')
      setIsLoading(false)
    }
  }).catch((error) => {
    console.error('회사 정보 로드 실패:', error)
    setIsLoading(false)
  })
} else {
  console.log('캐시에서 로드된 회사:', initialCompanies.length, '개')
  loadCompaniesFromAPI().then(loaded => {
    if (loaded.length > 0) {
      if (loaded.length > initialCompanies.length) {
        setCompanies(loaded)
        console.log('회사 정보 업데이트 완료:', loaded.length, '개')
      }
    }
  }).catch((error) => {
    console.debug('회사 정보 백그라운드 업데이트 실패 (무시됨):', error)
  })
}

// 기본 export (하위 호환성 유지)
export default initialCompanies

// React hook: 실시간으로 companies를 가져옴
export function useCompanies(): { companies: Company[]; isLoading: boolean } {
  const [companies, setCompaniesState] = useState<Company[]>(companiesState)
  const [isLoading, setIsLoadingState] = useState<boolean>(isLoadingState)

  useEffect(() => {
    const unsubscribe = subscribeCompanies(() => {
      setCompaniesState(companiesState)
      setIsLoadingState(isLoadingState)
    })
    return unsubscribe
  }, [])

  return { companies, isLoading }
}

// 캐시에서 직원 수가 0인 회사 제거
function cleanInvalidCache(): void {
  try {
    const cache = getCachedCompanies()
    let hasInvalid = false

    cache.forEach((value, name) => {
      if (value.employees <= 0 || Date.now() - value.timestamp >= CACHE_EXPIRY) {
        cache.delete(name)
        hasInvalid = true
      }
    })

    if (hasInvalid) {
      const obj: Record<string, { employees: number; timestamp: number }> = {}
      cache.forEach((value, key) => {
        obj[key] = value
      })
      localStorage.setItem(CACHE_KEY, JSON.stringify(obj))
      console.log('무효한 캐시 정리 완료')
    }
  } catch (e) {
    console.warn('캐시 정리 실패:', e)
  }
}

cleanInvalidCache()

// API를 통해 회사 목록을 다시 로드하는 함수
export async function reloadCompanies(): Promise<Company[]> {
  try {
    localStorage.removeItem(CACHE_KEY)
    console.log('캐시 클리어 완료')
  } catch (e) {
    console.warn('캐시 삭제 실패:', e)
  }
  setIsLoading(true)
  const loaded = await loadCompaniesFromAPI()
  setCompanies(loaded)
  return loaded
}

// 현재 companies 배열을 반환하는 함수 (동기)
export function getCompanies(): Company[] {
  return companiesState
}
