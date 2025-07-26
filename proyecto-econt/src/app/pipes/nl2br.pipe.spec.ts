import { Nl2brPipe } from './nl2br.pipe';
import { DomSanitizer } from '@angular/platform-browser';
import { TestBed } from '@angular/core/testing';

describe('Nl2brPipe', () => {
  let sanitizer: DomSanitizer;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    sanitizer = TestBed.inject(DomSanitizer);
  });

  it('should create an instance', () => {
    const pipe = new Nl2brPipe(sanitizer);
    expect(pipe).toBeTruthy();
  });

  it('should convert newlines to <br><br>', () => {
    const pipe = new Nl2brPipe(sanitizer);
    const result = pipe.transform('line1\nline2');
    expect(result.toString()).toContain('<br><br>');
  });
});

