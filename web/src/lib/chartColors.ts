import { useTheme, type Theme } from './theme.ts'

/** SVG öznitelikleri CSS değişkeni okumadığı için grafik renkleri temaya göre buradan verilir. */
const PALETTES: Record<Theme, { main: string; base: string; warn: string; crit: string; ok: string; tick: string; grid: string; tooltipBg: string; tooltipInk: string }> = {
  dark: { main: '#5aa9ff', base: '#a3b3cf', warn: '#ffc15a', crit: '#ff8a8a', ok: '#6ee7a0', tick: '#a3b3cf', grid: '#263a5e', tooltipBg: '#0a1224', tooltipInk: '#e8eef9' },
  light: { main: '#1d64c2', base: '#6b7a92', warn: '#a86a00', crit: '#c42634', ok: '#1b7448', tick: '#4c5b74', grid: '#cfd8e6', tooltipBg: '#ffffff', tooltipInk: '#101b2e' },
}

export function useChartColors() {
  return PALETTES[useTheme().theme]
}
