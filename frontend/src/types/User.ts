export interface User {
  id: number;
  email: string;
  name?: string;
  consentGiven: boolean;
}
export {}; // ← torna o ficheiro um módulo