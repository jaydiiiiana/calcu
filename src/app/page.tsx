'use client';

import { useState } from 'react';

export default function Home() {
  const [display, setDisplay] = useState('0');
  const [history, setHistory] = useState<string[]>([]);
  const [showPrank, setShowPrank] = useState(false);
  const [isPremium, setIsPremium] = useState(false);

  const handleNumber = (num: string) => {
    if (display === '0') {
      setDisplay(num);
    } else {
      setDisplay(prev => prev + num);
    }
  };

  const handleOperator = (op: string) => {
    if (display.endsWith(' ')) return;
    setDisplay(prev => prev + ' ' + op + ' ');
  };

  const handleClear = () => {
    setDisplay('0');
    setHistory([]);
  };

  const handleCalculate = () => {
    if (!isPremium) {
      setHistory([display]);
      setShowPrank(true);
      return;
    }

    try {
      let expression = display
        .replace(/÷/g, '/')
        .replace(/×/g, '*')
        .replace(/−/g, '-');

      if (!expression || expression.endsWith(' ')) return;

      // eslint-disable-next-line no-eval
      const result = eval(expression);
      
      setHistory([display]);
      setDisplay(String(result));
    } catch (error) {
      setDisplay('Error');
      setTimeout(() => setDisplay('0'), 1500);
    }
  };

  const upgradeToPremium = () => {
    setIsPremium(true);
    setShowPrank(false);
    // Automatically calculate after "upgrading"
    handleCalculate();
  };

  return (
    <main className="container">
      <div className="calculator-card">
        <div className="display-section">
          <div className="history">{history[history.length - 1] || ''}</div>
          <div className="main-display">
            {display}
            {isPremium && <span className="premium-badge">PREMIUM</span>}
          </div>
        </div>
        
        <div className="keypad">
          <button className="btn func" onClick={handleClear}>AC</button>
          <button className="btn func">+/-</button>
          <button className="btn func">%</button>
          <button className="btn operator" onClick={() => handleOperator('÷')}>÷</button>
          
          <button className="btn" onClick={() => handleNumber('7')}>7</button>
          <button className="btn" onClick={() => handleNumber('8')}>8</button>
          <button className="btn" onClick={() => handleNumber('9')}>9</button>
          <button className="btn operator" onClick={() => handleOperator('×')}>×</button>
          
          <button className="btn" onClick={() => handleNumber('4')}>4</button>
          <button className="btn" onClick={() => handleNumber('5')}>5</button>
          <button className="btn" onClick={() => handleNumber('6')}>6</button>
          <button className="btn operator" onClick={() => handleOperator('-')}>-</button>
          
          <button className="btn" onClick={() => handleNumber('1')}>1</button>
          <button className="btn" onClick={() => handleNumber('2')}>2</button>
          <button className="btn" onClick={() => handleNumber('3')}>3</button>
          <button className="btn operator" onClick={() => handleOperator('+')}>+</button>
          
          <button className="btn zero" onClick={() => handleNumber('0')}>0</button>
          <button className="btn" onClick={() => handleNumber('.')}>.</button>
          <button className="btn operator equals" onClick={handleCalculate}>=</button>
        </div>
      </div>

      {showPrank && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="crown-icon">💎</div>
            <h2>Premium Result Locked</h2>
            <p>Free users are limited to viewing the expression. Upgrade to see the result of <strong>{display}</strong>.</p>
            
            <div className="pricing-tiers">
              <div className="tier">
                <h3>Starter</h3>
                <div className="price">$9.99<span>/mo</span></div>
                <ul>
                  <li>Basic Addition</li>
                  <li>10 calculations/day</li>
                </ul>
                <button className="buy-btn" onClick={upgradeToPremium}>Upgrade</button>
              </div>
              <div className="tier featured">
                <div className="badge">Best Value</div>
                <h3>Diamond</h3>
                <div className="price">$49.99<span>/mo</span></div>
                <ul>
                  <li>All Operators unlocked</li>
                  <li>Unlimited results</li>
                  <li>Priority calculation</li>
                </ul>
                <button className="buy-btn featured" onClick={upgradeToPremium}>Get Diamond</button>
              </div>
            </div>
            
            <button className="close-btn" onClick={() => setShowPrank(false)}>Maybe later</button>
          </div>
        </div>
      )}

      <style jsx global>{`
        .premium-badge {
          font-size: 10px;
          background: linear-gradient(45deg, #ffd700, #ff8c00);
          color: black;
          padding: 2px 6px;
          border-radius: 4px;
          font-weight: 800;
          position: absolute;
          top: 10px;
          left: 10px;
          letter-spacing: 1px;
        }
        
        .display-section {
          position: relative;
        }
      `}</style>
    </main>
  );
}
