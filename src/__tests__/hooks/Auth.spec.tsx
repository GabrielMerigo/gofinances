import { AuthContextProvider } from '../../context/AuthContext';
import useAuth from '../../hooks/auth';
import { renderHook, act } from '@testing-library/react-hooks';
import { startAsync } from 'expo-auth-session';


jest.mock('expo-auth-session', () => {
  return {
    startAsync: () => ({
      type: 'success',
      params: {
        access_token: 'my-access-token'
      },
      user: {
        id: 'any_id',
        email: 'gabriel.merigo@gmail.com',
        name: 'Rodrigo',
        photo: 'picture'
      }
    })
  }
})

jest.mock('expo-apple-authentication', () => ({}))

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: async () => {}
}))

describe('Auth hook', () => {
  it('should be able to sign in with Google Account existing', async () => {
    const googleMocked = jest.mocked(startAsync as any);
    googleMocked.mockReturnValue({
      type: 'success',
      params: {
        access_token: 'my-access-token'
      },
      user: {
        id: 'any_id',
        email: 'gabriel.merigo@gmail.com',
        name: 'Rodrigo',
        photo: 'picture'
      }
    })


    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve({
        id: `userInfo.id`,
        email: `userInfo.email`,
        name: `useInfo.given_name`,
        photo: `userInfo.picture`,
        locale: `userInfo.locale`,
        verified_email: `userInfo.verified_email`
      })
    })) as jest.Mock;

    const { result } = renderHook(() => useAuth(), { wrapper: AuthContextProvider }); 

    await act(() => result.current.signWithGoogle());
    expect(result.current.user?.email).toBe('gabriel.merigo@gmail.com')
  });

  it('should not connect  if cancel authcation with google', async () => {
    const googleMocked = jest.mocked(startAsync as any);
    googleMocked.mockReturnValue({
      type: 'cancel',
    })

    const { result } = renderHook(() => useAuth(), { wrapper: AuthContextProvider }); 

    await act(() => result.current.signWithGoogle());
    expect(result.current.user)
    .not.toHaveProperty('id');
  });

})