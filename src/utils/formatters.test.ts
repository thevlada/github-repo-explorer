import { formatNumber, formatRelativeTime } from './formatters';

describe('formatters', () => {
  describe('formatNumber', () => {
    it('should format numbers less than 1000 as is', () => {
      expect(formatNumber(0)).toBe('0');
      expect(formatNumber(1)).toBe('1');
      expect(formatNumber(42)).toBe('42');
      expect(formatNumber(999)).toBe('999');
    });

    it('should format thousands with k suffix', () => {
      expect(formatNumber(1000)).toBe('1.0k');
      expect(formatNumber(1500)).toBe('1.5k');
      expect(formatNumber(12345)).toBe('12.3k');
      expect(formatNumber(999999)).toBe('1000.0k');
    });

    it('should format millions with M suffix', () => {
      expect(formatNumber(1000000)).toBe('1.0M');
      expect(formatNumber(1500000)).toBe('1.5M');
      expect(formatNumber(12345678)).toBe('12.3M');
      expect(formatNumber(999999999)).toBe('1000.0M');
    });

    it('should handle edge cases', () => {
      expect(formatNumber(1000.1)).toBe('1.0k');
      expect(formatNumber(1000000.1)).toBe('1.0M');
    });
  });

  describe('formatRelativeTime', () => {
    const mockNow = new Date('2024-01-15T12:00:00Z');

    beforeEach(() => {
      jest.useFakeTimers();
      jest.setSystemTime(mockNow);
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should return "just now" for very recent times', () => {
      const thirtySecondsAgo = new Date(
        mockNow.getTime() - 30 * 1000
      ).toISOString();
      expect(formatRelativeTime(thirtySecondsAgo)).toBe('just now');
    });

    it('should format minutes correctly', () => {
      const oneMinuteAgo = new Date(
        mockNow.getTime() - 1 * 60 * 1000
      ).toISOString();
      const fiveMinutesAgo = new Date(
        mockNow.getTime() - 5 * 60 * 1000
      ).toISOString();

      expect(formatRelativeTime(oneMinuteAgo)).toBe('1 minute ago');
      expect(formatRelativeTime(fiveMinutesAgo)).toBe('5 minutes ago');
    });

    it('should format hours correctly', () => {
      const oneHourAgo = new Date(
        mockNow.getTime() - 1 * 60 * 60 * 1000
      ).toISOString();
      const fiveHoursAgo = new Date(
        mockNow.getTime() - 5 * 60 * 60 * 1000
      ).toISOString();

      expect(formatRelativeTime(oneHourAgo)).toBe('1 hour ago');
      expect(formatRelativeTime(fiveHoursAgo)).toBe('5 hours ago');
    });

    it('should format days correctly', () => {
      const oneDayAgo = new Date(
        mockNow.getTime() - 1 * 24 * 60 * 60 * 1000
      ).toISOString();
      const fiveDaysAgo = new Date(
        mockNow.getTime() - 5 * 24 * 60 * 60 * 1000
      ).toISOString();

      expect(formatRelativeTime(oneDayAgo)).toBe('1 day ago');
      expect(formatRelativeTime(fiveDaysAgo)).toBe('5 days ago');
    });

    it('should format months correctly', () => {
      const oneMonthAgo = new Date(
        mockNow.getTime() - 35 * 24 * 60 * 60 * 1000
      ).toISOString();
      const fiveMonthsAgo = new Date(
        mockNow.getTime() - 150 * 24 * 60 * 60 * 1000
      ).toISOString();

      expect(formatRelativeTime(oneMonthAgo)).toBe('1 month ago');
      expect(formatRelativeTime(fiveMonthsAgo)).toBe('5 months ago');
    });

    it('should format years correctly', () => {
      const oneYearAgo = new Date(
        mockNow.getTime() - 400 * 24 * 60 * 60 * 1000
      ).toISOString();
      const twoYearsAgo = new Date(
        mockNow.getTime() - 800 * 24 * 60 * 60 * 1000
      ).toISOString();

      expect(formatRelativeTime(oneYearAgo)).toBe('1 year ago');
      expect(formatRelativeTime(twoYearsAgo)).toBe('2 years ago');
    });

    it('should handle edge cases at boundaries', () => {
      const exactlyOneMinute = new Date(
        mockNow.getTime() - 60 * 1000
      ).toISOString();
      const exactlyOneHour = new Date(
        mockNow.getTime() - 60 * 60 * 1000
      ).toISOString();
      const exactlyOneDay = new Date(
        mockNow.getTime() - 24 * 60 * 60 * 1000
      ).toISOString();

      expect(formatRelativeTime(exactlyOneMinute)).toBe('1 minute ago');
      expect(formatRelativeTime(exactlyOneHour)).toBe('1 hour ago');
      expect(formatRelativeTime(exactlyOneDay)).toBe('1 day ago');
    });

    it('should handle invalid date strings gracefully', () => {
      // Invalid date should still work with Date constructor
      const result = formatRelativeTime('invalid-date');
      expect(typeof result).toBe('string');
    });
  });
});
