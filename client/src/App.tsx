import { Router } from './Router';
import { observer } from 'mobx-react-lite'
import './styles/style.scss'
import useRequest from './utils/hooks/useRequest';
import { check } from './http/userAPI';
import { useEffect } from 'react';
import { userStore } from './store';
import Loader from './UI/Loader/Loader';
const App = observer(() => {
  const [
    user,
    userIsLoading,
    userError
  ] = useRequest<any>(check());
  useEffect(() => {
    if (user?.id && !userError) {
      if (user.role) {
        userStore.setIsAdmin(user.role)
      }
      userStore.setUser(
        {
          id: user.id,
          users_authorization: { role: user.role, email: user.email },
          image: user.image
        })
    }
  }, [user])
  if (userIsLoading) {
    return (
      <Loader />
    )
  }
  return (
    <Router />
  );
})

export default App;
