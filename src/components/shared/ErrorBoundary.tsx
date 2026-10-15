import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || <ErrorPage error={this.state.error} />;
    }

    return this.props.children;
  }
}

function ErrorPage({ error }: { error?: Error }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Oops! Terjadi Kesalahan</h1>
        <p className="text-gray-600 mb-4">
          Maaf, terjadi kesalahan yang tidak terduga. Silakan coba refresh halaman atau hubungi administrator.
        </p>
        {error && (
          <details className="text-left bg-gray-100 rounded-lg p-4 mb-4">
            <summary className="cursor-pointer font-semibold text-gray-700">Detail Error</summary>
            <p className="mt-2 text-sm text-gray-600 font-mono">{error.message}</p>
          </details>
        )}
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-[#166534] text-white rounded-lg hover:bg-[#14532d] transition-colors"
        >
          Refresh Halaman
        </button>
      </div>
    </div>
  );
}
