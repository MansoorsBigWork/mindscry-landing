'use client';

import React, { useState } from 'react';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mnnlqwpo';

export default function MindScryLanding() {
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState('');
  const [answers, setAnswers] = useState({
    why: '',
    frequency: '',
    feature: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const handleEmailSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.includes('@')) {
      alert('Please enter a valid email address.');
      return;
    }
    setStep(1);
  };

  const handleAnswerChange = (
    field: keyof typeof answers,
    value: string
  ) => {
    setAnswers((prev) => ({ ...prev, [field]: value }));
  };

  const handleQuestionSubmit = async (
    field: 'why' | 'frequency' | 'feature',
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (field === 'why') {
      if (!answers.why) {
        alert('Please pick an answer.');
        return;
      }
      setStep(2);
      return;
    }

    if (field === 'frequency') {
      if (!answers.frequency) {
        alert('Please pick an answer.');
        return;
      }
      setStep(3);
      return;
    }

    if (field === 'feature') {
      if (!answers.feature.trim()) {
        alert('Please type a feature.');
        return;
      }

      try {
        setSubmitting(true);

        const res = await fetch(FORMSPREE_ENDPOINT, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            why: answers.why,
            frequency: answers.frequency,
            feature: answers.feature,
          }),
        });

        if (res.ok) {
          setStep(4);
        } else {
          alert('There was a problem submitting your response. Please try again later.');
        }
      } catch (err) {
        console.error(err);
        alert('Network error while submitting. Please try again later.');
      } finally {
        setSubmitting(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <style>{`
        @keyframes improveGradient {
          0% { background-position: 200% 0; }
          100% { background-position: 0 0; }
        }
        .improve-text {
          background-image: linear-gradient(90deg, #4f46e5, #38bdf8, #4f46e5);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: improveGradient 3s linear infinite;
          text-shadow: 0 0 12px rgba(79, 70, 229, 0.2);
        }
      `}</style>

      {/* Header */}
      <header
        className="sticky top-0 z-10 bg-white/70 border-b border-slate-200 backdrop-blur"
        style={{ WebkitBackdropFilter: 'blur(8px)', backdropFilter: 'blur(8px)' }}
      >
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-blue-400" />
            <span className="text-lg font-semibold tracking-tight text-slate-900">
              MindScry
            </span>
          </div>
          <nav className="hidden sm:flex items-center gap-6 text-sm">
            <a href="#features" className="hover:text-indigo-700">
              Features
            </a>
            <a href="#how" className="hover:text-indigo-700">
              How it works
            </a>
            <a href="#faq" className="hover:text-indigo-700">
              FAQ
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          data-testid="hero-gradient"
          className="absolute inset-0 bg-gradient-to-b from-indigo-50 to-transparent"
          aria-hidden="true"
        />
        <div className="max-w-6xl mx-auto px-4 py-16 sm:py-24 relative">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-3xl sm:text-5xl font-bold leading-tight tracking-tight space-y-1">
                <div>Journal Better →</div>
                <div>See Patterns →</div>
                <div className="improve-text">Improve.</div>
              </h1>
              <p className="mt-4 text-lg text-slate-600">
                MindScry turns your journal (text or voice) into trends, patterns, and
                correlations, helping you understand how emotions and behaviour
                evolve over time.
              </p>

              {/* Step 0: email */}
              {step === 0 && (
                <>
                  <form
                    className="mt-6 flex flex-col sm:flex-row gap-3"
                    onSubmit={handleEmailSubmit}
                  >
                    <input
                      data-testid="email-input"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      aria-label="Email address"
                      className="w-full sm:w-80 rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <button
                      type="submit"
                      className="rounded-xl bg-indigo-600 px-5 py-3 text-white font-medium hover:bg-indigo-700 active:bg-indigo-800"
                    >
                      Join the early access list
                    </button>
                  </form>
                  <p className="mt-2 text-sm text-slate-500">
                    No spam. Early testers get bonus insight reports.
                  </p>
                </>
              )}

              {/* Step 1: Why do you journal? */}
              {step === 1 && (
                <form
                  onSubmit={(e) => handleQuestionSubmit('why', e)}
                  className="mt-6 space-y-3"
                >
                  <p className="font-medium text-slate-700">
                    Why do you journal (pick most relevant):
                  </p>
                  {[
                    'to write down my emotions',
                    'to record what I did during a day',
                    'to ponder about deep thoughts and ideas',
                  ].map((opt) => (
                    <label key={opt} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="why"
                        value={opt}
                        onChange={(e) => handleAnswerChange('why', e.target.value)}
                        required
                      />
                      <span>{opt}</span>
                    </label>
                  ))}
                  <button
                    type="submit"
                    className="mt-3 rounded-xl bg-indigo-600 px-5 py-2 text-white font-medium hover:bg-indigo-700"
                  >
                    Submit
                  </button>
                </form>
              )}

              {/* Step 2: Frequency */}
              {step === 2 && (
                <form
                  onSubmit={(e) => handleQuestionSubmit('frequency', e)}
                  className="mt-6 space-y-3"
                >
                  <p className="font-medium text-slate-700">
                    How often do you journal?
                  </p>
                  {['rarely', 'two - five days a week', '5+ days a week'].map((opt) => (
                    <label key={opt} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="frequency"
                        value={opt}
                        onChange={(e) => handleAnswerChange('frequency', e.target.value)}
                        required
                      />
                      <span>{opt}</span>
                    </label>
                  ))}
                  <button
                    type="submit"
                    className="mt-3 rounded-xl bg-indigo-600 px-5 py-2 text-white font-medium hover:bg-indigo-700"
                  >
                    Submit
                  </button>
                </form>
              )}

              {/* Step 3: Feature text */}
              {step === 3 && (
                <form
                  onSubmit={(e) => handleQuestionSubmit('feature', e)}
                  className="mt-6"
                >
                  <p className="font-medium text-slate-700">
                    What is a feature you would like to see?
                  </p>
                  <div className="mt-3">
                    <input
                      type="text"
                      required
                      onChange={(e) => handleAnswerChange('feature', e.target.value)}
                      placeholder="Type your answer"
                      className="w-full sm:w-80 rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="mt-4 rounded-xl bg-indigo-600 px-5 py-2 text-white font-medium hover:bg-indigo-700 disabled:opacity-60"
                  >
                    {submitting ? 'Submitting...' : 'Submit'}
                  </button>
                </form>
              )}

              {/* Step 4: Thank you */}
              {step === 4 && (
                <div className="mt-6 p-6 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-800 text-lg font-medium">
                  Warm welcome to the MindScry family.
                </div>
              )}
            </div>

            {/* Mockup card */}
            <div className="relative">
              <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-5">
                <div className="flex items-center justify-between">
                  <div className="h-2 w-16 rounded-full bg-slate-200" />
                  <div className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-slate-300" />
                    <span className="h-2 w-2 rounded-full bg-slate-300" />
                    <span className="h-2 w-2 rounded-full bg-slate-300" />
                  </div>
                </div>
                <div className="mt-5 grid grid-cols-12 gap-3">
                  <div className="col-span-7">
                    <div className="h-40 rounded-xl bg-gradient-to-tr from-indigo-200 to-indigo-100" />
                    <div className="mt-3 space-y-2">
                      <div className="h-3 w-9/12 bg-slate-200 rounded" />
                      <div className="h-3 w-7/12 bg-slate-200 rounded" />
                      <div className="h-3 w-6/12 bg-slate-200 rounded" />
                    </div>
                  </div>
                  <div className="col-span-5 space-y-3">
                    <div className="rounded-xl border border-slate-200 p-3">
                      <p className="text-xs text-slate-500">Insight</p>
                      <p className="text-sm mt-1">
                        &quot;Sleep &lt; 6.5h + heavy calendar → stress spike after 48h
                        (73% likelihood).&quot;
                      </p>
                    </div>
                    <div className="rounded-xl border border-slate-200 p-3">
                      <p className="text-xs text-slate-500">Trend</p>
                      <p className="text-sm mt-1">
                        Week-on-week positivity rising on days with &gt;30 min outdoor time.
                      </p>
                    </div>
                    <div className="rounded-xl border border-slate-200 p-3">
                      <p className="text-xs text-slate-500">Pattern</p>
                      <p className="text-sm mt-1">
                        Recurring Sunday anxiety linked to Monday deadlines.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="absolute -bottom-6 -left-6 h-24 w-24 rounded-2xl bg-indigo-100 blur-2xl"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
            Turn reflection into intelligence
          </h2>
          <p className="mt-2 text-slate-600 max-w-2xl">
            MindScry visualises emotional and behavioural trends, detects patterns, and
            correlates your journal with lifestyle data.
          </p>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Trend-based insights',
                desc: 'See how emotions and mindset shift over weeks and months.',
              },
              {
                title: 'Automatic pattern detection',
                desc: 'Extract habits, emotions, and recurring themes from natural language.',
              },
              {
                title: 'Cross-data correlation',
                desc: 'Optionally connect sleep, calendar, and habits to reveal links.',
              },
              {
                title: 'Predictive tendencies',
                desc: 'Forecast likely stress triggers or motivation dips (privacy-first).',
              },
              {
                title: 'Privacy-first',
                desc: 'Your data stays yours. Local-first roadmap and end-to-end encryption (planned).',
              },
              {
                title: 'Founder-led support',
                desc: 'Join as a founding tester and help shape MindScry.',
              },
            ].map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="h-8 w-8 rounded-lg bg-indigo-600 mb-4" />
                <h3 className="font-medium">{f.title}</h3>
                <p className="text-sm text-slate-600 mt-1">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="py-16 sm:py-20 bg-white border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">How it works</h2>
          <ol className="mt-6 grid sm:grid-cols-3 gap-6">
            <li className="rounded-2xl border border-slate-200 p-6">
              <h3 className="font-medium">Capture</h3>
              <p className="text-sm text-slate-600 mt-1">
                Write or speak your journal entries, guided journalling makes this seamless.
              </p>
            </li>
            <li className="rounded-2xl border border-slate-200 p-6">
              <h3 className="font-medium">Analyse</h3>
              <p className="text-sm text-slate-600 mt-1">
                Models quantify emotion, themes, and behaviour over time.
              </p>
            </li>
            <li className="rounded-2xl border border-slate-200 p-6">
              <h3 className="font-medium">Act</h3>
              <p className="text-sm text-slate-600 mt-1">
                Get trendlines, correlations, and simple suggestions grounded in your data.
              </p>
            </li>
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">FAQs</h2>
          <div className="mt-6 space-y-4">
            <details className="rounded-xl border border-slate-200 bg-white p-4">
              <summary className="font-medium cursor-pointer">Who is this for?</summary>
              <p className="text-sm text-slate-600 mt-2">
                Anyone who wants deeper self-awareness, the ability to visualise your behaviours and
                emotions beyond just summaries.
              </p>
            </details>
            <details className="rounded-xl border border-slate-200 bg-white p-4">
              <summary className="font-medium cursor-pointer">Is my data private?</summary>
              <p className="text-sm text-slate-600 mt-2">
                Yes. We prioritise privacy and control. Early MVP uses secure storage; local-first
                and end-to-end encryption are on the roadmap.
              </p>
            </details>
            <details className="rounded-xl border border-slate-200 bg-white p-4">
              <summary className="font-medium cursor-pointer">Do I need to journal daily?</summary>
              <p className="text-sm text-slate-600 mt-2">
                No. Even a few entries a week can surface useful trends. Consistency improves insight
                quality.
              </p>
            </details>
          </div>
        </div>
      </section>

      <footer className="py-10 text-center text-sm text-slate-500">
        <p>Built with care · Early access 2025</p>
      </footer>
    </div>
  );
}
