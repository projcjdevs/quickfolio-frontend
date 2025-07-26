// src/utils/portfolioConverter.ts
import { PortfolioData, DEFAULT_PROFILE } from '@/components/types';
import { PortfolioDetail, PortfolioBlock } from '@/services/portfolioApi';

/**
 * Converts backend portfolio blocks to frontend PortfolioData format
 */
export function convertBackendToFrontend(portfolio: PortfolioDetail): {
  data: PortfolioData;
  templateId: string;
} {
  let portfolioData: PortfolioData = DEFAULT_PROFILE;
  let templateId = 'cosmic';

  if (portfolio.blocks && portfolio.blocks.length > 0) {
    // Look for portfolio-data block
    const dataBlock = portfolio.blocks.find(block => block.type === 'portfolio-data');
    
    if (dataBlock && dataBlock.content) {
      try {
        const blockData = typeof dataBlock.content === 'string' 
          ? JSON.parse(dataBlock.content) 
          : dataBlock.content;
        
        portfolioData = {
          ...DEFAULT_PROFILE,
          ...blockData,
          contact: { ...DEFAULT_PROFILE.contact, ...(blockData.contact || {}) },
          config: {
            colors: { ...DEFAULT_PROFILE.config?.colors, ...(blockData.config?.colors || {}) },
            particleDensity: blockData.config?.particleDensity || 50
          }
        };
        
        templateId = blockData.templateId || 'cosmic';
      } catch (parseErr) {
        console.error('Error parsing portfolio content:', parseErr);
      }
    }

    // Alternative: Handle individual blocks by type
    // This is for future extensibility when we have different block types
    const educationBlocks = portfolio.blocks.filter(block => block.type === 'education');
    const experienceBlocks = portfolio.blocks.filter(block => block.type === 'experience');
    const contactBlocks = portfolio.blocks.filter(block => block.type === 'contact');

    // You can implement specific conversion logic for each block type here
    // For now, we're using the portfolio-data approach
  }

  return { data: portfolioData, templateId };
}

/**
 * Converts frontend PortfolioData to backend blocks format
 */
export function convertFrontendToBackend(
  portfolioData: PortfolioData, 
  templateId: string
): PortfolioBlock[] {
  return [
    {
      id: 0, // Will be set by backend
      type: 'portfolio-data',
      content: {
        ...portfolioData,
        templateId
      },
      displayOrder: 1
    }
  ];
}

/**
 * Creates portfolio content request for backend
 */
export function createPortfolioContentRequest(
  portfolioData: PortfolioData,
  templateId: string
) {
  return {
    blocks: [
      {
        type: 'portfolio-data',
        content: {
          ...portfolioData,
          templateId
        },
        displayOrder: 1
      }
    ]
  };
}
