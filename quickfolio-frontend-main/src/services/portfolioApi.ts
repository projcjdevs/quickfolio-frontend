// src/services/portfolioApi.ts
import { PortfolioData } from '@/components/types';
import { getStoredToken, removeStoredToken, isTokenExpired } from '@/utils/tokenUtils';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

// Types for backend API responses
export interface PortfolioSummary {
  id: number;
  name: string;
  isActive: boolean;
}

export interface PortfolioDetail {
  id: number;
  name: string;
  blocks: PortfolioBlock[];
}

export interface PortfolioBlock {
  id: number;
  type: string;
  content: any;
  displayOrder: number;
}

export interface CreatePortfolioRequest {
  name: string;
}

export interface SetActivePortfolioRequest {
  portfolioId: number | null;
}

// API Service Class
class PortfolioApiService {
  private getAuthHeaders(): HeadersInit {
    const token = getStoredToken();
    
    if (token) {
      // Check if token is expired
      if (isTokenExpired(token)) {
        removeStoredToken();
        throw new Error('Authentication token expired. Please re-login.');
      }
      
      return {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      };
    }
    
    return {
      'Content-Type': 'application/json',
    };
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      
      // Handle specific authentication errors
      if (response.status === 401) {
        const token = getStoredToken();
        if (!token) {
          throw new Error('No authentication token found. Please login.');
        } else {
          removeStoredToken();
          throw new Error('Authentication token invalid or expired. Please re-login.');
        }
      }
      
      // Handle other HTTP errors
      if (response.status === 403) {
        throw new Error('Access forbidden. You may not have permission for this operation.');
      }
      
      if (response.status === 404) {
        throw new Error('Resource not found. The portfolio may have been deleted.');
      }
      
      if (response.status === 429) {
        throw new Error('Too many requests. Please wait a moment and try again.');
      }
      
      if (response.status >= 500) {
        throw new Error('Server error. Please try again later.');
      }
      
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    
    // Handle 204 No Content responses
    if (response.status === 204) {
      return undefined as T;
    }
    
    return response.json();
  }

  // Get all portfolios for current user
  async getMyPortfolios(): Promise<PortfolioSummary[]> {
    const response = await fetch(`${API_BASE_URL}/api/portfolios`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse<PortfolioSummary[]>(response);
  }

  // Create a new portfolio
  async createPortfolio(request: CreatePortfolioRequest): Promise<PortfolioSummary> {
    const response = await fetch(`${API_BASE_URL}/api/portfolios`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(request),
    });
    return this.handleResponse<PortfolioSummary>(response);
  }

  // Get portfolio details by ID
  async getPortfolioDetails(portfolioId: number): Promise<PortfolioDetail> {
    const response = await fetch(`${API_BASE_URL}/api/portfolios/${portfolioId}`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse<PortfolioDetail>(response);
  }

  // Delete a portfolio
  async deletePortfolio(portfolioId: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/api/portfolios/${portfolioId}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch {
        errorData = { message: errorText };
      }
      
      // Handle specific authentication errors
      if (response.status === 401) {
        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error('No authentication token found. Please login.');
        } else {
          throw new Error('Authentication token invalid or expired. Please re-login.');
        }
      }
      
      throw new Error(errorData.message || errorData.error || `HTTP error! status: ${response.status}`);
    }
  }

  // Set active portfolio
  async setActivePortfolio(portfolioId: number | null): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/api/portfolios/active`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ portfolioId }),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      
      // Handle specific authentication errors
      if (response.status === 401) {
        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error('No authentication token found. Please login.');
        } else {
          throw new Error('Authentication token invalid or expired. Please re-login.');
        }
      }
      
      throw new Error(errorData.message || errorData.error || `HTTP error! status: ${response.status}`);
    }
    
    // No need to parse JSON for 204 No Content response
  }

  // Duplicate portfolio (create with same content)
  async duplicatePortfolio(portfolioId: number, newName: string): Promise<PortfolioSummary> {
    // First get the original portfolio details
    const originalPortfolio = await this.getPortfolioDetails(portfolioId);
    
    // Create new portfolio
    const newPortfolio = await this.createPortfolio({ name: newName });
    
    // Set the content if there are blocks
    if (originalPortfolio.blocks.length > 0) {
      await this.setPortfolioContent(newPortfolio.id, {
        blocks: originalPortfolio.blocks.map(block => ({
          type: block.type,
          content: block.content,
          displayOrder: block.displayOrder
        }))
      });
    }
    
    return newPortfolio;
  }

  // Set portfolio content
  async setPortfolioContent(portfolioId: number, content: { blocks: any[] }): Promise<PortfolioBlock[]> {
    const response = await fetch(`${API_BASE_URL}/api/portfolios/${portfolioId}/content`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(content),
    });
    return this.handleResponse<PortfolioBlock[]>(response);
  }

  // Update portfolio name (we'll need to add this endpoint to backend)
  async updatePortfolioName(portfolioId: number, name: string): Promise<void> {
    // This endpoint doesn't exist yet in the backend - we'll need to add it
    // For now, we'll skip this functionality
    throw new Error('Update portfolio name functionality not yet implemented in backend');
  }

  // Get public portfolio by username
  async getPublicPortfolio(username: string): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/public/portfolios/${username}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    return this.handleResponse<any>(response);
  }
}

export const portfolioApi = new PortfolioApiService();
