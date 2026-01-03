import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { showSuccess, showError } from '../utils/toast';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { register, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/home');
    }
  }, [user, navigate]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5000000) {
        showError('Image size should be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.charAt(0).toUpperCase();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !email || !password || !confirmPassword) {
      showError('Please fill in all fields');
      return;
    }

    if (username.length < 2) {
      showError('Username must be at least 2 characters');
      return;
    }

    if (password.length < 6) {
      showError('Password must be at least 6 characters');
      return;
    }

    if (password !== confirmPassword) {
      showError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    const result = await register(username, email, password, profilePicture);
    setIsLoading(false);

    if (result.success) {
      setTimeout(() => navigate('/login', { state: { message: 'Registration successful! Please log in.' } }), 500);
    } else {
      showError(result.message);
    }
  };

  return (
    <div className="h-screen flex overflow-hidden">
      <div className="w-full lg:w-1/2 bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center p-6 overflow-y-auto">
        <div className="max-w-xs w-full">
          <div className="mb-4">
            <h1 className="text-5xl font-bold text-indigo-600 mb-2">TaskFlow</h1>
            <p className="text-gray-600 text-lg">Modern task management made simple</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-5">
          <h2 className="text-lg font-bold text-gray-800 mb-3 text-center">
            Create Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="flex flex-col items-center mb-1">
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-indigo-600 flex items-center justify-center overflow-hidden border-3 border-indigo-200">
                  {previewImage ? (
                    <img src={previewImage} alt="Profile Preview" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-white font-bold text-xl">{getInitials(username)}</span>
                  )}
                </div>
                <label className="absolute bottom-0 right-0 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-1 cursor-pointer transition">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
              <p className="text-xs text-gray-500 mt-1">Upload profile picture</p>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1 text-xs">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition text-sm"
                placeholder="Your username"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1 text-xs">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition text-sm"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1 text-xs">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition text-sm"
                placeholder="••••••••"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1 text-xs">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition text-sm"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition duration-200 disabled:bg-indigo-400 disabled:cursor-not-allowed text-sm"
            >
              {isLoading ? 'Creating Account...' : 'Register'}
            </button>
          </form>

          <div className="mt-3 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-indigo-600 hover:text-indigo-800 font-medium"
              >
                Login here
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

export default RegisterPage;

