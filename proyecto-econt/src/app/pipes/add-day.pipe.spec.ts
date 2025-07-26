import { AddDayPipe } from './add-day.pipe';

describe('AddDayPipe', () => {
  let pipe: AddDayPipe;

  beforeEach(() => {
    pipe = new AddDayPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should add one day to a Date object', () => {
    const input = new Date('2024-01-01');
    const result = pipe.transform(input);
    expect(result?.getDate()).toBe(2);
  });

  it('should add one day to a date string', () => {
    const input = '2024-01-01';
    const result = pipe.transform(input);
    expect(result?.toISOString().startsWith('2024-01-02')).toBeTrue();
  });

  it('should return null for null input', () => {
    const result = pipe.transform(null as any);
    expect(result).toBeNull();
  });

  it('should return null for undefined input', () => {
    const result = pipe.transform(undefined as any);
    expect(result).toBeNull();
  });

  it('should handle invalid date strings gracefully (NaN)', () => {
    const result = pipe.transform('not-a-date');
    expect(result?.toString()).toBe('Invalid Date');
  });
});
