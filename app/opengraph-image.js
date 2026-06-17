import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Burn Notice Co custom laser engraving';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          overflow: 'hidden',
          background:
            'radial-gradient(circle at 18% 18%, rgba(255, 90, 26, 0.22), transparent 34%), radial-gradient(circle at 82% 78%, rgba(255, 138, 58, 0.16), transparent 32%), linear-gradient(135deg, #080605 0%, #120d09 48%, #050403 100%)',
          color: '#f4f1ea',
          fontFamily: 'Arial Black, Impact, sans-serif',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(0deg, rgba(255,255,255,0.028) 1px, transparent 1px)',
            backgroundSize: '76px 76px',
            opacity: 0.5,
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: -140,
            top: 110,
            width: 720,
            height: 8,
            background:
              'linear-gradient(90deg, transparent, rgba(255, 90, 26, 0.95), rgba(255, 215, 106, 0.95), transparent)',
            transform: 'rotate(-18deg)',
            filter: 'blur(1px)',
            boxShadow: '0 0 34px rgba(255, 90, 26, 0.9)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: -130,
            bottom: 124,
            width: 760,
            height: 7,
            background:
              'linear-gradient(90deg, transparent, rgba(255, 215, 106, 0.9), rgba(255, 90, 26, 0.9), transparent)',
            transform: 'rotate(-18deg)',
            filter: 'blur(1px)',
            boxShadow: '0 0 34px rgba(255, 90, 26, 0.8)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 70,
            right: 70,
            top: 58,
            bottom: 58,
            border: '1px solid rgba(244, 241, 234, 0.16)',
            borderRadius: 20,
            boxShadow:
              'inset 0 0 0 1px rgba(255, 90, 26, 0.08), 0 28px 80px rgba(0,0,0,0.55)',
          }}
        />
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            padding: '78px 92px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 18,
              color: '#ff8a3a',
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
              fontSize: 25,
              letterSpacing: 7,
              textTransform: 'uppercase',
              marginBottom: 26,
            }}
          >
            <span>[</span>
            <span>Custom Woodworking · Laser Engraving</span>
            <span>]</span>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              lineHeight: 0.86,
              letterSpacing: -5,
              fontSize: 126,
              textTransform: 'uppercase',
              color: '#ff6a1f',
              textShadow:
                '0 0 22px rgba(255, 90, 26, 0.42), 0 0 54px rgba(255, 90, 26, 0.24)',
            }}
          >
            <span>BURN</span>
            <span>NOTICE</span>
            <span>CO.</span>
          </div>
          <div
            style={{
              width: 740,
              height: 2,
              marginTop: 34,
              marginBottom: 30,
              background:
                'linear-gradient(90deg, #ff5a1a, rgba(255, 215, 106, 0.86), transparent)',
              boxShadow: '0 0 18px rgba(255, 90, 26, 0.7)',
            }}
          />
          <div
            style={{
              display: 'flex',
              color: '#e8e2d4',
              fontFamily: 'Arial, Helvetica, sans-serif',
              fontSize: 36,
              fontWeight: 700,
              letterSpacing: -0.8,
              maxWidth: 900,
            }}
          >
            Custom engraved work for the people, places, and pieces that need
            to last.
          </div>
          <div
            style={{
              display: 'flex',
              gap: 18,
              marginTop: 34,
              color: 'rgba(232, 226, 212, 0.68)',
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
              fontSize: 23,
              textTransform: 'uppercase',
              letterSpacing: 2,
            }}
          >
            <span>Drinkware</span>
            <span>/</span>
            <span>Wood</span>
            <span>/</span>
            <span>Signs</span>
            <span>/</span>
            <span>Custom Gifts</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
