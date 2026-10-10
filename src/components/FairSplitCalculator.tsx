'use client';

import React, { useState, useRef } from 'react';
import { Lightbulb, AlertTriangle } from 'lucide-react';
import { trackCalculatorUse } from '@/lib/analytics';

export default function FairSplitCalculator({
  embedded = false,
  hideHeading = false,
}: {
  embedded?: boolean;
  hideHeading?: boolean;
} = {}) {
  const [partnerAIncome, setPartnerAIncome] = useState(6000);
  const [partnerBIncome, setPartnerBIncome] = useState(4000);
  const [sharedExpenses, setSharedExpenses] = useState(3000);
  const [splitMethod, setSplitMethod] = useState<'proportional' | 'fiftyFifty'>('proportional');

  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const reportUsage = (method = splitMethod, action = 'adjust_inputs') => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(() => {
      trackCalculatorUse({ split_method: method, action });
    }, 800);
  };

  const handleMethodChange = (method: 'proportional' | 'fiftyFifty') => {
    setSplitMethod(method);
    trackCalculatorUse({ split_method: method, action: 'toggle_method' });
  };

  const totalIncome = Math.max(1, partnerAIncome + partnerBIncome);
  const ratioA = partnerAIncome / totalIncome;
  const ratioB = partnerBIncome / totalIncome;

  const pctA = Math.round(ratioA * 1000) / 10;
  const pctB = Math.round(ratioB * 1000) / 10;

  const shareA =
    splitMethod === 'proportional'
      ? Math.round(sharedExpenses * ratioA)
      : Math.round(sharedExpenses / 2);
  const shareB = sharedExpenses - shareA;

  const pctPaycheckA = partnerAIncome > 0 ? ((shareA / partnerAIncome) * 100).toFixed(1) : '0';
  const pctPaycheckB = partnerBIncome > 0 ? ((shareB / partnerBIncome) * 100).toFixed(1) : '0';

  const discretionaryA = partnerAIncome - shareA;
  const discretionaryB = partnerBIncome - shareB;

  const pctRemainingA = partnerAIncome > 0 ? ((discretionaryA / partnerAIncome) * 100).toFixed(1) : '0';
  const pctRemainingB = partnerBIncome > 0 ? ((discretionaryB / partnerBIncome) * 100).toFixed(1) : '0';

  const householdExpenseRatio = totalIncome > 0 ? ((sharedExpenses / totalIncome) * 100).toFixed(1) : '0';

  const calculatorCard = (
    <div
      id="calculator"
      className="bg-[#FFFFFF] p-6 sm:p-10 lg:p-12 rounded-none border border-[#174F4A]/10 shadow-sm space-y-8 w-full"
    >
      {/* Sliders Input Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        <div className="space-y-2">
          <label htmlFor="partner-a-income" className="text-xs font-bold uppercase tracking-wider text-[#174F4A] block">
            Partner A Net Take-Home
          </label>
          <div className="flex items-center gap-2 bg-[#FAF6EF] px-3.5 py-2.5 rounded-none border border-[#174F4A]/15 font-mono text-sm font-bold text-[#174F4A]">
            <span>$</span>
            <input
              id="partner-a-income"
              type="number"
              aria-label="Partner A Monthly Net Income"
              value={partnerAIncome}
              onChange={(e) => {
                setPartnerAIncome(Math.max(0, Number(e.target.value) || 0));
                reportUsage();
              }}
              className="bg-transparent w-full focus:outline-none"
              step={100}
            />
          </div>
          <input
            type="range"
            aria-label="Partner A Income Slider"
            min={500}
            max={20000}
            step={100}
            value={Math.min(20000, Math.max(500, partnerAIncome))}
            onChange={(e) => {
              setPartnerAIncome(Number(e.target.value));
              reportUsage();
            }}
            className="w-full accent-[#174F4A] cursor-pointer"
          />
          <p className="text-[11px] text-[#6F7F7C]">Monthly take-home after tax & deductions</p>
        </div>

        <div className="space-y-2">
          <label htmlFor="partner-b-income" className="text-xs font-bold uppercase tracking-wider text-[#174F4A] block">
            Partner B Net Take-Home
          </label>
          <div className="flex items-center gap-2 bg-[#FAF6EF] px-3.5 py-2.5 rounded-none border border-[#174F4A]/15 font-mono text-sm font-bold text-[#174F4A]">
            <span>$</span>
            <input
              id="partner-b-income"
              type="number"
              aria-label="Partner B Monthly Net Income"
              value={partnerBIncome}
              onChange={(e) => {
                setPartnerBIncome(Math.max(0, Number(e.target.value) || 0));
                reportUsage();
              }}
              className="bg-transparent w-full focus:outline-none"
              step={100}
            />
          </div>
          <input
            type="range"
            aria-label="Partner B Income Slider"
            min={500}
            max={20000}
            step={100}
            value={Math.min(20000, Math.max(500, partnerBIncome))}
            onChange={(e) => {
              setPartnerBIncome(Number(e.target.value));
              reportUsage();
            }}
            className="w-full accent-[#174F4A] cursor-pointer"
          />
          <p className="text-[11px] text-[#6F7F7C]">Monthly take-home after tax & deductions</p>
        </div>

        <div className="space-y-2">
          <label htmlFor="shared-expenses" className="text-xs font-bold uppercase tracking-wider text-[#174F4A] block">
            Shared Monthly Bills
          </label>
          <div className="flex items-center gap-2 bg-[#FAF6EF] px-3.5 py-2.5 rounded-none border border-[#174F4A]/15 font-mono text-sm font-bold text-[#174F4A]">
            <span>$</span>
            <input
              id="shared-expenses"
              type="number"
              aria-label="Total Shared Monthly Expenses"
              value={sharedExpenses}
              onChange={(e) => {
                setSharedExpenses(Math.max(0, Number(e.target.value) || 0));
                reportUsage();
              }}
              className="bg-transparent w-full focus:outline-none"
              step={100}
            />
          </div>
          <input
            type="range"
            aria-label="Shared Monthly Expenses Slider"
            min={500}
            max={15000}
            step={100}
            value={Math.min(15000, Math.max(500, sharedExpenses))}
            onChange={(e) => {
              setSharedExpenses(Number(e.target.value));
              reportUsage();
            }}
            className="w-full accent-[#174F4A] cursor-pointer"
          />
          <p className="text-[11px] text-[#6F7F7C]">Rent, utilities, groceries, joint subscriptions</p>
        </div>
      </div>

      {/* Split Mode Switcher */}
      <div className="flex items-center justify-center gap-3 pt-2">
        <button
          type="button"
          onClick={() => handleMethodChange('proportional')}
          className={`px-5 py-2.5 rounded-none text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
            splitMethod === 'proportional'
              ? 'bg-[#174F4A] text-[#FAF6EF]'
              : 'bg-[#FAF6EF] text-[#6F7F7C] hover:text-[#174F4A]'
          }`}
        >
          Proportional to Income (Fair Split)
        </button>
        <button
          type="button"
          onClick={() => handleMethodChange('fiftyFifty')}
          className={`px-5 py-2.5 rounded-none text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
            splitMethod === 'fiftyFifty'
              ? 'bg-[#174F4A] text-[#FAF6EF]'
              : 'bg-[#FAF6EF] text-[#6F7F7C] hover:text-[#174F4A]'
          }`}
        >
          50 / 50 Equal Split
        </button>
      </div>

      {/* Household Overview Bar */}
      <div className="bg-[#FAF6EF] p-4 border border-[#174F4A]/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
        <div>
          <span className="block text-[11px] uppercase tracking-wider text-[#6F7F7C] font-semibold">Combined Income</span>
          <span className="text-base sm:text-lg font-extrabold text-[#174F4A] font-mono">${totalIncome.toLocaleString()}</span>
        </div>
        <div>
          <span className="block text-[11px] uppercase tracking-wider text-[#6F7F7C] font-semibold">Total Shared Bills</span>
          <span className="text-base sm:text-lg font-extrabold text-[#174F4A] font-mono">${sharedExpenses.toLocaleString()}</span>
        </div>
        <div>
          <span className="block text-[11px] uppercase tracking-wider text-[#6F7F7C] font-semibold">Partner A Income Share</span>
          <span className="text-base sm:text-lg font-extrabold text-[#2C7A73] font-mono">{pctA}%</span>
        </div>
        <div>
          <span className="block text-[11px] uppercase tracking-wider text-[#6F7F7C] font-semibold">Partner B Income Share</span>
          <span className="text-base sm:text-lg font-extrabold text-[#2C7A73] font-mono">{pctB}%</span>
        </div>
      </div>

      {/* Live Calculation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
        <div className="bg-[#FAF6EF] p-6 rounded-none border border-[#174F4A]/10 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6F7F7C]">
              Partner A Contribution
            </span>
            <span className="text-xs font-mono font-bold text-[#2C7A73]">
              {splitMethod === 'proportional' ? `${pctA}% of bills` : '50% of bills'}
            </span>
          </div>
          <div className="text-3xl font-extrabold text-[#174F4A]">
            ${shareA.toLocaleString()}
            <span className="text-xs text-[#6F7F7C] font-normal ml-1">/ month</span>
          </div>
          <div className="space-y-1 text-xs text-[#6F7F7C] border-t border-[#174F4A]/10 pt-3">
            <p className="flex justify-between">
              <span>Share of personal paycheck:</span>
              <strong className="text-[#174F4A] font-mono">{pctPaycheckA}%</strong>
            </p>
            <p className="flex justify-between">
              <span>Remaining personal discretionary:</span>
              <strong className="text-[#174F4A] font-mono">${discretionaryA.toLocaleString()} ({pctRemainingA}%)</strong>
            </p>
          </div>
        </div>

        <div className="bg-[#FAF6EF] p-6 rounded-none border border-[#174F4A]/10 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6F7F7C]">
              Partner B Contribution
            </span>
            <span className="text-xs font-mono font-bold text-[#2C7A73]">
              {splitMethod === 'proportional' ? `${pctB}% of bills` : '50% of bills'}
            </span>
          </div>
          <div className="text-3xl font-extrabold text-[#174F4A]">
            ${shareB.toLocaleString()}
            <span className="text-xs text-[#6F7F7C] font-normal ml-1">/ month</span>
          </div>
          <div className="space-y-1 text-xs text-[#6F7F7C] border-t border-[#174F4A]/10 pt-3">
            <p className="flex justify-between">
              <span>Share of personal paycheck:</span>
              <strong className="text-[#174F4A] font-mono">{pctPaycheckB}%</strong>
            </p>
            <p className="flex justify-between">
              <span>Remaining personal discretionary:</span>
              <strong className="text-[#174F4A] font-mono">${discretionaryB.toLocaleString()} ({pctRemainingB}%)</strong>
            </p>
          </div>
        </div>
      </div>

      {/* Transparent Calculation Breakdown */}
      <div className="bg-[#FFFFFF] p-4 border border-[#174F4A]/15 font-mono text-xs text-[#174F4A] space-y-1.5">
        <p className="font-bold text-[#2C7A73] uppercase tracking-wider text-[11px]">How this calculation was made:</p>
        {splitMethod === 'proportional' ? (
          <>
            <p>• Partner A: ${partnerAIncome.toLocaleString()} ÷ ${totalIncome.toLocaleString()} = {pctA}% share → {pctA}% × ${sharedExpenses.toLocaleString()} = <strong>${shareA.toLocaleString()}/mo</strong></p>
            <p>• Partner B: ${partnerBIncome.toLocaleString()} ÷ ${totalIncome.toLocaleString()} = {pctB}% share → {pctB}% × ${sharedExpenses.toLocaleString()} = <strong>${shareB.toLocaleString()}/mo</strong></p>
          </>
        ) : (
          <p>• Equal 50/50 split: ${sharedExpenses.toLocaleString()} shared bills ÷ 2 = <strong>${shareA.toLocaleString()}/mo each</strong></p>
        )}
      </div>

      {/* Objective Insight */}
      <div className="bg-[#174F4A]/5 p-4 rounded-none text-xs text-[#174F4A] flex items-center justify-center">
        {splitMethod === 'proportional' ? (
          <span className="flex items-center gap-1.5 flex-wrap justify-center text-center">
            <Lightbulb className="w-4 h-4 text-[#F29B7F] shrink-0 inline-block" />
            <span><strong>Proportional balance:</strong> Both partners dedicate approximately {householdExpenseRatio}% of their individual take-home pay toward shared living costs, preserving equal relative proportions of their earnings for personal savings and goals.</span>
          </span>
        ) : (
          <span className="flex items-center gap-1.5 flex-wrap justify-center text-center">
            <AlertTriangle className="w-4 h-4 text-[#E57373] shrink-0 inline-block" />
            <span><strong>Unequal relative burden:</strong> In an equal 50/50 split with different incomes, Partner B pays {pctPaycheckB}% of their paycheck while Partner A pays only {pctPaycheckA}%, leaving the lower earner with substantially less discretionary breathing room.</span>
          </span>
        )}
      </div>
    </div>
  );

  if (embedded && hideHeading) {
    return calculatorCard;
  }

  if (embedded) {
    return (
      <div className="w-full space-y-8">
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
        {calculatorCard}
      </div>
    );
  }

  return (
    <section id="calculator" className="py-20 sm:py-28 bg-[#FAF6EF] border-b border-[#174F4A]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
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
        {calculatorCard}
      </div>
    </section>
  );
}
