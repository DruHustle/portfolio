import { Component, ReactNode, ErrorInfo } from "react";
import ComingSoon from "@/pages/ComingSoon";

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
        <ComingSoon
          error={this.state.error || undefined}
          resetError={this.handleReset}
          isDevelopment={process.env.NODE_ENV === "development"}
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
