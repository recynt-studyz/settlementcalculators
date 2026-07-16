import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Free Settlement Calculators 2026'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #334155 100%)',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: 88, fontWeight: 900, color: 'white', marginBottom: 20, lineHeight: 1 }}>
          ⚖
        </div>
        <div
          style={{
            fontSize: 52,
            fontWeight: 800,
            color: 'white',
            textAlign: 'center',
            lineHeight: 1.15,
            marginBottom: 20,
            maxWidth: 900,
          }}
        >
          Free Settlement Calculators 2026
        </div>
        <div
          style={{
            fontSize: 22,
            color: 'rgba(255,255,255,0.72)',
            textAlign: 'center',
            marginBottom: 40,
            maxWidth: 820,
            lineHeight: 1.4,
          }}
        >
          Personal injury, car accident, workers comp, divorce and debt settlement calculators. Free estimates for all 50 states.
        </div>
        <div style={{ display: 'flex', gap: 16 }}>
          {['Free', 'All 50 States', 'Private', 'No Signup'].map((label) => (
            <div
              key={label}
              style={{
                background: 'rgba(255,255,255,0.12)',
                border: '1px solid rgba(255,255,255,0.25)',
                borderRadius: 100,
                padding: '8px 22px',
                color: 'white',
                fontSize: 18,
                fontWeight: 500,
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  )
}
