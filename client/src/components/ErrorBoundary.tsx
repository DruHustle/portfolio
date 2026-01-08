import { cn } from "@/lib/utils";
import { AlertTriangle, RotateCcw } from "lucide-react";
import { Component, ReactNode, ErrorInfo } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

/**
 * ErrorBoundary Component
 * Enhanced error boundary with better error handling and user feedback
 * Implements proper error logging and recovery options
 */
class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null,
      errorInfo: null 
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error details for debugging and monitoring
    console.error('Error caught by ErrorBoundary:', error);
    console.error('Component stack:', errorInfo.componentStack);
    
    this.setState({ errorInfo });
  }

  handleReset = () => {
    this.setState({ 
      hasError: false, 
      error: null,
      errorInfo: null 
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-screen p-8 bg-background">
          <div className="flex flex-col items-center w-full max-w-2xl p-8">
            <AlertTriangle
              size={48}
              className="text-destructive mb-6 flex-shrink-0"
            />

            <h2 className="text-2xl font-bold mb-2">An unexpected error occurred</h2>
            <p className="text-muted-foreground mb-6 text-center">
              We apologize for the inconvenience. Please try refreshing the page or contact support if the problem persists.
            </p>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="w-full p-4 rounded bg-muted mb-6 max-h-48 overflow-auto">
                <summary className="cursor-pointer font-semibold text-muted-foreground">
                  Error Details (Development Only)
                </summary>
                <pre className="text-sm text-destructive whitespace-break-spaces mt-2">
                  {this.state.error?.stack}
                </pre>
                {this.state.errorInfo?.componentStack && (
                  <pre className="text-sm text-muted-foreground whitespace-break-spaces mt-2">
                    {this.state.errorInfo.componentStack}
                  </pre>
                )}
              </details>
            )}

            <div className="flex gap-3 w-full">
              <button
                onClick={this.handleReset}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg",
                  "bg-primary text-primary-foreground",
                  "hover:opacity-90 cursor-pointer transition-opacity"
                )}
              >
                <RotateCcw size={16} />
                Try Again
              </button>
              <button
                onClick={() => window.location.href = '/'}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg",
                  "bg-secondary text-secondary-foreground",
                  "hover:opacity-90 cursor-pointer transition-opacity"
                )}
              >
                Go Home
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
