import { useEffect, useState } from "react";
import './i18n';
import { useTranslation } from "react-i18next";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';
import * as d3 from "d3";

interface Row {
  City: string;
  Month: string;
  MeanMax: number;
  MeanMin: number;
  TotalPrecip: number;
}

function App() {
  const { t, i18n } = useTranslation();
  const [data, setData] = useState<Row[]>([]);

  useEffect(() => {
    fetch("data/data.csv")
      .then((res) => res.text())
      .then((text) => {
        const rows = d3.csvParse(text, d3.autoType) as unknown as Row[];
        setData(rows);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100/80 via-cyan-100/60 to-blue-200/80 flex items-center justify-center overflow-x-hidden">
      <div className="bg-white rounded-3xl shadow-2xl border-2 border-sky-300/40 px-8 py-10 w-full max-w-2xl space-y-10">

        {/* Language toggle */}
        <div className="flex justify-end">
          <button
            className="px-5 py-1.5 rounded-full font-semibold border-2 border-sky-500 bg-sky-50 hover:bg-sky-100 shadow transition"
            onClick={() => i18n.changeLanguage(i18n.language === "en" ? "fr" : "en")}
          >
            {i18n.language === "en" ? "🇫🇷 Français" : "🇨🇦 English"}
          </button>
        </div>

        {/* Dashboard header with accent bar */}
        <div className="flex flex-col items-center mb-3">
          {/* Accent bar */}
          <div className="w-28 h-2 rounded-full bg-gradient-to-r from-sky-500 via-cyan-400 to-sky-500 mb-4 shadow-lg" />
          {/* Heading */}
          <h1 className="text-4xl md:text-5xl font-extrabold text-center text-sky-700 tracking-tight drop-shadow flex items-center gap-3 mb-2">
            <span className="text-5xl">🌦️</span>
            {t('climateDashboard')}
          </h1>
          {/* Subtitle */}
          <p className="text-lg text-gray-700 text-center font-medium drop-shadow-sm">
            {t('subtitle')}
          </p>
        </div>

        {/* City dropdown */}
        <div className="flex gap-3 items-center justify-center mb-2">
          <label htmlFor="city" className="font-semibold text-sky-700">{t('city')}:</label>
          <select
            id="city"
            className="border-2 border-sky-300 rounded-lg px-3 py-1 bg-white shadow-sm font-semibold text-sky-700"
            disabled
          >
            <option>{t('ottawa')}</option>
          </select>
        </div>

        {/* Line chart */}
        <div className="bg-sky-50 rounded-2xl p-5 shadow-inner w-full border border-sky-100">
          <ResponsiveContainer width="100%" minWidth={200} height={320}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="MeanMax" stroke="#0ea5e9" name={t('meanMax')} dot={{ r: 4 }} strokeWidth={3} />
              <Line type="monotone" dataKey="MeanMin" stroke="#64748b" name={t('meanMin')} dot={{ r: 4 }} strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar chart */}
        <div className="bg-cyan-50 rounded-2xl p-5 shadow-inner w-full border border-cyan-100">
          <ResponsiveContainer width="100%" minWidth={200} height={220}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Month" />
              <YAxis label={{ value: t('totalPrecip'), angle: -90, position: 'insideLeft', fill: '#0891b2', fontSize: 16 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="TotalPrecip" fill="#2dd4bf" name={t('totalPrecip')} radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default App;