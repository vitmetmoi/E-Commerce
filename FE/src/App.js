import './App.scss';
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector, useDispatch } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import { useGetUserDataQuery, useCreateUserMutation } from './store/slice/API/userAPI';
import Home from './container/home/Home.js';
import RouteIndex from './route/RouteIndex.js'
function App() {

  const userData = useSelector((state) => state.user.userData)
  const queryData = useSelector((state) => state.userAPI.queries)
  const mutationData = useSelector((state) => state.userAPI.mutations)
  const dispatch = useDispatch()
  const { data, error, isLoading } = useGetUserDataQuery('ALL');
  const [createUser, { isLoading: createUserLoading }] = useCreateUserMutation();

  return (
    <div className="App">
      <RouteIndex></RouteIndex>

      <ToastContainer position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
