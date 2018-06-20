export interface ServiceHarness<T> {
  setup (): Promise<T>
  destroy (): Promise<void>
}
