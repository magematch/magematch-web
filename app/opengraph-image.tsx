import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#FFF7ED',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px',
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 'bold',
            color: '#F97316',
          }}
        >
          MageMatch
        </div>
        <div
          style={{
            fontSize: 32,
            color: '#374151',
            marginTop: 20,
            textAlign: 'center',
          }}
        >
          The Magento Developer Marketplace
        </div>
        <div
          style={{
            fontSize: 24,
            color: '#9CA3AF',
            marginTop: 16,
          }}
        >
          magematch.com
        </div>
      </div>
    ),
    { ...size },
  );
}