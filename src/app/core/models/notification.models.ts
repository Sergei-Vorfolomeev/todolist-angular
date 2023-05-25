export type SeverityType = 'success' | 'error' | 'info'
export interface Notification {
  message: string
  severity: SeverityType
}
