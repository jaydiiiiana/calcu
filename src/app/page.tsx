'use client';

import { useState } from 'react';

export default function Home() {
  const [display, setDisplay] = useState('0');
  const [showPrank, setShowPrank] = useState(false);
  const [history, setHistory] = useState<string[]>([]);

  const handleNumber = (num: string) => {
    if (display === '0') {
      setDisplay(num);
    } else {
      setDisplay(prev => prev + num);
    }
  };

  const handleOperator = (op: string) => {
    setDisplay(prev => prev + ' ' + op + ' ');
  };

  const handleClear = () => {
    setDisplay('0');
    setHistory([]);
  };

  const triggerPrank = () => {
    // Add current display to history to make it look like it's about to calculate
    setHistory([display]);
    
    // Small delay to make it feel like "processing"
    setTimeout(() => {
      setShowPrank(true);
    }, 400);
  };

  return (
    <main className="container">
      <div className="calculator-card">
        <div className="display-section">
          <div className="history">{history[history.length - 1] || ''}</div>
          <div className="main-display">{display}</div>
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
          <button className="btn operator equals" onClick={triggerPrank}>=</button>
        </div>
      </div>

      {showPrank && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="crown-icon">💎</div>
            <h2>Unlock Calculation</h2>
            <p>You've reached the limit of free calculations. Please upgrade to our Diamond Membership to see the result of <strong>{display}</strong>.</p>
            
            <div className="pricing-tiers">
              <div className="tier">
                <h3>Starter</h3>
                <div className="price">$9.99<span>/mo</span></div>
                <ul>
                  <li>Basic Addition</li>
                  <li>10 calculations/day</li>
                </ul>
                <button className="buy-btn" onClick={() => alert('Processing... Error: Payment Gateway Timeout')}>Upgrade</button>
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
                <button className="buy-btn featured" onClick={() => alert('Processing... Error: Credit Card Declined (Prank Mode Active)')}>Get Diamond</button>
              </div>
            </div>
            
            <button className="close-btn" onClick={() => setShowPrank(false)}>Maybe later</button>
          </div>
        </div>
      )}
    </main>
  );
}
