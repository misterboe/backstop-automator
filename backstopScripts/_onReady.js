module.exports = async (page, scenario, vp) => {
  console.log('Scan > ' + scenario.label);
  await page.evaluate(async () => {
    document.querySelectorAll('[loading="lazy"]').forEach((elem) => {
      elem.loading = 'eager';
    });
    await new Promise((resolve, reject) => {
      let totalHeight = 0;
      const distance = 200;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 200);
    });
  });
  await page.waitForTimeout(3000);
};
