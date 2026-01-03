import { useState, useContext, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { showSuccess, showError } from '../utils/toast';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const hasShownToast = useRef(false);

  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user) {
      navigate('/home');
    }
  }, [user, navigate]);

  useEffect(() => {
    if (location.state?.message && !hasShownToast.current) {
      showSuccess(location.state.message);
      hasShownToast.current = true;
    }
  }, [location.state?.message]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      showError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    const result = await login(email, password);
    setIsLoading(false);

    if (result.success) {
      showSuccess('Login successful!');
      setTimeout(() => navigate('/home'), 500);
    } else {
      showError(result.message);
    }
  };

  return (
    <div className="h-screen flex overflow-hidden">
      <div className="w-full lg:w-1/2 bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center p-8 overflow-y-auto">
        <div className="max-w-sm w-full">
          <div className="mb-6">
            <h1 className="text-5xl font-bold text-indigo-600 mb-2">TaskFlow</h1>
            <p className="text-gray-600 text-lg">Modern task management made simple</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
            Welcome Back
            Taskinator !
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1.5 text-sm">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition text-sm"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1.5 text-sm">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition text-sm"
                placeholder="******"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-lg transition duration-200 disabled:bg-indigo-400 disabled:cursor-not-allowed text-sm"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="text-indigo-600 hover:text-indigo-800 font-medium"
              >
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
      </div>
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        <img 
          src="https://media1.tenor.com/m/v9GSIJZ6DSYAAAAC/rabbit-alice-in-wonderland.gif" 
          alt="Alice in Wonderland Rabbit"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default LoginPage;

