import { AuthContextProvider } from '../../context/AuthContext';
import useAuth from '../../hooks/auth';
import { renderHook } from '@testing-library/react-hooks';

describe('Auth hook', () => {

  it('should be able to sign in with Google Account existing', () => {
    const { result } = renderHook(() => useAuth(), { wrapper: AuthContextProvider });
    

    result.current.signWithGoogle();
    expect(result.current.user).toBeTruthy();
  });

})