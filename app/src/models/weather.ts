interface WeatherProps {
  idnum: number;
  temperature: number;
  main: string;
  icon: string;
  speed: number;
  humidity: number;
  currenttime: string;
}

interface WeatherListprops {
  dt: string;
  icon: string;
  id: number;
  idnum: number;
  main: string;
  temperature: number
}

interface LanguageProps {
  language: string
}

interface indexSignature {
  [prop: string]: string;
}

export type { WeatherProps, WeatherListprops, LanguageProps, indexSignature }