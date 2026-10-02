'use client';

import React, { useState } from 'react';
import { Lightbulb, AlertTriangle } from 'lucide-react';

export default function FairSplitCalculator({
  embedded = false,
  hideHeading = false,
}: {
  embedded?: boolean;
  hideHeading?: boolean;
} = {}) {
  const [partnerAIncome, setPartnerAIncome] = useState(4800);
  const [partnerBIncome, setPartnerBIncome] = useState(3200);
  const [sharedExpenses, setSharedExpenses] = useState(3200);
  const [splitMethod, setSplitMethod] = useState<'proportional' | 'fiftyFifty'>('proportional');

  const totalIncome = Math.max(1, partnerAIncome + partnerBIncome);
  const ratioA = partnerAIncome / totalIncome;
  const ratioB = partnerBIncome / totalIncome;

  const shareA =
    splitMethod === 'proportional'
      ? Math.round(sharedExpenses * ratioA)
      : Math.round(sharedExpenses / 2);
  const shareB = sharedExpenses - shareA;

  const discretionaryA = partnerAIncome - shareA;
  const discretionaryB = partnerBIncome - shareB;

  const content = (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {!hideHeading && (
        <div className="text-center space-y-4 mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#174F4A] tracking-tight">
            See how proportional fairness feels in real life.
          </h2>
          <p className="text-sm sm:text-base text-[#6F7F7C] max-w-2xl mx-auto">
            Test your own numbers below. Compare how a rigid 50/50 split feels compared to Togetherly’s income-weighted proportional fair split.
          </p>
        </div>
      )}

      <div className="bg-[#FFFFFF] p-6 sm:p-10 rounded-none border border-[#174F4A]/10 shadow-none space-y-8">
          {/* Sliders Input Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#174F4A] block">
                Partner A Net Income
              </label>
              <div className="flex items-center gap-2 bg-[#FAF6EF] px-3.5 py-2.5 rounded-none border border-[#174F4A]/15 font-mono text-sm font-bold text-[#174F4A]">
                <span>$</span>
                <input
                  type="number"
                  value={partnerAIncome}
                  onChange={(e) => setPartnerAIncome(Number(e.target.value) || 0)}
                  className="bg-transparent w-full focus:outline-none"
                  step={100}
                />
              </div>
              <input
                type="range"
                min={1500}
                max={12000}
                step={100}
                value={partnerAIncome}
                onChange={(e) => setPartnerAIncome(Number(e.target.value))}
                className="w-full accent-[#174F4A] cursor-pointer"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#174F4A] block">
                Partner B Net Income
              </label>
              <div className="flex items-center gap-2 bg-[#FAF6EF] px-3.5 py-2.5 rounded-none border border-[#174F4A]/15 font-mono text-sm font-bold text-[#174F4A]">
                <span>$</span>
                <input
                  type="number"
                  value={partnerBIncome}
                  onChange={(e) => setPartnerBIncome(Number(e.target.value) || 0)}
                  className="bg-transparent w-full focus:outline-none"
                  step={100}
                />
              </div>
              <input
                type="range"
                min={1500}
                max={12000}
                step={100}
                value={partnerBIncome}
                onChange={(e) => setPartnerBIncome(Number(e.target.value))}
                className="w-full accent-[#174F4A] cursor-pointer"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#174F4A] block">
                Shared Monthly Expenses
              </label>
              <div className="flex items-center gap-2 bg-[#FAF6EF] px-3.5 py-2.5 rounded-none border border-[#174F4A]/15 font-mono text-sm font-bold text-[#174F4A]">
                <span>$</span>
                <input
                  type="number"
                  value={sharedExpenses}
                  onChange={(e) => setSharedExpenses(Number(e.target.value) || 0)}
                  className="bg-transparent w-full focus:outline-none"
                  step={100}
                />
              </div>
              <input
                type="range"
                min={1000}
                max={8000}
                step={100}
                value={sharedExpenses}
                onChange={(e) => setSharedExpenses(Number(e.target.value))}
                className="w-full accent-[#174F4A] cursor-pointer"
              />
            </div>
          </div>

          {/* Split Mode Switcher */}
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={() => setSplitMethod('proportional')}
              className={`px-5 py-2.5 rounded-none text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
                splitMethod === 'proportional'
                  ? 'bg-[#174F4A] text-[#FAF6EF]'
                  : 'bg-[#FAF6EF] text-[#6F7F7C] hover:text-[#174F4A]'
              }`}
            >
              Proportional to Income (Fair Split)
            </button>
            <button
              onClick={() => setSplitMethod('fiftyFifty')}
              className={`px-5 py-2.5 rounded-none text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
                splitMethod === 'fiftyFifty'
                  ? 'bg-[#174F4A] text-[#FAF6EF]'
                  : 'bg-[#FAF6EF] text-[#6F7F7C] hover:text-[#174F4A]'
              }`}
            >
              50 / 50 Equal Split
            </button>
          </div>

          {/* Live Calculation Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
            <div className="bg-[#FAF6EF] p-6 rounded-none border border-[#174F4A]/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#6F7F7C]">
                  Partner A Contribution
                </span>
                <span className="text-xs font-mono font-bold text-[#2C7A73]">
                  {splitMethod === 'proportional' ? `${Math.round(ratioA * 100)}%` : '50%'}
                </span>
              </div>
              <div className="text-3xl font-extrabold text-[#174F4A]">
                ${shareA.toLocaleString()}
                <span className="text-xs text-[#6F7F7C] font-normal ml-1">/ month</span>
              </div>
              <p className="text-xs text-[#6F7F7C] border-t border-[#174F4A]/10 pt-2">
                Remaining personal discretionary: <strong className="text-[#174F4A] font-bold">${discretionaryA.toLocaleString()}</strong>
              </p>
            </div>

            <div className="bg-[#FAF6EF] p-6 rounded-none border border-[#174F4A]/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#6F7F7C]">
                  Partner B Contribution
                </span>
                <span className="text-xs font-mono font-bold text-[#2C7A73]">
                  {splitMethod === 'proportional' ? `${Math.round(ratioB * 100)}%` : '50%'}
                </span>
              </div>
              <div className="text-3xl font-extrabold text-[#174F4A]">
                ${shareB.toLocaleString()}
                <span className="text-xs text-[#6F7F7C] font-normal ml-1">/ month</span>
              </div>
              <p className="text-xs text-[#6F7F7C] border-t border-[#174F4A]/10 pt-2">
                Remaining personal discretionary: <strong className="text-[#174F4A] font-bold">${discretionaryB.toLocaleString()}</strong>
              </p>
            </div>
          </div>

          {/* Emotional Takeaway */}
          <div className="bg-[#174F4A]/5 p-4 rounded-none text-center text-xs text-[#174F4A] flex items-center justify-center">
            {splitMethod === 'proportional' ? (
              <span className="flex items-center gap-1.5 flex-wrap justify-center">
                <Lightbulb className="w-4 h-4 text-[#F29B7F] shrink-0 inline-block" />
                <strong>Harmony achieved:</strong> Each partner contributes the exact same percentage of their income toward shared life. Neither partner feels taken advantage of or financially strained.
              </span>
            ) : (
              <span className="flex items-center gap-1.5 flex-wrap justify-center">
                <AlertTriangle className="w-4 h-4 text-[#E57373] shrink-0 inline-block" />
                <strong>Notice the strain:</strong> With a 50/50 split when incomes differ, the lower earner pays a far larger share of their paycheck, leading to quiet financial anxiety and friction.
              </span>
            )}
          </div>
        </div>
      </div>
  );

  if (embedded) {
    return <div id="calculator" className="w-full">{content}</div>;
  }

  return (
    <section id="calculator" className="py-20 sm:py-28 bg-[#FAF6EF] border-b border-[#174F4A]/10">
      {content}
    </section>
  );
}
