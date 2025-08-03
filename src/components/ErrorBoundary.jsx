import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Error durumunda state'i güncelle
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Error'u logla
    console.error("Error Boundary caught an error:", error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  render() {
    if (this.state.hasError) {
      // Error durumunda fallback UI
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            padding: "20px",
            textAlign: "center",
            backgroundColor: "#f5f5f5",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "30px",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              maxWidth: "500px",
            }}
          >
            <h2 style={{ color: "#ff4d4f", marginBottom: "16px" }}>Bir hata oluştu</h2>
            <p style={{ color: "#666", marginBottom: "20px" }}>Uygulama beklenmeyen bir hata ile karşılaştı. Lütfen sayfayı yenileyin.</p>
            <button
              onClick={() => window.location.reload()}
              style={{
                backgroundColor: "#1890ff",
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              Sayfayı Yenile
            </button>
            {process.env.NODE_ENV === "development" && this.state.error && (
              <details
                style={{
                  marginTop: "20px",
                  textAlign: "left",
                  backgroundColor: "#f0f0f0",
                  padding: "10px",
                  borderRadius: "4px",
                }}
              >
                <summary style={{ cursor: "pointer", fontWeight: "bold" }}>Hata Detayları (Development)</summary>
                <pre
                  style={{
                    fontSize: "12px",
                    overflow: "auto",
                    marginTop: "10px",
                  }}
                >
                  {this.state.error && this.state.error.toString()}
                  <br />
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
