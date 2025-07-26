// src/app/edit/page.tsx
"use client";

import { useSearchParams } from 'next/navigation';
import PortfolioEditor from '@/components/PortfolioEditor';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function EditPage() {
  const searchParams = useSearchParams();
  const template = searchParams.get('template') || 'cosmic';
  const portfolioId = searchParams.get('portfolioId');
  
  return (
    <ProtectedRoute>
      <PortfolioEditor 
        initialTemplate={template} 
        portfolioId={portfolioId ? parseInt(portfolioId) : undefined}
      />
    </ProtectedRoute>
  );
}