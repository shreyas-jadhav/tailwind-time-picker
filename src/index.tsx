'use client';
import { isNaN } from 'lodash';
import React, { useMemo, useState } from 'react';
/**
 * Main Component Props
 */
export interface Props {
  invalidTimeMessage?: string;
  value?: string;
  onChange?: (value: string) => void;
  autoFocus?: boolean;
}
function isValidHour(hour: string) {
  const hourNumber = Number(hour);
  if (isNaN(hourNumber)) return false;
  return hourNumber >= 0 && hourNumber <= 23;
}

function inTwoDigits(input: string) {
  const inputNumber = Number(input);
  if (inputNumber < 10) return `0${inputNumber}`;
  return `${inputNumber}`;
}

function isValidMinute(minute: string) {
  const minuteNumber = Number(minute);
  if (isNaN(minuteNumber)) return false;
  return minuteNumber >= 0 && minuteNumber <= 59;
}

const TailwindTimePicker = ({
  invalidTimeMessage = 'Invalid Time',
  value = ':',
  onChange,
  autoFocus = false,
}: Props) => {
  const [hour, minute] = useMemo(() => value.split(':'), [value]);

  const [hourInputValue, setHourInputValue] = useState(hour);
  const [minuteInputValue, setMinuteInputValue] = useState(minute);

  const setHour = (newHour: string) => {
    if (newHour.length > 2) return;
    setHourInputValue(newHour);
    if (isValidHour(newHour)) {
      onChange?.(`${inTwoDigits(newHour)}:${minute ?? '00'}`);
    }
  };

  const setMinute = (newMinute: string) => {
    if (newMinute.length > 2) return;
    setMinuteInputValue(newMinute);
    if (isValidMinute(newMinute)) {
      onChange?.(`${hour ?? '00'}:${inTwoDigits(newMinute)}`);
    }
  };

  const error = useMemo(() => {
    if (!isValidHour(hourInputValue)) return invalidTimeMessage;
    if (!isValidMinute(minuteInputValue)) return invalidTimeMessage;
    return '';
  }, [hourInputValue, invalidTimeMessage, minuteInputValue]);

  const [hourFocused, setHourFocused] = useState(false);
  const [minuteFocused, setMinuteFocused] = useState(false);

  return (
    <div className="tailwind-time-picker-container space-x-1">
      <div
        className={`tailwind-time-picker-input-container flex flex-rows items-center  border  rounded-lg w-fit ${
          hourFocused || minuteFocused
            ? `border-primary-500 tailwind-time-picker-input-container-focused`
            : `border-gray-200 tailwind-time-picker-input-container-not-focused`
        }`}
      >
        {/* hour */}
        <input
          type="text"
          value={hourInputValue}
          onChange={(e) => setHour(e.target.value)}
          min={0}
          max={23}
          autoFocus
          className="tailwind-time-picker-hour w-10 p-1 rounded-lg text-center focus:outline-none"
          onFocus={() => setHourFocused(true)}
          onBlur={() => setHourFocused(false)}
        />

        {/* minute */}
        <span className="tailwind-time-picker-separator">:</span>
        <input
          type="text"
          value={minuteInputValue}
          onChange={(e) => setMinute(e.target.value)}
          min={0}
          max={59}
          className="tailwind-time-picker-minute w-10 p-1 rounded-lg text-center focus:outline-none"
          onFocus={() => setMinuteFocused(true)}
          onBlur={() => setMinuteFocused(false)}
        />
      </div>

      {/* error */}
      {error && (
        <span className="tailwind-time-picker-error text-red-500 text-xs">
          {error}
        </span>
      )}
    </div>
  );
};

export default TailwindTimePicker;
