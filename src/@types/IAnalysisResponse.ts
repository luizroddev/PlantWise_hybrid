export interface IAnalysisResponse {
  analise: {
    planta: string;
    doenca: string;
    doencaEncontrada: boolean;
  };
  description: string;
}
