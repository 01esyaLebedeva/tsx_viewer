import React from 'react';

const Button = ({ text, onClick, variant = 'primary' }) => {
  const buttonStyle = {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    margin: '5px',
    backgroundColor: variant === 'primary' ? '#007bff' : '#6c757d',
    color: 'white'
  };

  return (
    <button style={buttonStyle} onClick={onClick}>
      {text}
    </button>
  );
};

const SimpleTestComponent = () => {
  const [count, setCount] = React.useState(0);
  const [name] = React.useState('Пользователь');

  const handleIncrement = () => setCount(count + 1);
  const handleDecrement = () => setCount(count - 1);
  const handleReset = () => setCount(0);

  return (
    <div style={{ 
      padding: '20px', 
      fontFamily: 'Arial, sans-serif',
      maxWidth: '600px',
      margin: '0 auto'
    }}>
      <h1 style={{ color: '#333', textAlign: 'center' }}>
        🎉 Простой React Компонент
      </h1>
      
      <div style={{ 
        background: '#f8f9fa', 
        padding: '20px', 
        borderRadius: '10px',
        marginBottom: '20px'
      }}>
        <h2>Привет, {name}! 👋</h2>
        <p>Это простой компонент без сложных TypeScript типов.</p>
      </div>

      <div style={{ 
        background: '#e9ecef', 
        padding: '20px', 
        borderRadius: '10px',
        textAlign: 'center',
        marginBottom: '20px'
      }}>
        <h3>Счетчик: {count}</h3>
        <div>
          <Button text="➕ Увеличить" onClick={handleIncrement} />
          <Button text="➖ Уменьшить" onClick={handleDecrement} />
          <Button text="🔄 Сбросить" onClick={handleReset} variant="secondary" />
        </div>
      </div>

      <div style={{ 
        background: '#d1ecf1', 
        padding: '20px', 
        borderRadius: '10px'
      }}>
        <h3>Информация:</h3>
        <ul style={{ textAlign: 'left' }}>
          <li>✅ Написан на JSX</li>
          <li>✅ Использует React Hooks</li>
          <li>✅ Скомпилирован в браузере</li>
          <li>✅ Полностью интерактивный</li>
        </ul>
      </div>
    </div>
  );
};

export default SimpleTestComponent; 