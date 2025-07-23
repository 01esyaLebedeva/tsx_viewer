import React, { useState } from 'react';

const emoji = {
  Calendar: '📅',
  Target: '🎯',
  Trophy: '🏆',
  Clock: '⏰',
  Dumbbell: '🏋️',
  CheckCircle: '✅',
  Circle: '⚪',
  ChevronRight: '▶️',
  ChevronLeft: '◀️',
  Star: '⭐',
  Flame: '🔥',
  Users: '👥',
};

const WorkoutProgram = () => {
  const [currentWeek, setCurrentWeek] = useState(1);
  const [completedWorkouts, setCompletedWorkouts] = useState(new Set());
  const [activeDay, setActiveDay] = useState(null);

  const toggleWorkout = (workoutId) => {
    const newCompleted = new Set(completedWorkouts);
    if (newCompleted.has(workoutId)) {
      newCompleted.delete(workoutId);
    } else {
      newCompleted.add(workoutId);
    }
    setCompletedWorkouts(newCompleted);
  };

  const weeks = {
    1: {
      title: "НЕДЕЛЯ 1-2: АДАПТАЦИЯ И ОСНОВЫ",
      description: "Изучение техники, укрепление коленей, привыкание к нагрузке",
      workouts: [
        {
          id: 'w1-mon',
          day: 'Понедельник',
          type: 'Силовая А',
          duration: '15-20 мин',
          focus: 'Ноги + ягодицы',
          exercises: [
            { name: 'Приседания на стул', sets: 2, reps: '8-10', weight: '1кг', note: 'Для коленей!' },
            { name: 'Подъемы на носки с весом', sets: 2, reps: '12-15', weight: '2x1кг' },
            { name: 'Отведение ноги назад стоя', sets: 2, reps: '10 каждой', weight: 'Без веса' },
            { name: 'Подъемы ноги в сторону лежа', sets: 2, reps: '8-10 каждой', weight: 'Без веса', note: 'Для "галифе"' }
          ]
        },
        {
          id: 'w1-wed',
          day: 'Среда',
          type: 'Силовая Б',
          duration: '15-20 мин',
          focus: 'Ноги + укрепление коленей',
          exercises: [
            { name: 'Подъемы на ступеньку', sets: 2, reps: '6-8 каждой', weight: '1кг' },
            { name: 'Мостик ягодичный', sets: 2, reps: '10-12', weight: '1кг на живот' },
            { name: 'Выпады назад к стулу', sets: 2, reps: '5-6 каждой', weight: 'Без веса', note: 'Осторожно!' },
            { name: 'Подъемы прямой ноги лежа', sets: 2, reps: '8 каждой', weight: 'Без веса' }
          ]
        },
        {
          id: 'w1-fri',
          day: 'Пятница',
          type: 'Комби',
          duration: '18-20 мин',
          focus: 'Силовая + легкое кардио',
          exercises: [
            { name: 'Силовой блок', sets: 1, reps: 'Каждое по 8-12', weight: '1кг', note: '8 минут' },
            { name: 'Кардио блок', sets: 8, reps: '30 сек работа/30 сек отдых', weight: 'Без веса', note: '8 минут' }
          ]
        }
      ]
    },
    2: {
      title: "НЕДЕЛЯ 3-4: ПРОГРЕССИЯ",
      description: "Увеличение нагрузки, добавление резинок, новые упражнения",
      workouts: [
        {
          id: 'w2-mon',
          day: 'Понедельник',
          type: 'Силовая А+',
          duration: '20-25 мин',
          focus: 'Ноги + ягодицы + резинки',
          exercises: [
            { name: 'Приседания с резинкой', sets: 3, reps: '12-15', weight: '2кг', note: 'Резинка на бедрах' },
            { name: 'Подъемы на носки с весом', sets: 3, reps: '15-18', weight: '2x1кг' },
            { name: 'Отведение ноги назад с резинкой', sets: 3, reps: '12 каждой', weight: 'Резинка' },
            { name: 'Боковые выпады с опорой', sets: 2, reps: '8-10 каждой', weight: '1кг' }
          ]
        },
        {
          id: 'w2-wed',
          day: 'Среда',
          type: 'Силовая Б+',
          duration: '20-25 мин',
          focus: 'Укрепление + прогрессия',
          exercises: [
            { name: 'Подъемы на ступеньку', sets: 3, reps: '10-12 каждой', weight: '2кг' },
            { name: 'Мостик ягодичный', sets: 3, reps: '15-18', weight: '2кг на живот' },
            { name: 'Отведение ноги в сторону с резинкой', sets: 2, reps: '12 каждой', weight: 'Резинка' },
            { name: 'Подъемы прямой ноги лежа', sets: 3, reps: '12 каждой', weight: 'Без веса' }
          ]
        },
        {
          id: 'w2-fri',
          day: 'Пятница',
          type: 'Комби+',
          duration: '22-25 мин',
          focus: 'Интенсивная комби',
          exercises: [
            { name: 'Силовой блок усиленный', sets: 2, reps: 'Каждое по 10-15', weight: '2кг', note: '10 минут' },
            { name: 'Кардио блок интенсивный', sets: 10, reps: '40 сек работа/20 сек отдых', weight: 'С резинками', note: '10 минут' }
          ]
        }
      ]
    }
  };

  const goals = [
    { icon: '🎯', text: "Подтянуть мышцы", color: "bg-pink-100 text-pink-600" },
    { icon: '🔥', text: "Убрать жир", color: "bg-orange-100 text-orange-600" },
    { icon: '⭐', text: "Улучшить форму", color: "bg-purple-100 text-purple-600" },
    { icon: '🏆', text: "Укрепить колени", color: "bg-green-100 text-green-600" }
  ];

  const equipment = [
    { name: "Гантели 1кг", count: "4 шт.", price: "есть", status: "✅" },
    { name: "Резинки/петли", count: "средняя жесткость", price: "200-500₽", status: "🛒" },
    { name: "Коврик для йоги", count: "1 шт.", price: "300-800₽", status: "🛒" }
  ];

  const results = [
    "Укрепленные колени - меньше болей при ходьбе",
    "Подтянутые ягодицы и бедра",
    "Улучшенная выносливость",
    "Привычка к регулярным тренировкам",
    "Более четкий рельеф ног"
  ];

  const WorkoutCard = ({ workout }) => {
    const isCompleted = completedWorkouts.has(workout.id);
    const isActive = activeDay === workout.id;
    
    return (
      <div className={`border-2 rounded-xl p-6 transition-all duration-300 ${
        isCompleted ? 'border-green-300 bg-green-50' : 'border-gray-200 bg-white'
      } ${isActive ? 'ring-4 ring-blue-200 shadow-lg' : 'hover:shadow-md'}`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${
              isCompleted ? 'bg-green-100' : 'bg-blue-100'
            }`}>
              <span style={{fontSize: 20}}>{emoji.Dumbbell}</span>
            </div>
            <div>
              <h3 className="font-bold text-lg">{workout.day}</h3>
              <p className="text-sm text-gray-600">{workout.type}</p>
            </div>
          </div>
          <button
            onClick={() => toggleWorkout(workout.id)}
            className="transition-colors duration-200"
          >
            {isCompleted ? 
              <span style={{fontSize: 22}}>{emoji.CheckCircle}</span> : 
              <span style={{fontSize: 22}}>{emoji.Circle}</span>
            }
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center space-x-2">
            <span style={{fontSize: 16}}>{emoji.Clock}</span>
            <span className="text-sm font-medium">{workout.duration}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span style={{fontSize: 16}}>{emoji.Target}</span>
            <span className="text-sm font-medium">{workout.focus}</span>
          </div>
        </div>

        <button
          onClick={() => setActiveDay(activeDay === workout.id ? null : workout.id)}
          className="w-full py-2 px-4 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          <span>{isActive ? 'Скрыть упражнения' : 'Показать упражнения'}</span>
          <span style={{fontSize: 16}}>{emoji.ChevronRight}</span>
        </button>

        {isActive && (
          <div className="mt-4 space-y-3 animate-in slide-in-from-top-2 duration-300">
            {workout.exercises.map((exercise, idx) => (
              <div key={idx} className="bg-gray-50 rounded-lg p-3">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-gray-800">{exercise.name}</h4>
                  {exercise.note && (
                    <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
                      {exercise.note}
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-3 gap-2 text-sm text-gray-600">
                  <div><strong>Подходы:</strong> {exercise.sets}</div>
                  <div><strong>Повторы:</strong> {exercise.reps}</div>
                  <div><strong>Вес:</strong> {exercise.weight}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const completedCount = completedWorkouts.size;
  const totalWorkouts = Object.values(weeks).reduce((sum, week) => sum + week.workouts.length, 0);
  const progressPercentage = (completedCount / totalWorkouts) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
            🏋️‍♀️ ПРОГРАММА "КРАСИВЫЕ НОГИ"
          </h1>
          <p className="text-xl text-gray-600 mb-6">4 недели к красивым и сильным ногам</p>
          
          {/* Progress Bar */}
          <div className="bg-white rounded-lg p-4 shadow-sm mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Прогресс выполнения</span>
              <span className="text-sm font-bold text-gray-900">{completedCount}/{totalWorkouts}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-pink-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">{Math.round(progressPercentage)}% завершено</p>
          </div>
        </div>

        {/* Goals */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {goals.map((goal, idx) => (
            <div key={idx} className={`${goal.color} rounded-lg p-4 text-center`}>
              <span style={{fontSize: 24, display: 'block', marginBottom: 8}}>{goal.icon}</span>
              <p className="text-sm font-medium">{goal.text}</p>
            </div>
          ))}
        </div>

        {/* Week Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-2 shadow-sm">
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentWeek(1)}
                className={`px-6 py-2 rounded-lg font-medium transition-colors duration-200 ${
                  currentWeek === 1 
                    ? 'bg-blue-500 text-white' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Недели 1-2
              </button>
              <button
                onClick={() => setCurrentWeek(2)}
                className={`px-6 py-2 rounded-lg font-medium transition-colors duration-200 ${
                  currentWeek === 2 
                    ? 'bg-blue-500 text-white' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Недели 3-4
              </button>
            </div>
          </div>
        </div>

        {/* Current Week */}
        <div className="mb-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {weeks[currentWeek].title}
            </h2>
            <p className="text-gray-600">{weeks[currentWeek].description}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {weeks[currentWeek].workouts.map((workout) => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
          </div>
        </div>

        {/* Bottom Info Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Equipment */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <span style={{fontSize: 20, marginRight: 8}}>{emoji.Dumbbell}</span>
              Оборудование
            </h3>
            <div className="space-y-3">
              {equipment.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">{item.count}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{item.price}</p>
                    <span className="text-lg">{item.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Results */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <span style={{fontSize: 20, marginRight: 8}}>{emoji.Trophy}</span>
              Результаты через 4 недели
            </h3>
            <div className="space-y-3">
              {results.map((result, idx) => (
                <div key={idx} className="flex items-start space-x-3">
                  <span style={{fontSize: 18, marginTop: 2}}>{emoji.CheckCircle}</span>
                  <p className="text-gray-700">{result}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Important Rules */}
        <div className="mt-8 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-6 border-l-4 border-red-400">
          <h3 className="text-xl font-bold text-red-800 mb-4">⚠️ Важные правила</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold text-red-700 mb-2">Для коленей:</h4>
              <ul className="space-y-1 text-red-600">
                <li>• НЕ приседай глубже 90° первые 2 недели</li>
                <li>• Всегда разминайся перед тренировкой</li>
                <li>• Останавливайся при боли</li>
                <li>• Укрепляй постепенно</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-red-700 mb-2">Техника безопасности:</h4>
              <ul className="space-y-1 text-red-600">
                <li>• Держи спину прямо</li>
                <li>• Дыши равномерно</li>
                <li>• Контролируй движения</li>
                <li>• Пей воду во время тренировки</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Motivation */}
        <div className="mt-8 text-center bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl p-8">
          <h3 className="text-2xl font-bold mb-4">🏆 Мотивация</h3>
          <p className="text-lg mb-2">Первые результаты видны через 2-3 недели</p>
          <p className="text-lg mb-4">Значительные изменения - через 4-6 недель!</p>
          <p className="text-2xl font-bold">Никаких отговорок! 💪 Ты справишься!</p>
        </div>
      </div>
    </div>
  );
};

export default WorkoutProgram; 