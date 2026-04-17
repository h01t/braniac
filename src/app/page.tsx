"use client";
import dynamic from 'next/dynamic';
import IngestBar from '@/components/IngestBar';

const GraphView = dynamic(() => import('@/components/GraphView'), { ssr: false });

export default function Home() {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <GraphView />
      <IngestBar />
    </div>
  );
}
