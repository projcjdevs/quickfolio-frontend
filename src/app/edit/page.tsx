// src/app/edit/page.tsx
"use client";

import { useSearchParams } from 'next/navigation';
import PortfolioEditor from '@/components/PortfolioEditor';

export default function EditPage() {
  const searchParams = useSearchParams();
  const template = searchParams.get('template') || 'cosmic';
  
  return <PortfolioEditor initialTemplate={template} />;
}