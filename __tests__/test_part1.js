/* global describe, beforeAll, it, page, expect */

beforeAll(async () => {
  await page.goto('http://localhost:8000/exercise/part1-selectors-and-events/');
});

describe('The first result variable', () => {
  it('should be set to the first result paragraph element', async () => {
    const result = await page.evaluate(() => firstResult.id);
    expect(result).toBe('result-1')
  });
});

describe('The second & third results variable', () => {
  it('should be set to the next two result paragraph elements', async () => {
    const isdefined = await page.evaluate(() => !!secondAndThirdResults);
    expect(isdefined).toBe(true)

    const result = await page.evaluate(() => Array.prototype.map.call(secondAndThirdResults, el => el.id));
    expect(result.sort().join(', ')).toBe('result-2, result-3')
  });
});

describe('The all results variable', () => {
  it('should be set to the set of all result paragraph elements', async () => {
    const isdefined = await page.evaluate(() => !!allResults);
    expect(isdefined).toBe(true)

    const result = await page.evaluate(() => Array.prototype.map.call(allResults, el => el.id));
    expect(result.sort().join(', ')).toBe('result-1, result-2, result-3, result-4, result-5')
  });
});

describe('The "I\'m Clicked!" button', () => {
  it('should not start with the text "I\'m Clicked!"', async () => {
    const initialText = await page.evaluate(() => document.getElementById('im-clicked-button').textContent);
    expect(initialText).not.toEqual("I'm Clicked!")
  });

  it('should change the text of itself when clicked', async () => {
    await page.click('#im-clicked-button');

    const finalText = await page.evaluate(() => document.getElementById('im-clicked-button').textContent);
    expect(finalText).toEqual("I'm Clicked!")
  });
});

describe('The span adder button', () => {
  it('should start with at most a single span containing a 0', async () => {
    const initialText = await page.evaluate(() => document.getElementById('span-container').textContent);
    const initialSpanCount = await page.evaluate(() => document.getElementById('span-container').getElementsByTagName('span').length);

    if (initialText) {
      expect(initialText).toEqual("0");
      expect(initialSpanCount).toEqual(1);
    } else {
      expect(initialSpanCount).toEqual(0);
    }
  });

  it('should have spans with 1-5 after 5 clicks', async () => {
    for (let i = 0; i < 5; ++i) {
      await page.click('#add-span-button');
    }

    const finalTextContents = await page.evaluate(() => Array.prototype.map.call(
      document.getElementById('span-container').getElementsByTagName('span'), el => el.textContent
    ));
    expect(finalTextContents.join('')).toContain('12345');
  });
});
