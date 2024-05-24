import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './css/index.css';
import App from './layouts/App';
import NewOperation from './layouts/NewOperation';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const router = createBrowserRouter([

  {
    path: "/",
    element: <App />
  },
  {
    path: "/new_operation",
    element: <NewOperation />
  }
])

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const queryClient = new QueryClient();

root.render(
  <QueryClientProvider client={queryClient}>
    <Navbar />
    <RouterProvider router={router} />
    <Footer />
  </QueryClientProvider>
);
