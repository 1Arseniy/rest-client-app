import { Link } from 'react-router';

function WelcomePanel() {
  return (
    <div>
      <h1 className="text-center text-3xl mb-2">Welcome!</h1>
      <div className="text-center">
        <Link className="hover:underline mr-2" to="/sign-in">
          Sign In
        </Link>
        <Link className="hover:underline" to="/sign-up">
          Sign Up
        </Link>
      </div>
    </div>
  );
}

export default WelcomePanel;
