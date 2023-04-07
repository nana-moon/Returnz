import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import HomePage from './HomePage';

function ErrorBoundary({ children }) {
  const [hasError, setHasError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (hasError) {
      redirectToMainPage();
    }
  }, [hasError]);

  const componentDidCatch = (error, errorInfo) => {
    console.error('Uncaught error:', error, errorInfo);
    setHasError(true);
  };

  const redirectToMainPage = () => {
    Swal.fire({
      title: `잘못된 접근입니다`,
      text: `메인페이지로 이동합니다.`,
      timer: 1000,
      icon: 'error',
    });
    setTimeout(() => {
      setHasError(true);
      navigate('/');
    }, 1000);
  };

  return (
    <ErrorBoundaryWrapper componentDidCatch={componentDidCatch}>
      {hasError ? <div> 에러가 발생했습니다 </div> : children}
    </ErrorBoundaryWrapper>
  );
}

class ErrorBoundaryWrapper extends React.Component {
  componentDidCatch(error, errorInfo) {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.componentDidCatch(error, errorInfo);
  }

  render() {
    // eslint-disable-next-line react/destructuring-assignment
    return this.props.children;
  }
}

export default ErrorBoundary;
