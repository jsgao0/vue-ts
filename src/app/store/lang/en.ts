
export default {
  getters: {
    text: (): ((text: string) => string) => (
      text: string,
    ): string => text,
  },
}
