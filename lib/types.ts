// Service types
export enum ServiceType {
  EssayWriting = "Essay Writing",
  ThesisWriting = "Thesis Writing",
  DissertationWriting = "Dissertation Writing",
  ResearchProposal = "Research Proposal",
  LiteratureReview = "Literature Review Writing",
  DataAnalysis = "Data Analysis",
  StatisticsPresentation = "Statistics Presentation",
  DissertationSupervisor = "Dissertation Supervisor",
  AssignmentHelp = "Assignment Help",
  BusinessPlans = "Business Plans",
  AcademicPosters = "Academic Posters",
  Articles = "Articles",
  CaseStudy = "Case Study",
  CustomCoursework = "Custom Coursework Writing",
  Reports = "Reports",
  ProofreadingEditing = "Proofreading and Editing",
  DissertationResults = "Dissertation Results",
  DissertationMethodology = "Dissertation Methodology",
  DissertationIntroduction = "Dissertation Introduction",
  DissertationFindings = "Dissertation Findings",
  DissertationDataAnalysis = "Dissertation Data Analysis",
  DissertationConclusion = "Dissertation Conclusion",
}

export const SERVICE_TYPES = Object.values(ServiceType)

// Academic levels with pricing
export interface AcademicLevel {
  label: string
  value: string
  price: number
}

export const ACADEMIC_LEVELS: AcademicLevel[] = [
  { label: "Bachelor (BA/BSc)", value: "Undergraduate", price: 20.5 },
  { label: "Master (MA/MSc/MBA/MPhil)", value: "Masters", price: 22.5 },
  { label: "PhD", value: "PhD", price: 24.5 },
  { label: "High School", value: "High School", price: 18.5 },
]

// Paper formats
export enum PaperFormat {
  Chicago = "Chicago",
  Harvard = "Harvard",
  APA = "APA",
  MLA = "MLA",
  Other = "Other",
}

export const PAPER_FORMATS = Object.values(PaperFormat)

// Word count map (pages to words)
export const WORD_COUNT_MAP: Record<number, number> = {
  1: 250, 2: 500, 3: 750, 4: 1000, 5: 1250,
  6: 1500, 7: 1750, 8: 2000, 9: 2250, 10: 2500,
  11: 2750, 12: 3000, 13: 3250, 14: 3500, 15: 3750,
  16: 4000, 17: 4250, 18: 4500, 19: 4750, 20: 5000,
}

// Paper type
export interface Paper {
  id: string
  service_type: string
  academic_level: string
  pages: number
  deadline: string // ISO date
  paper_format: string
  paper_format_other?: string
  subject: string
  topic: string
  topics: string[]
  word_count: number
  instructions: string
}

// Uploaded file
export interface UploadedFile {
  name: string
  size: number
  url: string // temp URL from backend
  uploadedAt: string
}

// Order state
export interface OrderFormState {
  // Step 1: Customer info
  first_name: string
  last_name: string
  email: string
  phone: string
  
  // Step 2: Papers
  papers: Paper[]
  
  // Step 3: File uploads
  uploaded_files: UploadedFile[]
  
  // Step 4: Review (calculated)
  total_price: number
}

// API request types
export interface PrepareOrderRequest {
  first_name: string
  last_name: string
  email: string
  phone: string
  papers: Paper[]
  temp_file_urls: string[]
}

export interface PrepareOrderResponse {
  checkout_url: string
}

export interface TempUploadResponse {
  temp_url: string
}
