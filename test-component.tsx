import React from 'react';

interface ButtonProps {
  text: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ text, onClick, variant = 'primary' }) => {
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

const TestComponent: React.FC = () => {
  const [count, setCount] = React.useState(0);
  const [name, setName] = React.useState('Пользователь');

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
        🎉 Тестовый React Компонент
      </h1>
      
      <div style={{ 
        background: '#f8f9fa', 
        padding: '20px', 
        borderRadius: '10px',
        marginBottom: '20px'
      }}>
        <h2>Привет, {name}! 👋</h2>
        <p>Это интерактивный компонент, созданный в TSX и скомпилированный в браузере.</p>
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
        <h3>Информация о компоненте:</h3>
        <ul style={{ textAlign: 'left' }}>
          <li>✅ Написан на TypeScript + JSX</li>
          <li>✅ Использует React Hooks (useState)</li>
          <li>✅ Имеет типизированные пропсы</li>
          <li>✅ Скомпилирован в браузере</li>
          <li>✅ Полностью интерактивный</li>
        </ul>
      </div>
    </div>
  );
};

export default TestComponent; 