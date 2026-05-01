"use client";

import type { ChangeEvent, ReactNode } from "react";

export function OptionsPanel({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <section className="ws-options">
      {title ? <h3 className="ws-options-title">{title}</h3> : null}
      <div className="ws-options-grid">{children}</div>
    </section>
  );
}

export function FieldRow({
  label,
  hint,
  children
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="ws-field">
      <span className="ws-field-label">{label}</span>
      <div className="ws-field-control">{children}</div>
      {hint ? <span className="ws-field-hint">{hint}</span> : null}
    </label>
  );
}

type SliderProps = {
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
  format?: (value: number) => string;
};

export function Slider({ value, min, max, step = 1, onChange, format }: SliderProps) {
  return (
    <div className="ws-slider">
      <input
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(event: ChangeEvent<HTMLInputElement>) => onChange(Number(event.target.value))}
      />
      <span className="ws-slider-value">{format ? format(value) : value}</span>
    </div>
  );
}

type SelectProps<T extends string> = {
  value: T;
  options: Array<{ value: T; label: string }>;
  onChange: (value: T) => void;
};

export function Select<T extends string>({ value, options, onChange }: SelectProps<T>) {
  return (
    <select
      className="ws-select"
      value={value}
      onChange={(event: ChangeEvent<HTMLSelectElement>) => onChange(event.target.value as T)}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

export function Toggle({
  value,
  onChange,
  label
}: {
  value: boolean;
  onChange: (value: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      className={`ws-toggle ${value ? "is-on" : ""}`}
      role="switch"
      aria-checked={value}
      onClick={() => onChange(!value)}
    >
      <span className="ws-toggle-knob" aria-hidden="true" />
      <span className="ws-toggle-label">{label}</span>
    </button>
  );
}

export function NumberInput({
  value,
  min,
  max,
  step = 1,
  onChange,
  suffix
}: {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: number) => void;
  suffix?: string;
}) {
  return (
    <div className="ws-number">
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(event: ChangeEvent<HTMLInputElement>) => onChange(Number(event.target.value))}
      />
      {suffix ? <span className="ws-number-suffix">{suffix}</span> : null}
    </div>
  );
}

export function ColorInput({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <div className="ws-color">
      <input
        type="color"
        value={value}
        onChange={(event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value)}
      />
      <span>{value.toUpperCase()}</span>
    </div>
  );
}

export function TextInput({
  value,
  onChange,
  placeholder
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <input
      className="ws-text-input"
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={(event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value)}
    />
  );
}

export function TextArea({
  value,
  onChange,
  placeholder,
  rows = 4
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <textarea
      className="ws-textarea"
      value={value}
      placeholder={placeholder}
      rows={rows}
      onChange={(event: ChangeEvent<HTMLTextAreaElement>) => onChange(event.target.value)}
    />
  );
}
