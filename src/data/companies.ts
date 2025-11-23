export type Company = {
  id: string
  name: string
  employees: number
}

// Dummy company data used by the two game pages
const companies: Company[] = [
  {id: 'c1', name: 'AlphaSoft', employees: 120},
  {id: 'c2', name: 'BetaWorks', employees: 45},
  {id: 'c3', name: 'GammaCorp', employees: 560},
  {id: 'c4', name: 'Delta Systems', employees: 230},
  {id: 'c5', name: 'Epsilon LLC', employees: 12},
  {id: 'c6', name: 'Zeta Labs', employees: 89},
  {id: 'c7', name: 'Eta Solutions', employees: 300},
  {id: 'c8', name: 'Theta Inc', employees: 410},
  {id: 'c9', name: 'Iota Studios', employees: 7},
  {id: 'c10', name: 'Kappa Enterprises', employees: 999},
]

export default companies
