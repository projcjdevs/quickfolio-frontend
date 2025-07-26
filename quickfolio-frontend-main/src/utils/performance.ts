// src/utils/performance.ts
import React from 'react';

interface PerformanceMetric {
  name: string;
  value: number;
  timestamp: number;
  metadata?: Record<string, any>;
}

class PerformanceMonitor {
  private metrics: PerformanceMetric[] = [];
  private timers: Map<string, number> = new Map();

  /**
   * Start a performance timer
   */
  startTimer(name: string): void {
    this.timers.set(name, performance.now());
  }

  /**
   * End a performance timer and record the metric
   */
  endTimer(name: string, metadata?: Record<string, any>): number | null {
    const startTime = this.timers.get(name);
    if (!startTime) {
      console.warn(`Timer "${name}" was not started`);
      return null;
    }

    const duration = performance.now() - startTime;
    this.timers.delete(name);
    
    this.recordMetric(name, duration, metadata);
    return duration;
  }

  /**
   * Record a custom metric
   */
  recordMetric(name: string, value: number, metadata?: Record<string, any>): void {
    this.metrics.push({
      name,
      value,
      timestamp: Date.now(),
      metadata
    });

    // Keep only last 100 metrics to prevent memory leaks
    if (this.metrics.length > 100) {
      this.metrics = this.metrics.slice(-100);
    }

    // Log performance issues in development
    if (process.env.NODE_ENV === 'development') {
      if (name.includes('api') && value > 2000) {
        console.warn(`Slow API call detected: ${name} took ${value.toFixed(2)}ms`);
      } else if (name.includes('render') && value > 100) {
        console.warn(`Slow render detected: ${name} took ${value.toFixed(2)}ms`);
      }
    }
  }

  /**
   * Get metrics for a specific operation
   */
  getMetrics(name?: string): PerformanceMetric[] {
    if (name) {
      return this.metrics.filter(metric => metric.name === name);
    }
    return [...this.metrics];
  }

  /**
   * Get average time for a specific operation
   */
  getAverageTime(name: string): number {
    const metrics = this.getMetrics(name);
    if (metrics.length === 0) return 0;
    
    const total = metrics.reduce((sum, metric) => sum + metric.value, 0);
    return total / metrics.length;
  }

  /**
   * Clear all metrics
   */
  clear(): void {
    this.metrics = [];
    this.timers.clear();
  }

  /**
   * Measure component render time
   */
  measureRender<T>(componentName: string, renderFn: () => T): T {
    this.startTimer(`render:${componentName}`);
    try {
      const result = renderFn();
      this.endTimer(`render:${componentName}`);
      return result;
    } catch (error) {
      this.endTimer(`render:${componentName}`, { error: true });
      throw error;
    }
  }

  /**
   * Measure API call time
   */
  async measureApiCall<T>(
    endpoint: string, 
    apiCall: () => Promise<T>
  ): Promise<T> {
    this.startTimer(`api:${endpoint}`);
    try {
      const result = await apiCall();
      this.endTimer(`api:${endpoint}`, { success: true });
      return result;
    } catch (error) {
      this.endTimer(`api:${endpoint}`, { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      });
      throw error;
    }
  }

  /**
   * Monitor Core Web Vitals
   */
  monitorWebVitals(): void {
    if (typeof window === 'undefined') return;

    // Monitor Largest Contentful Paint (LCP)
    if ('PerformanceObserver' in window) {
      try {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          if (lastEntry) {
            this.recordMetric('web-vital:lcp', lastEntry.startTime);
          }
        });
        observer.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (error) {
        console.warn('Failed to observe LCP:', error);
      }
    }

    // Monitor First Input Delay (FID)
    if ('PerformanceObserver' in window) {
      try {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            if (entry.processingStart && entry.startTime) {
              const fid = entry.processingStart - entry.startTime;
              this.recordMetric('web-vital:fid', fid);
            }
          });
        });
        observer.observe({ entryTypes: ['first-input'] });
      } catch (error) {
        console.warn('Failed to observe FID:', error);
      }
    }

    // Monitor Cumulative Layout Shift (CLS)
    if ('PerformanceObserver' in window) {
      try {
        let clsValue = 0;
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          });
          this.recordMetric('web-vital:cls', clsValue);
        });
        observer.observe({ entryTypes: ['layout-shift'] });
      } catch (error) {
        console.warn('Failed to observe CLS:', error);
      }
    }
  }
}

// Export singleton instance
export const performanceMonitor = new PerformanceMonitor();

// Auto-start monitoring in browser environment
if (typeof window !== 'undefined') {
  performanceMonitor.monitorWebVitals();
}

/**
 * HOC for measuring component render performance
 */
export function withPerformanceMonitoring<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  componentName?: string
) {
  const name = componentName || WrappedComponent.displayName || WrappedComponent.name || 'Component';
  
  return function PerformanceMonitoredComponent(props: P) {
    return performanceMonitor.measureRender(name, () => {
      return React.createElement(WrappedComponent, props);
    });
  };
}

/**
 * Hook for measuring operation performance
 */
export function usePerformanceTimer() {
  return {
    start: (name: string) => performanceMonitor.startTimer(name),
    end: (name: string, metadata?: Record<string, any>) => performanceMonitor.endTimer(name, metadata),
    record: (name: string, value: number, metadata?: Record<string, any>) => 
      performanceMonitor.recordMetric(name, value, metadata),
    getMetrics: (name?: string) => performanceMonitor.getMetrics(name),
    getAverage: (name: string) => performanceMonitor.getAverageTime(name)
  };
}
