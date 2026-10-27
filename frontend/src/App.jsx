
import { useState } from 'react';
import './App.css';

function App() {
  const [page, setPage] = useState('welcome');

  return (
    <main className="app">
      <div className="glow glow-one"></div>
      <div className="glow glow-two"></div>

      <header className="header">
        <a className="logo" href="#" onClick={() => setPage('welcome')}>
          GAME<span>HUB</span>
        </a>
      </header>

      {page === 'welcome' && (
        <section className="welcome">
          <p className="eyebrow">YOUR GAMING SPACE</p>

          <h1>
            WELCOME TO
            <span>GAMEHUB</span>
          </h1>

          <p className="subtitle">
            Твоя игровая вселенная начинается здесь
          </p>

          <button
            className="glass-button"
            onClick={() => setPage('login')}
          >
            Войти в аккаунт <span>→</span>
          </button>

          <button
            className="text-button"
            onClick={() => setPage('register')}
          >
            Ещё нет аккаунта? Зарегистрироваться
          </button>
        </section>
      )}

      {page === 'login' && (
        <section className="auth-card">
          <p className="eyebrow">WELCOME BACK</p>
          <h1>Вход</h1>
          <p className="subtitle">Рады видеть тебя снова</p>

          <form onSubmit={(event) => event.preventDefault()}>
            <label htmlFor="login-email">Электронная почта</label>
            <input
              id="login-email"
              type="email"
              placeholder="name@example.com"
              required
            />

            <label htmlFor="login-password">Пароль</label>
            <input
              id="login-password"
              type="password"
              placeholder="Введи пароль"
              required
            />

            <button className="glass-button" type="submit">
              Войти <span>→</span>
            </button>
          </form>

          <button className="text-button" onClick={() => setPage('welcome')}>
            ← На главную
          </button>

          <button className="text-button" onClick={() => setPage('register')}>
            Нет аккаунта? Зарегистрироваться
          </button>
        </section>
      )}

      {page === 'register' && (
        <section className="auth-card">
          <p className="eyebrow">JOIN THE COMMUNITY</p>
          <h1>Регистрация</h1>
          <p className="subtitle">Создай свой аккаунт GAMEHUB</p>

          <form onSubmit={(event) => event.preventDefault()}>
            <label htmlFor="register-name">Имя пользователя</label>
            <input
              id="register-name"
              type="text"
              placeholder="Твой никнейм"
              required
            />

            <label htmlFor="register-email">Электронная почта</label>
            <input
              id="register-email"
              type="email"
              placeholder="name@example.com"
              required
            />

            <label htmlFor="register-password">Пароль</label>
            <input
              id="register-password"
              type="password"
              placeholder="Придумай пароль"
              minLength={8}
              required
            />

            <button className="glass-button" type="submit">
              Создать аккаунт <span>→</span>
            </button>
          </form>

          <button className="text-button" onClick={() => setPage('login')}>
            Уже есть аккаунт? Войти
          </button>

          <button className="text-button" onClick={() => setPage('welcome')}>
            ← На главную
          </button>
        </section>
      )}

      <footer className="footer">
        GAMEHUB <span>© 2026</span>
      </footer>
    </main>
  );
}

export default App;
