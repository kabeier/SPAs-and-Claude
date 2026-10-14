// Tiny inline SVG icons (no icon library needed).
// They inherit color from the text around them via currentColor.

const base = {
  width: 22,
  height: 22,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2.2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

export const HomeIcon = () => (
  <svg {...base}>
    <path d="M3 11 12 4l9 7" />
    <path d="M5 10v10h14V10" />
  </svg>
)

// A barbell, for the Log tab
export const BarbellIcon = () => (
  <svg {...base}>
    <path d="M2 12h20" />
    <rect x="4" y="7" width="3" height="10" rx="0.5" />
    <rect x="17" y="7" width="3" height="10" rx="0.5" />
  </svg>
)

export const HistoryIcon = () => (
  <svg {...base}>
    <path d="M8 6h13M8 12h13M8 18h13" />
    <path d="M3 6h.01M3 12h.01M3 18h.01" />
  </svg>
)

export const TrashIcon = () => (
  <svg {...base} width={20} height={20}>
    <path d="M4 7h16M10 11v6M14 11v6" />
    <path d="M6 7l1 13h10l1-13M9 7V4h6v3" />
  </svg>
)

export const ChevronIcon = () => (
  <svg {...base} width={20} height={20}>
    <path d="m9 6 6 6-6 6" />
  </svg>
)

export const BackIcon = () => (
  <svg {...base} width={20} height={20}>
    <path d="m15 6-6 6 6 6" />
  </svg>
)

export const TrophyIcon = ({ size = 18 }) => (
  <svg {...base} width={size} height={size} strokeWidth={2}>
    <path d="M8 4h8v5a4 4 0 0 1-8 0V4Z" fill="currentColor" />
    <path d="M8 6H5a3 3 0 0 0 3 4M16 6h3a3 3 0 0 1-3 4M12 13v4M8 20h8M10 17h4" />
  </svg>
)
