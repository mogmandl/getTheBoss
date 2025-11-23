// 공공데이터포털 금융위원회 기업기본정보 API 클라이언트

const API_BASE_URL = 'https://apis.data.go.kr/1160100/service/GetCorpBasicInfoService_V2'
const SERVICE_KEY = 'c7a65894b38fb2bef77734bdcbc2ae72c33163ca3d1a041e28c4a3bad6ad0209'

export type CorpOutlineItem = {
  crno: string // 법인등록번호
  corpNm: string // 법인명
  corpEnsnNm?: string // 법인영문명
  enpRprFnm?: string // 기업대표자성명
  bzno?: string // 사업자등록번호
  enpEmpeCnt?: string // 기업의 종업원 인원수
  enpEstbDt?: string // 기업의 설립일자
  enpBsadr?: string // 기업의 소재지 기본주소
  enpHmpgUrl?: string // 기업의 홈페이지 주소
  enpTlno?: string // 기업의 전화번호
  enpMainBizNm?: string // 기업이 영위하고 있는 주요 사업의 명칭
  [key: string]: string | undefined
}

export type CorpOutlineResponse = {
  header: {
    resultCode: string
    resultMsg: string
  }
  body: {
    numOfRows: string
    pageNo: string
    totalCount: string
    items?: {
      item?: CorpOutlineItem | CorpOutlineItem[]
    }
  }
}

/**
 * 기업개요조회 API 호출
 * @param corpNm 법인명 (선택)
 * @param crno 법인등록번호 (선택)
 * @returns 기업 개요 정보
 */
export async function getCorpOutline(
  corpNm?: string,
  crno?: string
): Promise<CorpOutlineResponse> {
  const params = new URLSearchParams({
    ServiceKey: SERVICE_KEY,
    pageNo: '1',
    numOfRows: '10',
    resultType: 'json',
  })

  if (corpNm) {
    params.append('corpNm', corpNm)
  }
  if (crno) {
    params.append('crno', crno)
  }

  const url = `${API_BASE_URL}/getCorpOutline_V2?${params.toString()}`

  try {
    const response = await fetch(url)
    if (!response.ok) {
      const text = await response.text()
      console.error('API HTTP 오류:', response.status, text)
      throw new Error(`API 호출 실패: ${response.status}`)
    }
    
    const text = await response.text()
    let data: any
    
    try {
      data = JSON.parse(text)
    } catch (parseError) {
      console.error('JSON 파싱 실패:', text.substring(0, 500))
      throw new Error('API 응답이 JSON 형식이 아닙니다')
    }
    
    // API 응답 구조 확인 및 로깅
    if (!data) {
      throw new Error('API 응답이 비어있습니다')
    }
    
    // 실제 응답 구조 확인 (디버깅용)
    if (corpNm && !data.header && !data.response) {
      console.log('API 응답 구조 (디버깅):', JSON.stringify(data).substring(0, 500))
    }
    
    // response.response 형식인 경우 처리
    if (data.response) {
      return data.response as CorpOutlineResponse
    }
    
    // 직접 header가 있는 경우
    if (data.header) {
      return data as CorpOutlineResponse
    }
    
    // 응답 구조가 다른 경우
    console.error('예상치 못한 API 응답 구조:', Object.keys(data))
    throw new Error('API 응답 구조가 예상과 다릅니다')
  } catch (error) {
    console.error('기업개요조회 API 오류:', error, '회사명:', corpNm)
    throw error
  }
}

/**
 * API 응답에서 직원 수 추출
 * @param item 기업 개요 정보
 * @returns 직원 수 (없으면 null)
 */
export function extractEmployeeCount(item: CorpOutlineItem): number | null {
  if (!item.enpEmpeCnt) return null
  const count = parseInt(item.enpEmpeCnt, 10)
  return isNaN(count) ? null : count
}

/**
 * 여러 회사 중에서 가장 적절한 회사 선택
 * - 정확히 이름이 매칭되는 회사 우선
 * - 직원 수가 가장 많은 회사 선택
 * - 상장된 회사 우선
 * @param items 회사 정보 배열
 * @param searchName 검색한 회사명
 * @returns 가장 적절한 회사 정보
 */
export function selectBestMatch(items: CorpOutlineItem[], searchName: string): CorpOutlineItem | null {
  if (!items || items.length === 0) return null

  // 직원 수가 0보다 큰 회사만 필터링
  const validItems = items.filter(item => {
    const empCount = extractEmployeeCount(item)
    return empCount !== null && empCount > 0
  })

  if (validItems.length === 0) return null

  // 1. 정확히 이름이 매칭되는 회사 찾기
  const exactMatches = validItems.filter(item => {
    // "삼성전자" 검색 시 "삼성전자(주)", "(주)삼성전자", "삼성전자" 모두 매칭
    const name = item.corpNm.replace(/\(주\)|\(유\)/, '').trim()
    const search = searchName.replace(/\(주\)|\(유\)/, '').trim()
    return name === search || item.corpNm === searchName
  })

  // 정확히 매칭되는 회사 중에서 직원 수가 가장 많은 회사
  if (exactMatches.length > 0) {
    return exactMatches.reduce((best, current) => {
      const bestCount = extractEmployeeCount(best) || 0
      const currentCount = extractEmployeeCount(current) || 0
      return currentCount > bestCount ? current : best
    })
  }

  // 2. 상장된 회사 중에서 직원 수가 가장 많은 회사
  const listedCompanies = validItems.filter(item => item.corpRegMrktDcdNm && item.corpRegMrktDcdNm.trim() !== '')
  if (listedCompanies.length > 0) {
    return listedCompanies.reduce((best, current) => {
      const bestCount = extractEmployeeCount(best) || 0
      const currentCount = extractEmployeeCount(current) || 0
      return currentCount > bestCount ? current : best
    })
  }

  // 3. 그 외에는 직원 수가 가장 많은 회사
  return validItems.reduce((best, current) => {
    const bestCount = extractEmployeeCount(best) || 0
    const currentCount = extractEmployeeCount(current) || 0
    return currentCount > bestCount ? current : best
  })
}

/**
 * 여러 회사의 정보를 한 번에 조회
 * @param corpNames 법인명 배열
 * @returns 회사 정보 배열 (직원 수 포함)
 */
export async function getMultipleCorpInfo(
  corpNames: string[]
): Promise<Array<{ name: string; employees: number | null; data?: CorpOutlineItem }>> {
  const results = await Promise.allSettled(
    corpNames.map(async (name) => {
      const response = await getCorpOutline(name)
      const items = response.body.items?.item
      if (!items) return { name, employees: null, data: undefined }

      // 여러 결과가 있을 수 있으므로 배열로 변환
      const itemArray = Array.isArray(items) ? items : [items]

      // 가장 적절한 회사 선택
      const bestMatch = selectBestMatch(itemArray, name)
      if (!bestMatch) return { name, employees: null, data: undefined }

      const employees = extractEmployeeCount(bestMatch)

      return { name, employees, data: bestMatch }
    })
  )

  return results.map((result, index) => {
    if (result.status === 'fulfilled') {
      return result.value
    } else {
      console.error(`회사 정보 조회 실패 (${corpNames[index]}):`, result.reason)
      return { name: corpNames[index], employees: null, data: undefined }
    }
  })
}

