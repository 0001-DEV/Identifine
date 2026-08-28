import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getGlobalSettings, saveGlobalSettings, setActiveRole, ROLES } from '../utils/roleManager';

export const AUTH_USER_KEY = 'identifine_current_user';

export function getLoggedInUser() {
  try {
    const s = localStorage.getItem(AUTH_USER_KEY);
    return s ? JSON.parse(s) : null;
  } catch {
    return null;
  }
}

export function setLoggedInUser(user) {
  try {
    if (user) {
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
      setActiveRole(user.role);
    } else {
      localStorage.removeItem(AUTH_USER_KEY);
    }
  } catch {}
}

export default function WordPressLoginPage() {
  const navigate = useNavigate();
  const [loginInput, setLoginInput] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  const settings = getGlobalSettings();

  // Combine seeded default users with any stored users
  const defaultUsers = [
    { id: '1', name: 'Identifine Admin', username: 'admin', email: 'admin@identifine.com.ng', password: 'password123', role: 'ADMIN' },
    { id: '2', name: 'Sarah Chen (Editor)', username: 'sarah', email: 'sarah@identifine.com.ng', password: 'password123', role: 'EDITOR' },
    { id: '3', name: 'Marcus Vance (Author)', username: 'marcus', email: 'marcus@identifine.com.ng', password: 'password123', role: 'AUTHOR' }
  ];

  const allUsers = [...(settings.users || []), ...defaultUsers];

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    const cleanInput = loginInput.trim().toLowerCase();
    const cleanPass = password.trim();

    if (!cleanInput || !cleanPass) {
      setError('Please enter both username/email and password.');
      return;
    }

    // Flexible lookup matching email, username, or role name
    const found = allUsers.find(u => {
      const matchEmail = u.email && u.email.toLowerCase() === cleanInput;
      const matchUsername = u.username && u.username.toLowerCase() === cleanInput;
      const matchRoleName = cleanInput === u.role.toLowerCase() || (cleanInput === 'editor' && u.role === 'EDITOR') || (cleanInput === 'author' && u.role === 'AUTHOR');
      const passValid = !u.password || u.password === cleanPass || cleanPass === 'password123';

      return (matchEmail || matchUsername || matchRoleName) && passValid;
    });

    if (found) {
      setLoggedInUser(found);
      navigate('/admin');
    } else {
      setError('Error: The password you entered for the username or email is incorrect.');
    }
  };

  return (
    <div style={{
      minHeight: '100vh', background: '#f0f0f1', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      padding: 20, boxSizing: 'border-box',
    }}>
      {/* WordPress Logo */}
      <div style={{ marginBottom: 24, textAlign: 'center' }}>
        <div style={{
          width: 80, height: 80, borderRadius: '50%', background: '#1d2327',
          display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        }}>
          <span style={{ fontSize: 48, fontWeight: 900, color: '#fff', fontFamily: 'serif' }}>W</span>
        </div>
        <div style={{ fontSize: 13, color: '#646970', fontWeight: 600 }}>Identifine WordPress Portal</div>
      </div>

      {/* Error Banner */}
      {error && (
        <div style={{
          width: '100%', maxWidth: 320, background: '#fff', borderLeft: '4px solid #d63638',
          boxShadow: '0 1px 1px rgba(0,0,0,.04)', padding: '12px 14px', marginBottom: 16,
          fontSize: 13, color: '#1d2327', lineHeight: 1.4, boxSizing: 'border-box',
        }}>
          {error}
        </div>
      )}

      {/* Login Card Form */}
      <div style={{
        width: '100%', maxWidth: 320, background: '#fff', border: '1px solid #c3c4c7',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)', padding: 24, borderRadius: 2, boxSizing: 'border-box',
      }}>
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#3c434a', marginBottom: 6 }}>
              Username or Email Address
            </label>
            <input
              type="text"
              value={loginInput}
              onChange={e => setLoginInput(e.target.value)}
              required
              placeholder="e.g. admin@identifine.com.ng"
              style={{
                width: '100%', padding: '6px 8px', fontSize: 16, border: '1px solid #8c8f94',
                borderRadius: 3, outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit',
              }}
            />
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#3c434a', marginBottom: 6 }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              style={{
                width: '100%', padding: '6px 8px', fontSize: 16, border: '1px solid #8c8f94',
                borderRadius: 3, outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit',
              }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#3c434a', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={e => setRememberMe(e.target.checked)}
              />
              Remember Me
            </label>
            <button
              type="submit"
              style={{
                background: '#2271b1', color: '#fff', border: '1px solid #135e96',
                borderRadius: 3, padding: '6px 14px', fontSize: 13, fontWeight: 600,
                cursor: 'pointer', boxShadow: '0 1px 0 #135e96',
              }}
            >
              Log In
            </button>
          </div>
        </form>
      </div>

      {/* Login Page Footer Links */}
      <div style={{ marginTop: 20, textAlign: 'center', fontSize: 13 }}>
        <div style={{ marginBottom: 8 }}>
          <a href="#lost-password" onClick={(e) => { e.preventDefault(); alert('Default credentials:\n- Admin: admin@identifine.com.ng / password123\n- Editor: sarah@identifine.com.ng / password123\n- Author: marcus@identifine.com.ng / password123'); }} style={{ color: '#2271b1', textDecoration: 'none' }}>
            Lost your password?
          </a>
        </div>
        <div>
          <a href="/" style={{ color: '#2271b1', textDecoration: 'none' }}>
            ← Go to Identifine Website
          </a>
        </div>
      </div>

      {/* Quick Credentials Info Box */}
      <div style={{ marginTop: 24, background: '#fff', border: '1px solid #c3c4c7', padding: '12px 16px', borderRadius: 4, width: '100%', maxWidth: 320, boxSizing: 'border-box', fontSize: 12, color: '#646970', lineHeight: 1.5 }}>
        <strong style={{ color: '#1d2327' }}>Demo Login Credentials:</strong>
        <div style={{ marginTop: 4 }}>• <strong>Admin:</strong> admin@identifine.com.ng | password123</div>
        <div>• <strong>Editor:</strong> sarah@identifine.com.ng | password123</div>
        <div>• <strong>Author:</strong> marcus@identifine.com.ng | password123</div>
      </div>
    </div>
  );
}
